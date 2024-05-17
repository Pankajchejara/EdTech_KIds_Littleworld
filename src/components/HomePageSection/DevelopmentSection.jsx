import React from 'react';
import { CgGames } from "react-icons/cg";
import { FaBrain } from "react-icons/fa6";
import { GiSkills } from "react-icons/gi";
import { SiFuturelearn } from "react-icons/si";
import { useEffect } from 'react';
import AOS from 'aos'
import 'aos/dist/aos.css'

const DevelopmentSection = () => {
  let heroImage=" https://res.cloudinary.com/dqr1ihw8d/image/upload/v1709385176/cf97rriuqmoeew2uears.png"
  let bookImage=" https://res.cloudinary.com/dqr1ihw8d/image/upload/v1709385275/pzlivlg208x9zsx8ciqc.png"
  let gamePadImage=" https://res.cloudinary.com/dqr1ihw8d/image/upload/v1709385350/j7kp10v1izqippxahfy4.png"

  useEffect(()=>{
    AOS.init({duration :2000})
  },[])
  
  return (
    <div data-aos="fade-right">
      <div className='w-11/12 mx-auto flex flex-col lg:flex-row xl:flex-row md:flex-col sm:flex-col md:items-center sm:items-center lg:justify-between  items-center'>

        <div className='flex flex-col w-[80%] sm:w-[90%]  md:w-[70%] lg:w-[45%]  justify-center gap-y-6 items-center'>

          <div className='flex w-full justify-around'>
            <div className='w-[48px] h-[48px] hover:shadow-blue-100 shadow-md shadow-blue-500  bg-puregreys-800 rounded-full flex justify-center items-center'>
              <CgGames className='text-2xl text-blue-500' />
            </div>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-xl lg:text-3xl font-bold text-blue-500'>Game Development</p>
              <p className=' opacity-80 text-[10px] lg:text-[16px] md:text-[13px] sm:text-[12px] text-white'>Fully committed to the success company</p>
            </div>
          </div>



          <div className='flex  w-full justify-around'>
  <div className='w-[48px] h-[48px]  shadow-md hover:shadow-brown-800 shadow-brown-100  bg-pure-greys-800 rounded-full  flex justify-center items-center' >

 <FaBrain className='text-2xl text-brown-100 ' />
  </div>
  <div className='flex flex-col justify-center items-center'>

  <p className='text-xl lg:text-3xl text-brown-100 font-bold'>Brain Development</p>
  <p className='opacity-80 text-white  text-[10px] lg:text-[16px] md:text-[13px] sm:text-[12px]'>Fully committed to the success company</p>
  </div>

 </div>

 <div className='flex  w-full justify-around'>
  <div className='w-[48px]  bg-pure-greys-800 shadow-md shadow-yellow-100 hover:shadow-yellow-500 h-[48px]  rounded-full  flex justify-center items-center'>

 <GiSkills  className='text-2xl text-yellow-100'/>
  </div>
  <div className='flex flex-col justify-center items-center'>

  <p className='text-xl lg:text-3xl font-bold text-yellow-100'>Skill Development</p>
  <p className='opacity-80 text-white text-[10px] lg:text-[16px] md:text-[13px] sm:text-[12px]'>Fully committed to the success company</p>
  </div>

 </div>

 <div className='flex   w-full justify-around '>
<div className='w-[48px] shadow-md shadow-caribbeangreen-500  hover:shadow-caribbeangreen-100 h-[48px] bg-puregreys-800 rounded-full  flex justify-center items-center'>

<SiFuturelearn  className='    lg:text-2xl xl:text-2xl md:text-1rem sm:text-0.6rem text-0.5rem text-caribbeangreen-500'/>
</div>
<div className='flex flex-col justify-center items-center'>

  <p className='text-xl lg:text-3xl font-bold text-caribbeangreen-500'>Learning Development</p>
  <p className='opacity-80  text-white text-[10px] lg:text-[16px] md:text-[13px] sm:text-[12px] '>Fully committed to the success company</p>
  </div>

 </div>
          

        </div>

        <div className='w-[65%] sm:w-[70%] md:w-[80%] lg:w-[45%] h-auto relative ' data-aos="fade-left">
          <img src={heroImage} className='w-full' alt='Not Available' />
          <img src={bookImage} className='book w-[20%] lg:w-[20%] absolute top-[18%] -left-[5%]' alt='Not Available'/>
          <img src={gamePadImage} className='book w-[20%] lg:w-[20%] absolute top-[30%] left-[20%]' alt='Not Available'/>
        </div>

      </div>
    </div>
  );
};

export default DevelopmentSection;
