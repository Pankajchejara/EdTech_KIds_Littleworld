import React from 'react'

import { Outlet } from 'react-router-dom';

import MainSection from './MainSection';
const Dashboard = () => {
 
  return (
  

   <div className='mt-[56px]'>
<div className='relative flex min-h-[calc(100vh-3.5rem)] bg-pure-greys-700 overflow-hidden'>
         <MainSection /> 
        {/* Sidebar section  */}
        <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
            <div className='mx-auto w-11/12  justify-center items-center flex-wrap max-w-[100vw] py-10'>
                <Outlet />
            </div>
        </div>
    </div>
   </div>
   
   

    
   
   



  )
}

export default Dashboard
