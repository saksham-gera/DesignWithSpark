import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const MetricCard = ({ label, value, IconComponent, trend }) => {
  // Determine trend arrow color based on the trend value
  const trendColor = trend === 'up' ? 'text-green-500' : 'text-red-500';
  const TrendIcon = trend === 'up' ? ArrowUpwardIcon : ArrowDownwardIcon;

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center justify-between">
        <div className='color-red'> {IconComponent && <IconComponent color="primary" className=" mr-2" />}</div>
  
      <div className={`text-xl ${trendColor} flex items-center`}>

        {value}
        <TrendIcon className="ml-2" />
      </div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  );
};

export default MetricCard;