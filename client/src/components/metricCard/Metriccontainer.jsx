import React from 'react';
import MetricCard from './Metriccard.jsx';
import FlashOnIcon from '@mui/icons-material/FlashOn';
// MetricsContainer component representing the outer card containing metric cards
const MetricsContainer = () => {
  return (
    <div className="bg-beige p-6 rounded-3xl shadow-md flex w-4/5 items-center space-x-4" style={{ backgroundColor: '#243B55' }}>
      <div className='flex flex-col items-left m-2  text-white  '>
        <h2 className="text-lgflex font-bold mb-3">Engagement</h2>
        <span className="text-md flex ">General statistic of user engagement </span>
        <span className="text-md flex ">processes.</span>
      </div>
      <div className="flex gap-8 md:flex-row flex-col">
        <MetricCard label="This Month" value="929" IconComponent="star" trend="up" />
        <MetricCard label="Last Month" value="233" IconComponent="arrowUp" />
      </div>
    </div>
  );
};

export default MetricsContainer;
