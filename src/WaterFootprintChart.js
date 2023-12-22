import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const WaterFootprintChart = ({ initialFootprint, currentFootprint }) => {
  const data = {
    labels: ['Initial Water Footprint', 'Current Water Footprint'],
    datasets: [
      {
        label: 'Water Footprint',
        data: [initialFootprint, currentFootprint],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: true, // Maintain aspect ratio but fit to container width
    scales: {
      y: {
        beginAtZero: true
      }
    },
    animation: {
      duration: 7000 // Animation duration in milliseconds
    }
  };

  // Style to make chart container fit the page
  const chartContainerStyle = {
    width: '100%',
    maxWidth: '100%', // Maximum width to fit the page
    height: 'auto', // Height will be determined by the aspect ratio
    padding: '20px' // Optional padding for better spacing
  };

  return (
    <>
    <h2>The Office Chart</h2>
     <div style={chartContainerStyle}>
      <Bar data={data} options={options} />
    </div>
    </>
   
  );
};

export default WaterFootprintChart;
