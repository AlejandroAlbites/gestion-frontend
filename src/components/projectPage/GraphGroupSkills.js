import React, { useMemo } from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const skills = ['Con', 'Vel', 'Lid', 'Soc', 'Res'];

const options = {
  indexAxis: 'y',
  fill: true,
  responsive: true,
  scales: {
    x: {
      min: 0,
      max: 100,
    },
  },
};

export const GraphGroupSkills = ({ group }) => {
  const { techniciansId } = group;

  const { technicians } = useSelector((state) => state.technicianReducer);
  const technicianInGroup = technicians.filter((tecnician) =>
    techniciansId.find((techId) => tecnician._id === techId)
  );
  const statistics = technicianInGroup.map((stadistic) => stadistic.statistics);

  const promCo = Math.trunc(
    statistics.map((item) => item[0]).reduce((acc, el) => acc + el, 0) /
      statistics.length
  );

  const promVe = Math.trunc(
    statistics.map((item) => item[1]).reduce((acc, el) => acc + el, 0) /
      statistics.length
  );
  const promLi = Math.trunc(
    statistics.map((item) => item[2]).reduce((acc, el) => acc + el, 0) /
      statistics.length
  );
  const promSo = Math.trunc(
    statistics.map((item) => item[3]).reduce((acc, el) => acc + el, 0) /
      statistics.length
  );
  const promRe = Math.trunc(
    statistics.map((item) => item[4]).reduce((acc, el) => acc + el, 0) /
      statistics.length
  );
  const promStadistic = [promCo, promVe, promLi, promSo, promRe];

  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: 'Promedio de habilidades',
          data: promStadistic,
          tension: 0.3,
          borderColor: 'rgba(255, 159, 64, 0.2)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderWidth: 1,
        },
      ],
      labels: skills,
    };
  }, []);
  return <Bar data={data} options={options} />;
};
