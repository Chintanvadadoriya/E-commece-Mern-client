import React, { useEffect, useState } from 'react';
import SearchItem from '../common/SearchItem';
import { Delete, EditeProduct, EditProduct } from '../common/Button';
import { useNavigate } from 'react-router-dom';
import DeleteModel from '../common/DeleteModel';
import { useDispatch, useSelector } from 'react-redux';
import useToast from '../../hook/useToaster';
import { UserData } from '../../redux/authSlice';
import { fetchProductData, ProductData } from '../../redux/productListSlice';
import useDebounce from '../../hook/useDebounce';
import Loader from '../../components/Loader';

const ProductTable = ({ isLargeScreen }) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const itemsPerPage = 3; // Number of items per page

  const dispatch = useDispatch();
  const { data, status, error, totalPage, totalCount, currentCount } = useSelector(ProductData);
  const { token } = useSelector(UserData);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);


  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    dispatch(fetchProductData({ searchQuery: debouncedSearchQuery, page, limit, token, minPrice, maxPrice }));
  }, [dispatch, page, limit, itemsPerPage, token, debouncedSearchQuery, minPrice, maxPrice]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log('Search product', e.target.value)
    setPage(1) // Reset to first page on new search
  };

  const updateProduct = (id) => {
    navigate(`/update-product/${id}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1); // Reset to first page on new limit
  };



  return (
    <>
      <div className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6`}>
        <h1 className="text-2xl font-semibold mb-6 flex justify-center mb-10">Products List</h1>
        <div className='mb-4 flex justify-between'>
          <SearchItem handleSearch={handleSearch} />
          <div>
            <label htmlFor="limit" className="mb-1 block text-sm font-medium text-gray-700">
              Items per page:
            </label>
            <select
              id="limit"
              name="limit"
              value={limit}
              onChange={handleLimitChange}
              className="block w-[100%] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>

        </div>
        <div>
          <p>Total Product Data : <strong>{totalCount}</strong></p>
        </div>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.length === 0 && status !== 'loading' && (
                <tr>
                  <td colSpan="6" className="text-center p-5 text-sm text-gray-500">No Data Found!</td>
                </tr>
              )}
              {status === 'loading' && (
                <tr>
                  <td colSpan="6" className="text-center p-5 text-sm text-gray-500"><Loader /></td>
                </tr>
              )}
              {status === 'failed' && (
                <tr>
                  <td colSpan="6" className="text-center p-5 text-sm text-red-500">Error: {error}</td>
                </tr>
              )}
              {
                status === 'succeeded' && data.map((product, index) => (
                  <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <img src={product.images[0]} className="w-16 md:w-32 max-w-full max-h-full" alt={product.name} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.stock}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {product.price}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex">
                        <EditeProduct updateProduct={() => updateProduct(product.id)} id={product.id} />
                        <Delete openModal={openModal} />
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPage}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPage}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      <DeleteModel isOpen={isModalOpen} close={closeModal} />
    </>
  );
};

export default ProductTable;
