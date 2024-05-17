import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { CgGames } from "react-icons/cg";
import { FaBrain } from "react-icons/fa6";
import { GiSkills } from "react-icons/gi";

import { IoMdRocket } from "react-icons/io";
import { useEffect } from 'react';

const Runner = () => {
  useEffect(()=>{
    AOS.init({duration :2000})
  },[])
  
  return (
    <div data-aos="fade-left">

        <div className=' w-[300px] h-[300px] md:w-[400px] spinner1 md:h-[400px] border border-pure-greys-100 flex justify-center items-center rounded-full relative'>

    <div className='w-[50px] h-[50px] rounded-full  ring-2 ring-blue-500 bg-pure-greys-700 absolute -top-[22px] flex justify-center items-center '><CgGames className=' text-3xl text-blue-100'/></div>
<div className='w-[50px] h-[50px] rounded-full ring-2 ring-yellow-100 bg-pure-greys-700 absolute -right-[22px]  flex justify-center items-center border-yellow-100'><FaBrain className=' text-3xl text-yellow-100'/></div>
<div className='w-[50px] h-[50px] rounded-full  ring-2 ring-brown-100 bg-pure-greys-700 absolute -left-[22px]  flex justify-center items-center border-brown-800'><GiSkills className=' text-3xl text-brown-100'/></div>
<div className='w-[50px] h-[50px] rounded-full ring-2 ring-caribbeangreen-100 bg-pure-greys-700 absolute -bottom-[22px]  flex justify-center items-center border-caribbeangreen-700'><GiSkills className=' text-3xl text-caribbeangreen-100'/></div> 
       

        <div className=' w-[200px] h-[200px] md:w-[250px] fixed md:h-[250px] flex justify-center items-center  border-pure-greys-25 mx-auto rounded-full  border-[50px] '>
    <div className=' h-[60px] w-[60px] md:w-[100px] md:h-[100px] rounded-full   ring-2 ring-pink-100  flex justify-center items-center'> <IoMdRocket className='w-full h-full text-pink-100' /></div>
   
   </div>
   </div>
   
   
  </div>
  )
}

export default Runner
