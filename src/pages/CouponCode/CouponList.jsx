/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import SearchItem from '../../components/common/SearchItem';
import { CheckActiveOrNot, formatDate } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import useToast from '../../hook/useToaster';
import { UserData } from '../../redux/authSlice';
import { couponListApi, deleteCouponCodeApi } from '../../services/authService';
import { getAuthHeader } from '../../constant';
import Loader from '../../components/Loader';
import useDebounce from '../../hook/useDebounce';
import { Delete } from '../../components/common/Button';
import DeleteModel from '../../components/common/DeleteModel';
import { Loader as loadings } from 'rsuite';

const CouponListTable = () => {
  const isLargeScreen = window.innerWidth > 1024;
  const dispatch = useDispatch();
  const showToast = useToast();
  const [coupons, setCoupons] = useState([]);
  const [search, setSearch] = useState('');
  const [totalPage, setTotalPage] = useState(1);
  const [totalCoupons, setTotalCoupons] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const { token } = useSelector(UserData);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [loadingDel, setLoadingDel] = useState(false);
  const [couponId, setCouponId] = useState();

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1); // Reset to first page on new limit
  };

  const openModal = (id) => {
    setCouponId(id);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  async function showAllCouponList(page, limit, search) {
    try {
      setLoading(true);
      let response = await couponListApi({
        page,
        limit,
        search,
        token: getAuthHeader(token),
      });
      setCoupons(response.data.coupons);
      setTotalPage(response.data.totalPages);
      setTotalCoupons(response.data.total);
      setLoading(false);
    } catch (err) {
      console.log('err showAllCouponList', err);
      setLoading(false);
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const debouncedSearchQuery = useDebounce(search, 1000);

  useEffect(() => {
    showAllCouponList(page, limit, debouncedSearchQuery);
  }, [limit, page, token, debouncedSearchQuery]);

  const handleDeleteCoupon = async (id) => {
    try {
      setLoadingDel(true);
      let { data, msg } = await deleteCouponCodeApi(id, getAuthHeader(token));
      if (data) {
        showToast('success', `${msg}`);
        setLoadingDel(false);
        closeModal();
        showAllCouponList(page, limit, search);
      } else {
        showToast('error', `${msg}`);
        setLoadingDel(false);
      }
    } catch (error) {
      setLoadingDel(false);
      showToast('error', `something went wrong!`);
      console.log('error', error);
    }
  };

  return (
    <>
      <div
        className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6`}
      >
        <h1 className="text-2xl font-semibold mb-6 flex justify-center mb-10">
          Coupon-code List
        </h1>
        <div className="mb-4 flex justify-between">
          <SearchItem handleSearch={handleSearch} />
          <div>
            <label
              htmlFor="limit"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Items per page:
            </label>
            <select
              id="limit"
              name="limit"
              value={limit}
              onChange={handleLimitChange}
              className="block w-[100%] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Coupon Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Discout-Off
                </th>

                <th scope="col" className="px-6 py-3">
                  Active
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {coupons?.length === 0 && loading !== true && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-5 text-sm text-gray-500"
                  >
                    No Data Found!
                  </td>
                </tr>
              )}
              {loading === true && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center p-5 text-sm text-gray-500"
                  >
                    <Loader />
                  </td>
                </tr>
              )}
              {coupons?.map((data, index) => {
                return (
                  <>
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {data?.code}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {data?.percentOff}%
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {CheckActiveOrNot(data?.isActive)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex">
                          <Delete
                            openModal={() => openModal(data.couponCode)}
                          />
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPage}{' '}
            <p>
              Total Coupon Code : <strong>{totalCoupons}</strong>
            </p>
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
      <DeleteModel
        type="couponModel"
        isOpen={isModalOpen}
        close={closeModal}
        couponId={couponId}
        onUpdate={handleDeleteCoupon}
        Loader={loadings}
        loading={loadingDel}
      />
    </>
  );
};

export default CouponListTable;
