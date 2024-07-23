import React, { useState } from 'react';
import SearchItem from '../../components/common/SearchItem';
import { CheckActiveOrNot, formatDate } from '../../utils/helpers';
import { Delete, EditeAdmin } from '../../components/common/Button';
import ModelAdminUpdate from '../../components/common/ModelAdminUpdate';
import DeleteModel from '../../components/common/DeleteModel';

const tableData = [
    {
        id: 1,
        productName: 'Wireless Mouse',
        color: 'Black',
        category: 'Electronics',
        price: '$25',
        action: 'Buy Now'
    },

    {
        id: 2,
        productName: 'Bluetooth Speaker',
        color: 'Red',
        category: 'Electronics',
        price: '$45',
        action: 'Add to Cart'
    },
    {
        id: 3,
        productName: 'Gaming Keyboard',
        color: 'RGB',
        category: 'Electronics',
        price: '$75',
        action: 'Buy Now'
    },
    {
        id: 4,
        productName: 'Running Shoes',
        color: 'Blue',
        category: 'Footwear',
        price: '$60',
        action: 'Add to Cart'
    },
    {
        id: 5,
        productName: 'Leather Wallet',
        color: 'Brown',
        category: 'Accessories',
        price: '$30',
        action: 'Buy Now'
    },
    {
        id: 6,
        productName: 'Cotton T-shirt',
        color: 'White',
        category: 'Apparel',
        price: '$20',
        action: 'Add to Cart'
    }
];



const AdminListTable = () => {
    const isLargeScreen = window.innerWidth > 1024
    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const updateAdmin = () => {

    }

    return (

        <div className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6`}>
            <h1 className="text-2xl font-semibold mb-6 flex justify-center mb-10">Admin List</h1>
            <SearchItem />


            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>

                            <th scope="col" class="px-6 py-3">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Color
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.map((data) => {
                                return (
                                    <>
                                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {data.productName}
                                            </th>
                                            <td class="px-6 py-4">
                                                {data.color}
                                            </td>
                                            <td class="px-6 py-4">
                                                {data.category}
                                            </td>
                                            <td class="px-6 py-4">
                                                {data.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex">
                                                    <EditeAdmin openModal={openModal} />
                                                    <Delete openDeleteModal={openDeleteModal}/>

                                                </div>
                                            </td>

                                        </tr>
                                        <ModelAdminUpdate  isOpen={isModalOpen} close={closeModal} />
                                        <DeleteModel type='adminModel' isOpen={isDeleteModalOpen} close={closeDeleteModal}/>
                                    </>
                                )
                            })
                        }

                    </tbody>
                </table>
                <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
                    <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                        </li>
                        <li>
                            <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                        </li>
                        <li>
                            <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>


    );
};

export default AdminListTable;
