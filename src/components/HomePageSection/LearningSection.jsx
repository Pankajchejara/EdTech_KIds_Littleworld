import React from 'react'
import Runner from '../Runner'
import IconBtn from '../../Common/Icon'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

const LearningSection = () => {
let navigate=useNavigate()
function buttonClickHandler(){
  navigate('/dashboard/courses')
}
useEffect(()=>{
  AOS.init({duration :2000})
},[])


  return (
    <div  className='learningbackground'>
      <div className='  w-11/12 h-full  py-[50px]  mx-auto flex flex-col lg:flex-row xl:flex-row md:flex-col sm:flex-col justify-between items-center gap-y-[50px] relative '>

<div data-aos='zoom-in'  className='lg:w-[500px] hover:shadow-cyan-400 shadow-md lg:h-[350px] w-[320px] h-[350px] md:w-[550px] md:h-[380px] sm:w-[400px] sm-[350px] gap-y-4 flex flex-col justify-center '>
  <p className='text-blue-200 font-bold text-xl sm:text-2xl'>LEARNINGS</p>
  <p className='font-bold text-white text-[30px] sm:text-[40px] leading-9'>Games entertain books educate both enlighten</p>
  <p className='opacity-70 text-white text-[15px] sm:text-xl '> learning, shaping skills through experiences</p>
  <div>
  <IconBtn onclick={buttonClickHandler}>Go to learning</IconBtn>
  </div>
</div>

<div >
<Runner />
</div>

</div>
    </div>
  )
}

export default LearningSection
