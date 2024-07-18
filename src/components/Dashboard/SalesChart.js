import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const SalesChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Sales',
        data: data.values,
        borderColor: 'rgba(75, 192, 192, 1)',
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
    <div className="bg-white shadow rounded-lg p-6 mt-6 h-64 md:h-80">
      <h2 className="text-lg font-semibold mb-4">Sales</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesChart;
