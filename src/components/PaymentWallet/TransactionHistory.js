import React, { useState, useMemo, useEffect } from 'react';
import { transactionHistory } from '../../services/authService';
import { useSelector } from 'react-redux';
import { UserData } from '../../redux/authSlice';
import { selectUserProfile } from '../../redux/userProfileSlice';

const TransactionHistory = () => {
    const { user } = useSelector(UserData);
 const data = useSelector(selectUserProfile);
    // State for transactions and pagination
    const [transactionsData, setTransactionsData] = useState({
        currentPage: 1,
        totalPages: 0,
        totalTransactions: 0,
        transactions: []
    });

    const [transactionsPerPage] = useState(5); // Transactions per page

    // Function to fetch transaction history with pagination
    const fetchTransactionHistory = async (page = 1) => {
        if (!user?.email) return;

        try {
            const { currentPage, totalPages, totalTransactions, transactions } = await transactionHistory({
                email: user.email,
                page,
                limit: transactionsPerPage
            });
            console.log('transactions', transactions)

            setTransactionsData({
                currentPage,
                totalPages,
                totalTransactions,
                transactions
            });
        } catch (error) {
            console.error('Error fetching transaction history:', error);
        }
    };

    // Fetch transaction history on component mount and when page changes
    useEffect(() => {
        fetchTransactionHistory(transactionsData.currentPage);
    }, [transactionsData.currentPage]);

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= transactionsData.totalPages) {
            setTransactionsData((prevState) => ({
                ...prevState,
                currentPage: newPage
            }));
        }
    };

    // Calculate the total balance from the most recent transaction

    return (
        <div className="max-w-6xl mx-auto p-3 bg-gray-100 shadow-lg rounded-lg">
            {/* Transaction History Header with Total Balance */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Transaction History</h2>
                <div className="text-xl font-semibold text-green-500">
                    Total Balance: ₹{data?.walletBalance||0}
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
                        {transactionsData?.transactions?.map((transaction) => (
                            <tr key={transaction.id} className="border-b">
                                <td className="px-4 py-3">{new Date(transaction.date).toLocaleDateString()}</td>
                                <td className="px-4 py-3">{transaction.description}</td>
                                <td className={`px-4 py-3 ${transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
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
                    onClick={() => handlePageChange(transactionsData.currentPage - 1)}
                    disabled={transactionsData.currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {transactionsData.currentPage} of {transactionsData.totalPages}
                </span>
                <button
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                    onClick={() => handlePageChange(transactionsData.currentPage + 1)}
                    disabled={transactionsData.currentPage === transactionsData.totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TransactionHistory;
