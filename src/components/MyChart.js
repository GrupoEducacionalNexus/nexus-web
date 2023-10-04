import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

const MyChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    fetchData().then(result => {
      if (isMounted) {
        setData(result);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const chartData = {
    labels: ['Category 1', 'Category 2', 'Category 3'],
    datasets: [
      {
        label: 'Count',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>My Chart</h1>
      <Bar data={chartData} />
    </div>
  );
};

const fetchData = () => {
  // Simulating an asynchronous data fetch
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([10, 15, 7]);
    }, 2000);
  });
};

export default MyChart;
