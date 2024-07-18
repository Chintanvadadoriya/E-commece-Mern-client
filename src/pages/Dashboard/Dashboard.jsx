import React from 'react';
import SummaryCards from '../../components/Dashboard/SummaryCards';
import SalesChart from '../../components/Dashboard/SalesChart';
import OrdersChart from '../../components/Dashboard/OrdersChart';
import UserActivityChart from '../../components/Dashboard/UserActivityChart';
const isLargeScreen = window.innerWidth > 1024

console.log('isLargeScreen', isLargeScreen   )
const Dashboard = () => {
    const summaryData = {
        totalSales: 12000,
        totalOrders: 150,
        totalProducts: 75,
        newCustomers: 20,
    };

    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [3000, 2500, 4000, 3500, 5000, 4500],
    };

    const ordersData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [50, 40, 60, 55, 70, 65],
    };

    const userActivityData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        values: [100, 200, 150, 300, 250, 400],
    };

    return (
        <div className={`${isLargeScreen? 'custom-container':''} container mx-auto p-6`}>
            <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
            <SummaryCards {...summaryData} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SalesChart data={salesData} />
                <OrdersChart data={ordersData} />
            </div>
            <UserActivityChart data={userActivityData} />
        </div>
    );
};

export default Dashboard;
