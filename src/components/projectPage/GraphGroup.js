import React, { useMemo } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0,
      max: 100,
    },
  },
};

export const GraphGroup = ({ group }) => {
  const { tasks, score } = group;
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: 'Gráfica de Trabajos ',
          data: score,
          tension: 0.3,
          borderColor: '#6ddbcd',
          backgroundColor: 'rgba(75, 192, 192, 0.3)',
        },
      ],
      labels: tasks,
    };
  }, []);
  return <Line data={data} options={options} />;
};
