import React from 'react'
import { useTheme } from '@mui/material/styles';
import AreaChart from '../components/AreaChart';

import Summarycard from '../components/Summarycard';
import MetricsContainer from '../components/metricCard/Metriccontainer';
import AskAI from './AskAI';
import GreetingBox from '../components/GreetingBox';
import AIWithText from '../components/AIWithText';
export default function Dashboard() {
  const theme = useTheme();

  return (

    <div className='mr-[2rem] mt-5 flex justify-between dashboard'>
      <div className="left flex flex-col items-center justify-center">
        <div className="mid flex flex-col">
          <GreetingBox name="JASHWANTH" />
          <div className="flex">
            <AreaChart />
            <Summarycard />
          </div>
        </div>
        <MetricsContainer />
      </div>
      <div className="right">
        <AIWithText />      
      </div>
    </div>
  )
}
