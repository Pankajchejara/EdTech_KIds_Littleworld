import React, { useEffect } from 'react'
import { Images } from '../../data/Links'
import IconBtn from '../../Common/Icon'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

const CardSection = () => {
  let navigate =useNavigate()
function clickButtonHandler(){
navigate('/Games')
}

useEffect(()=>{
  AOS.init({duration :1000})
},[])

  return (
    <div>
      <div className='w-11/12 mx-auto flex-wrap p-10'>
  <div className='flex flex-wrap mx-auto gap-y-5 justify-around '>
    {
      Images.map((img,index)=>{
        return <div key={index} data-aos='zoom-in' className='relative cursor-pointer py-6 hover:hover:shadow-cyan-500   w-[350px] h-[450px]   flex justify-center items-center bg-pure-greys-900 rounded-md shadow-md'>
          <div className=' items-center w-[300px] h-[360px] flex flex-col gap-y-6 sm:gap-y-[5px]  transition-all duration-400'>
        <div className=' w-[280px] h-[180px] sm:w-full sm:h-[200px] rounded-md'>
        <img src={img.image} className='w-full h-[200px] object-cover transition duration-800 hover:scale-105 rounded-md' alt="Not available "/>
        </div>
        
        <p className='text-white font-bold text-2xl '>{img.title}</p>
        <p className='text-white text-center mx-auto h-auto text-[15px] opacity-60 '>{img.about}</p>
        <div className='mt-[10px]  absolute bottom-3 hover:scale-110 transition-all duration-400'>
        <IconBtn text={"Go to Game"} outline={true} onclick={clickButtonHandler}  />
        </div>
       
        
      </div>  </div>
      })
    }
   
  </div>
  
</div>
    </div>
  )
}

export default CardSection
