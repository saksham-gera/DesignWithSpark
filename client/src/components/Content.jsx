import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard';
import Create from '../pages/Create';
import Editor from '../pages/Editor';
import Aboutus from '../pages/Aboutus';


import TshirtCustomizer from '../pages/dcustomize';


export default function Content() {
  return (
    
    <div className='w-full'>
        <Routes>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/createnew' element={<Create />}/>
            <Route path='/editor' element={<Editor />}/>
            <Route path='/aboutus' element={< Aboutus/>}/>
            <Route path='/customize' element={<TshirtCustomizer />}/>
            <Route path='/logout' element={<div className='text-blue-800'>Log Out Success</div>}/>
        </Routes>
    </div>
  )
}
