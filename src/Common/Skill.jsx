import React from 'react'
import IconBtn from './Icon'
import { useNavigate } from 'react-router-dom'
const Skill = ({Colour,text,outline}) => {
const navigate=useNavigate()

function ClickHandle(){
navigate('/dashboard/courses')
}


  return (
    
       <div className={` hover:shadow-${Colour}-100 shadow-md p-6 md:w-[600px] sm:w-[400px] w-[300px] lg:w-[500px] xl:w-[500px]  flex flex-col gap-y-3 `}>
    {text} 
    
    <p className='font-bold opacity-70 text-white '>Fueling curiosity, our platform offers interactive learning for kids. Through engaging games and dynamic lessons, we inspire a lifelong love of learning. Explore, play, and grow with us</p>
   <div><IconBtn text="Go to Learning" outline={outline} onclick={ClickHandle}/> </div> 
  </div>
   
  )
}

export default Skill
