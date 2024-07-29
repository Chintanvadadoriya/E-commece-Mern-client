import React, { useState } from 'react';
import { Cancel, Update } from './Button';

function Model({ isOpen, close, onUpdate, orderId, loading, Loader }) {
    const [trackingStatus, setTrackingStatus] = useState('ordered');

    if (!isOpen) return null;

    const handleUpdate = () => {
        onUpdate({
            id: orderId,
            trackingStatus: trackingStatus
        });
    };
    return (
        <>
            {
                <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-50">
                    <div class="bg-white rounded-lg p-8 max-w-md w-full">
                        <h2 class="text-xl font-semibold mb-6 flex justify-center">Update Tracking Status</h2>

                        <div className="mb-11">
                            <label htmlFor="trackingStatus" className="block text-sm font-medium text-gray-700">Tracking Status</label>
                            <select
                                id="trackingStatus"
                                name="trackingStatus"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={trackingStatus}
                                onChange={(e) => setTrackingStatus(e.target.value)}
                            >
                                <option value="ordered">Ordered</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="canceled">Canceled</option>
                            </select>
                        </div>

                        <div class="flex justify-end">
                            <Cancel close={close} />
                            <Update onUpdate={handleUpdate} type="Update Order Track " loading={loading} Loader={Loader} />

                        </div>
                    </div>
                </div>

            }

        </>
    );
}

export default Model;
