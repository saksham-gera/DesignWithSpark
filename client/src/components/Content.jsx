import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Information from '../pages/Information';
import Settings from '../pages/Settings';
import Dashboard from '../pages/Dashboard';
import Create from '../pages/Create';
import AskAI from '../pages/AskAI';
import Editor from '../pages/Editor';

export default function Content() {
  return (
    
    <div className='w-full'>
        <Routes>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/createnew' element={<Create />}/>
            <Route path='/askai' element={<AskAI />}/>
            <Route path='/editor' element={<Editor />}/>
            <Route path='/information' element={<Information />}/>
            <Route path='/settings' element={<Settings />}/>
            <Route path='/logout' element={<div className='text-blue-800'>Log Out Success</div>}/>
        </Routes>
    </div>
  )
}
