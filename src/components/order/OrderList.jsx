import React, { useState } from 'react';
import SearchItem from '../common/SearchItem';
import { Edite } from '../common/Button';
import Model from '../common/ModelUpdateOrderTrack';
import { getStatusColor } from '../../utils/helpers';

const ProductData = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmd5vjpPZOoTD0Z1IpDvBadjJYNVcgck1IOg&s",
    name: " IPhone 12",
    qty: 1,
    price: 99999,
    paymentStatus:"paid",
    trackingStatus:"pending"
  },
  {
    src: "https://i.pinimg.com/236x/c7/db/6d/c7db6d290d552b8590d58a7b4460d135.jpg",
    name: "leptop",
    qty: 2,
    price: 25000,
    paymentStatus:"paid",
    trackingStatus:"ordered"


  },
  {
    src: "https://d2xamzlzrdbdbn.cloudfront.net/products/6aa736a0-7527-4561-956e-f8dccd829c4e_416x416.jpg",
    name: " IPhone 11",
    qty: 1,
    price: 75999,
    paymentStatus:"unpaid",
    trackingStatus:"processing"


  },
  {
    src: "https://m.media-amazon.com/images/I/41ik61SaOXL._AC_UF1000,1000_QL80_.jpg",
    name: " IPhone 10",
    qty: 3,
    price: 66999,
    paymentStatus:"paid",
    trackingStatus:"delivered"

  },
  {
    src: "https://m.media-amazon.com/images/I/41ik61SaOXL._AC_UF1000,1000_QL80_.jpg",
    name: " IPhone 10",
    qty: 3,
    price: 66999,
    paymentStatus:"paid",
    trackingStatus:"shipped"

  },
  {
    src: "https://m.media-amazon.com/images/I/41ik61SaOXL._AC_UF1000,1000_QL80_.jpg",
    name: " IPhone 10",
    qty: 3,
    price: 66999,
    paymentStatus:"paid",
    trackingStatus:"canceled"

  }
]

const OrderTable = ({ isLargeScreen }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
<>

<div className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6`}>
  <h1 className="text-2xl font-semibold mb-6 flex justify-center mb-10">Orders List</h1>
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
            tracking Status
          </th>
          <th scope="col" className="px-6 py-3">
            Payment Status
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {
          ProductData?.map((data, index) => {
            const statusColor = data?.paymentStatus === 'paid' ? 'text-green-500' : 'text-red-500';
            return (
              <>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="p-4">
                    <img src={data.src} className="w-16 md:w-32 max-w-full max-h-full" alt={data?.name} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                   {data?.name}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                   {data?.qty}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {data?.price}
                  </td>
                  <td className={`px-6 py-4 font-semibold text-gray-900 dark:text-white ${getStatusColor(data?.trackingStatus)}`}>
                    {data?.trackingStatus}
                  </td>
                  <td className={`px-6 py-4 font-semibold text-gray-900 dark:text-white ${statusColor}`}>
                    {data?.paymentStatus}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex">
                      <Edite openModal={openModal}/>
                    
                    </div>
                  </td>
                </tr>
                
              </>
            )
          })
        }
      </tbody>
    </table>
  </div>
</div>
  <Model  isOpen={isModalOpen} close={closeModal} />
</>


  );
};

export default OrderTable;
