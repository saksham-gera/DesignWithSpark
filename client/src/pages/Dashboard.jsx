import React from 'react'
import GreetingWithPlanner from '../components/GreetingWithPlanner'
import ProgressCard from '../components/ProgressCard';
import { useTheme } from '@mui/material/styles';
export default function Dashboard() {
const theme = useTheme();

  return (

    <div className='m-5 dashboard'>
      <GreetingWithPlanner />
      <div className="flex">

      </div>
    </div>
  )
}
