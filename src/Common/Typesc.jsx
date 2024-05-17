import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import Tilt  from 'react-parallax-tilt'
import { Glow } from '@codaworks/react-glow'
import { GlowCapture } from '@codaworks/react-glow'

const Typesc = ({codeblock,Colour}) => {

 
  return (
    <div className='relative'>
      <Tilt>
        <GlowCapture>
        <Glow >
      <div className={`glow:bg-cyan-100/20 cursor-pointer glow:border-${Colour}-700/100 flex flex-row  py-4 lg:h-fit  xl:h-fit md:h-fit lg:w-[500px] md:w-[600px] sm:w-[400px] sm:h-[300px] h-[400px] w-[300px] border bg-pure-greys-800 relative border-pure-greys-300 `}> 
          
    
            <div className='text-center flex flex-col w-[10%]  text-white  font-inter font-bold ml-[20px] -mt-[10px] '>
                <p className='w-[10px] h-[10px] rounded text-pure-greys-300 mt-[10px]'>1</p>
                <p className='w-[10px] h-[10px] rounded text-pure-greys-300 mt-[10px]'>2</p>
                <p className='w-[10px] h-[10px] rounded text-pure-greys-300 mt-[10px]'>3</p>
                <p className='w-[10px] h-[10px] rounded text-pure-greys-300 mt-[10px]'>4</p>
                <p className='w-[10px] h-[10px] rounded text-pure-greys-300 mt-[10px]'>5</p>
                <p className='w-[10px] h-[10px] rounded text-pure-greys-300 mt-[10px]'>6</p>
                <p className='w-[10px] h-[10px] rounded text-pure-greys-300 mt-[10px]'>7</p>
                <p className='w-[10px] h-[10px] rounded text-pure-greys-300 mt-[10px]'>8</p>
                <p className='w-[10px] h-[10px] rounded text-pure-greys-300 mt-[10px]'>9</p>
                <p className='w-[10px] h-[10px] rounded text-pure-greys-300 mt-[10px]'>10</p>
                <p className='w-[10px] h-[10px] rounded text-pure-greys-300 mt-[10px]'>11</p>
                <p className='w-[10px] h-[10px] rounded text-pure-greys-300 mt-[10px]'>12</p>
                
            </div>
    
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono text-${Colour}-100 pr-2 `}>
               <TypeAnimation
                sequence={[codeblock, 2000, ""]}
                repeat={Infinity}
                cursor={true}
               
                style = {
                    {
                        whiteSpace: "pre-line",
                        display:"block",
                    }
                }
                omitDeletionAnimation={true}
               />
            </div>
    



    
         </div>
         </Glow>
         </GlowCapture>
         </Tilt>
         <div className={`w-[200px] h-[200px] rounded-full blur-3xl bg-${Colour}-500 absolute top-0`}></div>
    </div>
  )
}

export default Typesc
