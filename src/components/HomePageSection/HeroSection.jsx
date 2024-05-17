import React from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import plane from '../../assets/plane.png'
import { useEffect } from 'react'
import { Glow } from '@codaworks/react-glow'
import { GlowCapture } from '@codaworks/react-glow'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  let navigate=useNavigate()

  function buttonClickHandler(){
    navigate('/dashboard/courses')
  }
const data=process.env.REACT_APP_NAME

  useEffect(()=>{
    AOS.init({duration :1000})
  },[])

  return (
   
<GlowCapture>
<Glow>
<div className=' glow:border-blue-100 glow:bg-blue-5/10 mt-[100px] border-2 border-pure-greys-900 rounded-xl relative w-11/12 mx-auto gap-y-9 flex flex-col items-center justify-center py-8'>
<div className="flex flex-col w-full justify-center items-center xl:max-w-[900px] text-center gap-4"><h1 data-aos='zoom-in' className="text-5xl sm:text-[3.75rem] font-semibold text-white  ">Defeat the Fear to Success with LittleWorld {data}</h1><p data-aos='zoom-in' className=" text-white text-shark-300 text-base font-normal sm:max-w-[500px]  ">Elevate your absorbing skills, solve challenges, and unlock the world of Leaning possibilities.</p></div>


<div className=' z-10 w-[230px] bg-richblack-700 flex justify-center items-center py-2 rounded-2xl'>
<button  className='w-[200px]  rounded-xl hover:bg-richblack-900 hover:text-pure-greys-200 text-white'onClick={buttonClickHandler}>Go to Courses</button></div>
  <img src={plane} className='absolute  w-auto h-auto  sm:right-14 right-5 -z-1' alt='No available'/>
 
</div>
</Glow>
</GlowCapture>
  )
}

export default HeroSection

