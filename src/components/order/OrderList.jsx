import React, { useState, useEffect } from 'react';
import { EditeOrder } from '../common/Button';
import Model from '../common/ModelUpdateOrderTrack';
import { getStatusColor } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { UserData } from '../../redux/authSlice';
import { fetchOrderList, OrderListData } from '../../redux/orderListSlice';
import { orderUpdatTrackStatusApi } from '../../services/authService';
import { getAuthHeader, wait } from '../../constant';
import useToast from '../../hook/useToaster';
import Loader from '../Loader';
import { Loader as UpdateLoader } from 'rsuite';

const OrderTable = ({ isLargeScreen }) => {
  const dispatch = useDispatch();
  const showToast = useToast();
  const { orders, status, error, totalPage, totalOrders } = useSelector(OrderListData);
  const [isModalOpen, setModalOpen] = useState(false);
  const { token } = useSelector(UserData)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [orderId, setOrderId] = useState();
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    dispatch(fetchOrderList({ page, limit, token }));
  }, [dispatch, page, limit, token]);

  const openModal = (id) => {
    setModalOpen(true)
    setOrderId(id)
  };
  const closeModal = () => setModalOpen(false);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setPage(1); // Reset to first page on new limit
  };
  const onUpdate = async ({ id, trackingStatus }) => {
    try {
      setLoading(true)
      const { data, status } = await orderUpdatTrackStatusApi(id, { trackingStatus }, getAuthHeader(token))

      if (status === 200) {
        showToast('success', `${data.message}`);
        dispatch(fetchOrderList({ page, limit, token }));
        wait(1)
        closeModal()
        setLoading(false)
      } else {
        showToast('error', `${data}`);
        setLoading(false)
      }
    } catch (error) {
      showToast('error', `something went wrong!`);
      console.log('error', error)
      setLoading(false)
    }
  }

  return (
    <>
      <div className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6`}>
        <h1 className="text-2xl font-semibold mb-6 flex justify-center mb-10">Orders List</h1>
        {/* <SearchItem /> */}
        <div className='mb-4 flex justify-between'>
          {/* <SearchItem handleSearch={handleSearch} /> */}
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
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Qty</th>
                <th scope="col" className="px-6 py-3">paidAmount</th>
                <th scope="col" className="px-6 py-3">Product Price</th>
                <th scope="col" className="px-6 py-3">Tracking Status</th>
                <th scope="col" className="px-6 py-3">Payment Status</th>
                <th scope="col" className="px-6 py-3">isDicount Off</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.length === 0 && status !== 'loading' && (
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
              {orders?.map((data, index) => {
                const statusColor = data.paymentStatus === 'paid' ? 'text-green-500' : 'text-red-500';
                return (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="p-4">
                      <img src={data.productImg[0]} className="w-16 md:w-32 max-w-full max-h-full" alt={data.name} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{data.productName}</td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{data.qty}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{data.paidAmount}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{data.productPrice}</td>
                    <td className={`px-6 py-4 font-semibold text-gray-900 dark:text-white ${getStatusColor(data.trackingStatus)}`}>{data.trackingStatus}</td>
                    <td className={`px-6 py-4 font-semibold text-gray-900 dark:text-white ${statusColor}`}>{data.paymentStatus}</td>
                    <td className={`px-6 py-4 font-semibold text-gray-900 dark:text-white `}>{`${data.isDicountOff === null ? '0 %' : `${data.isDicountOff} %`}`}</td>

                    <td className="px-6 py-4">
                      <div className="flex">
                        <EditeOrder openModal={() => openModal(data?._id)} />
                      </div>
                    </td>
                  </tr>
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
            Page {page} of {totalPage} <p>Total Orders:<strong>{totalOrders}</strong></p>
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
      <Model isOpen={isModalOpen} close={closeModal} onUpdate={onUpdate} orderId={orderId} loading={loading} Loader={UpdateLoader} />
    </>
  );
};

export default OrderTable;
