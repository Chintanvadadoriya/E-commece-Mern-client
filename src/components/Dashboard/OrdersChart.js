import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
const OrdersChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Orders',
        data: data.values,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6 h-64 md:h-80">
      <h2 className="text-lg font-semibold mb-4">Orders</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default OrdersChart;
