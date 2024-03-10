import React from 'react'
import GreetingWithPlanner from '../components/GreetingWithPlanner'
import ProgressCard from '../components/ProgressCard';
import { useTheme } from '@mui/material/styles';
import AreaChart from '../components/AreaChart';
import Summarycard from '../components/Summarycard';
import MetricsContainer from '../components/metricCard/Metriccontainer';
export default function Dashboard() {
const theme = useTheme();

  return (

    <div className='m-5 dashboard'>
      <GreetingWithPlanner />
      <div className="flex 	mb-10">
          <AreaChart />
          <Summarycard />
      </div>
      <MetricsContainer />
    </div>
  )
}
