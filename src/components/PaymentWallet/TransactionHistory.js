import React, { useState, useMemo } from 'react';

const TransactionHistory = () => {
  const transactions = [
    {
      id: 1,
      date: "2024-09-12",
      description: "Payment Received",
      amount: 1000,
      type: "credit", // credit or debit
      balance: 5000,
    },
    {
      id: 2,
      date: "2024-09-10",
      description: "Purchased Product",
      amount: -500,
      type: "debit",
      balance: 4000,
    },
    {
      id: 3,
      date: "2024-09-08",
      description: "Bank Transfer",
      amount: 2000,
      type: "credit",
      balance: 4500,
    },
    // Add more transactions as needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  // Get the transactions to display for the current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Calculate the total balance (latest balance from the most recent transaction)
  const totalBalance = useMemo(() => {
    return transactions.length > 0 ? transactions[0].balance : 0;
  }, [transactions]);

  // Function to handle page change
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-3 bg-gray-100 shadow-lg rounded-lg">
      {/* Transaction History Header with Total Balance */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transaction History</h2>
        <div className="text-xl font-semibold text-green-500">
          Total Balance: ₹{totalBalance}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-right">Amount</th>
              <th className="px-4 py-2 text-right">Balance</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b">
                <td className="px-4 py-3">{new Date(transaction.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">{transaction.description}</td>
                <td className={`px-4 py-3 ${transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} {/* Capitalize first letter */}
                </td>
                <td className={`px-4 py-3 text-right font-semibold ${transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                  {transaction.type === 'credit' ? `+₹${transaction.amount}` : `-₹${Math.abs(transaction.amount)}`}
                </td>
                <td className="px-4 py-3 text-right">₹{transaction.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded-lg"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;
