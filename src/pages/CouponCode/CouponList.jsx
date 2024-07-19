import React, { useState } from 'react';
import SearchItem from '../../components/common/SearchItem';
import { CheckActiveOrNot, formatDate } from '../../utils/helpers';


const ProductData = [
    {
        id: 1,
        cname:'shivShakti',
        name: "chintan",
        disscount: 50,
        duration:'forever',
        active: 'true',
        expires_at: 1752386183,
    },
    {
        id: 1,
        cname:'IT',
        name: "chintan",
        disscount: 45,
        duration:'forever',
        active: 'true',
        expires_at: 1752386183,
    },
    {
        id: 1,
        cname:'Grow',
        name: "chintan",
        disscount: 30,
        duration:'forever',
        active: 'true',
        expires_at: 1752386183,
    },
    {
        id: 1,
        cname:'shiva',
        name: "chintan",
        disscount: 50,
        duration:'forever',
        active: 'true',
        expires_at: 1752386183,
    },
    {
        id: 1,
        cname:'lg',
        name: "chintan",
        disscount: 12,
        duration:'forever',
        active: 'false',
        expires_at: 1752386183,
    },
]

const CouponListTable = () => {
    const isLargeScreen = window.innerWidth > 1024


    return (

        <div className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6`}>
            <h1 className="text-2xl font-semibold mb-6 flex justify-center mb-10">Coupon-code List</h1>
            <SearchItem />
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
                                Duration
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Active
                            </th>
                            <th scope="col" className="px-6 py-3">
                                expires
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ProductData?.map((data, index) => {
                                return (
                                    <>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {data?.cname}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {data?.disscount}%
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {data?.duration}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {CheckActiveOrNot(data?.active)}
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {formatDate(data?.expires_at)}
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


    );
};

export default CouponListTable;
