import React, { useState } from 'react';
import SearchItem from '../common/SearchItem';
import { Delete, EditeProduct } from '../common/Button';
import { useNavigate } from 'react-router-dom';
import DeleteModel from '../common/DeleteModel';

const ProductData = [
  {
    id: 1,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmd5vjpPZOoTD0Z1IpDvBadjJYNVcgck1IOg&s",
    name: " IPhone 12",
    qty: 20,
    price: 999
  },
  {
    id: 2,
    src: "https://i.pinimg.com/236x/c7/db/6d/c7db6d290d552b8590d58a7b4460d135.jpg",
    name: "leptop",
    qty: 20,
    price: 25000
  },
  {
    id: 3,
    src: "https://d2xamzlzrdbdbn.cloudfront.net/products/6aa736a0-7527-4561-956e-f8dccd829c4e_416x416.jpg",
    name: " IPhone 11",
    qty: 200,
    price: 75999
  },
  {
    id: 4,
    src: "https://m.media-amazon.com/images/I/41ik61SaOXL._AC_UF1000,1000_QL80_.jpg",
    name: " IPhone 10",
    qty: 200,
    price: 66999
  },
  {
    id: 5,
    src: "https://m.media-amazon.com/images/I/41ik61SaOXL._AC_UF1000,1000_QL80_.jpg",
    name: " IPhone 10",
    qty: 200,
    price: 66999
  }
];

const ProductTable = ({ isLargeScreen }) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items per page

  const updateProduct = (id) => {
    navigate(`/update-product/${id}`);
  };

  // Calculate total pages
  const totalPages = Math.ceil(ProductData.length / itemsPerPage);

  // Get current items
  const currentItems = ProductData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <div className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6`}>
        <h1 className="text-2xl font-semibold mb-6 flex justify-center mb-10">Products List</h1>
        <SearchItem />
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
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
              {
                currentItems.map((data, index) => (
                  <tr key={data.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <img src={data.src} className="w-16 md:w-32 max-w-full max-h-full" alt={data.name} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {data.name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {data.qty}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {data.price}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex">
                        <EditeProduct updateProduct={updateProduct} id={data.id} />
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
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
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
