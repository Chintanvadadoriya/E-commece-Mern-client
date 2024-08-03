import React, { useEffect, useState } from 'react';
import SummaryCards from '../../components/Dashboard/SummaryCards';
import SalesChart from '../../components/Dashboard/SalesChart';
import OrdersChart from '../../components/Dashboard/OrdersChart';
import UserActivityChart from '../../components/Dashboard/UserActivityChart';
import { useSelector } from 'react-redux';
import { UserData } from '../../redux/authSlice';
import {
  getAdminDeshboardOrderApi,
  getAdminDeshboardOverViewApi,
  getAdminDeshboardSaleApi,
  getAdminDeshboardUserActivityApi,
} from '../../services/authService';
import { getAuthHeader } from '../../constant';
const isLargeScreen = window.innerWidth > 1024;

const ordersData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  values: [50, 40, 60, 55, 70, 65],
};

const userActivityData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  values: [100, 200, 150, 300, 250, 400],
};
const Dashboard = () => {
  const { token } = useSelector(UserData);
  const [adminSummery, setAdminSummery] = useState();
  const [salesData, setSalesData] = useState({ labels: [], values: [] });
  const [ordersData, setOrdersData] = useState({ labels: [], values: [] });
  const [userActivityData, setuserActivityData] = useState({
    labels: [],
    values: [],
  });

  async function fetchAdminDashboard() {
    let { data } = await getAdminDeshboardOverViewApi(getAuthHeader(token));
    setAdminSummery(data);

    let { saleData } = await getAdminDeshboardSaleApi(getAuthHeader(token));

    let salesDataLabels = [];
    let salesDataValues = [];
    saleData.forEach((item) => {
      salesDataLabels.push(item.month);
      salesDataValues.push(item.totalSales);
    });
    setSalesData({ labels: salesDataLabels, values: salesDataValues });

    let { orderData } = await getAdminDeshboardOrderApi(getAuthHeader(token));

    let ordersDataLabels = [];
    let ordersDataValues = [];
    orderData.forEach((item) => {
      ordersDataLabels.push(item.month);
      ordersDataValues.push(item.totalOrders);
    });

    setOrdersData({ labels: ordersDataLabels, values: ordersDataValues });

    let { userActivityData } = await getAdminDeshboardUserActivityApi(
      getAuthHeader(token)
    );

    let userActivityDataLabels = [];
    let userActivityDataValues = [];
    userActivityData.forEach((item) => {
      userActivityDataLabels.push(item.month);
      userActivityDataValues.push(item.newUsers);
    });

    setuserActivityData({
      labels: userActivityDataLabels,
      values: userActivityDataValues,
    });
  }

  useEffect(() => {
    fetchAdminDashboard();
  }, []);

  return (
    <div
      className={`${isLargeScreen ? 'custom-container' : ''} container mx-auto p-6`}
    >
      <h1 className="text-2xl font-semibold mb-6 flex justify-center mb-10">
        Dashboard
      </h1>
      <SummaryCards {...adminSummery} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={salesData} />
        <OrdersChart data={ordersData} />
      </div>
      <UserActivityChart data={userActivityData} />
    </div>
  );
};

export default Dashboard;
