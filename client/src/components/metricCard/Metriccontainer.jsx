import React from 'react';
import MetricCard from './Metriccard.jsx';
import FlashOnIcon from '@mui/icons-material/FlashOn';
// MetricsContainer component representing the outer card containing metric cards
const MetricsContainer = () => {
  return (
    <div className="bg-beige p-6 rounded-3xl shadow-md flex  items-center space-x-4" style={{ backgroundColor: '#E0C3A0' }}>
     <div className='flex flex-col w-0.28 items-left m-3 '>
        <h2 className="text-lg flex font-bold">Engagement</h2>
        <span className="text-md flex text-gray-600">General statistic of user engagement </span>
        <span className="text-md flex text-gray-600">processes.</span>
      </div>
      <div className="flex space-x-4">
        <MetricCard label="This Day" value="133" IconComponent={FlashOnIcon} trend="up" />
        <MetricCard label="This Week" value="471" IconComponent="clock" trend="down" />
        <MetricCard label="This Month" value="929" IconComponent="star" trend="up" />
        <MetricCard label="Pending" value="233" IconComponent="arrowUp" />
        {/* The "Your New Metrics" card can be another component or added here directly */}
        <div className="bg-blue-200 rounded-lg shadow p-4 flex items-center justify-between">
          <div className="text-xl">Your New Metrics</div>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
};

export default MetricsContainer;
