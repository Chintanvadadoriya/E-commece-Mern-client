import React, { useState, useEffect } from 'react';
import { Cancel } from './Button';

const ModelAdminUpdate = ({ isOpen, close, adminId, onUpdate }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [totalPaidAmount, setTotalPaidAmount] = useState(0);

  useEffect(() => {
    if (adminId) {
      setName(adminId.name);
      setEmail(adminId.email);
      setIsVerified(adminId.isVerified);
      setIsBlock(adminId.isBlock);
      setTotalPaidAmount(adminId.totalPaidAmount);
    }
  }, [adminId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      id: adminId?._id,
      name,
      email,
      isVerified,
      isBlock,
      totalPaidAmount,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-auto p-8 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-4xl"
          onClick={close}
        >
          &times;
        </button>
        <h2 className="flex text-2xl font-bold mb-4 justify-center">Update Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              value={name}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Is Verified</label>
            <input
              type="checkbox"
              checked={isVerified}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Is Block</label>
            <input
              type="checkbox"
              checked={isBlock}
              onChange={(e) => setIsBlock(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Total Paid Amount</label>
            <input
              type="number"
              value={totalPaidAmount}
              onChange={(e) => setTotalPaidAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div class="flex justify-end">
            <Cancel close={close} />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Update
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default ModelAdminUpdate;
