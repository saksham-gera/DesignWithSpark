import React from 'react'
import { useTheme } from '@mui/material/styles';
import AreaChart from '../components/AreaChart';

import Summarycard from '../components/Summarycard';
import MetricsContainer from '../components/metricCard/Metriccontainer';
import GreetingBox from '../components/GreetingBox';
import AIWithText from '../components/AIWithText';
export default function Dashboard() {
  const theme = useTheme();

  return (

    <div className='mr-[2rem] mt-5 flex flex-col lg:flex-row justify-between dashboard'>
      <div className="flex flex-col items-center justify-center">
        <div className="mid flex flex-col">
          <GreetingBox/>
          <div className="flex lg:flex-row flex-col item-center justify-center mb-4">
            <AreaChart />
            <Summarycard />
          </div>
        </div>
        <MetricsContainer />
      </div>
      <div className="md:ml-8 ml-0">
        <AIWithText />      
      </div>
    </div>
  )
}
