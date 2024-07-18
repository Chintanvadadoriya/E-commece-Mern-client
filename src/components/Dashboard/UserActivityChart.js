import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
const UserActivityChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'User Activity',
        data: data.values,
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 mt-6 h-64">
      <h2 className="text-lg font-semibold mb-4">User Activity</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default UserActivityChart;
