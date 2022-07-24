import React, { useMemo } from 'react';
import Chart from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';

const skills = ['Con', 'Vel', 'Lid', 'Soc', 'Res'];

const options = {
  fill: true,
  responsive: true,
};

export const RadarTechnicianGraph = ({ technician }) => {
  const { statistics } = technician;
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: 'Estadísticas del Personal',
          data: statistics,
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)',
        },
      ],
      labels: skills,
    };
  }, []);
  return <Radar data={data} options={options} />;
};
