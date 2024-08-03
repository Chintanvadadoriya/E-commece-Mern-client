import React from 'react';

const SummaryCards = ({ totalSales, totalOrders, totalProducts, newCustomers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white shadow bg-indigo-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold">Total Sales</h2>
        <p className="text-2xl">₹: {totalSales}</p>
      </div>
      <div className="bg-white shadow bg-indigo-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold">Total Orders</h2>
        <p className="text-2xl">{totalOrders}</p>
      </div>
      <div className="bg-white shadow bg-indigo-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold">Total Products</h2>
        <p className="text-2xl">{totalProducts}</p>
      </div>
      <div className="bg-white shadow bg-indigo-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold">New Customers</h2>
        <p className="text-2xl">{newCustomers}</p>
      </div>
    </div>
  );
};

export default SummaryCards;
