import React from 'react';
import { Cancel, Update } from './Button';

const options = ['ordered', 'pending', 'processing', 'shipped', 'delivered', 'canceled'];

function Model({  isOpen, close }) {
    if (!isOpen) return null;
    return (
        <>
            {
                <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
                    <div class="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 class="text-xl font-semibold mb-6 flex justify-center">Update Tracking Status</h2>

                        <div class="mb-11">
                            <label for="trackingStatus" class="block text-sm font-medium text-gray-700">Tracking Status</label>
                            <select id="trackingStatus" name="trackingStatus" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                <option value="ordered">Ordered</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="canceled">Canceled</option>
                            </select>
                        </div>

                        <div class="flex justify-end">
                          <Cancel close={close}/>
                          <Update Update={"Update"}/>
                            
                        </div>
                    </div>
                </div>

            }

        </>
    );
}

export default Model;
