import React from 'react'
import Skill from '../../Common/Skill'
import Typesc from '../../Common/Typesc'
import { CgGames } from "react-icons/cg";

import 'aos/dist/aos.css'

const TypeScriptSection = () => {
    let  codeblock1=`Explore a world of playful \nlearning with interactive games,\n a kid-friendly dictionary,\n and engaging classes \n Our commitment is to provide\n a stimulating environment that nurtures\n curiosity and sets the foundation for a\n lifelong love of learning.\non DiscoverFunLearn.com.`
    let  codeblock2=`Discover a rich collection of\n games meticulously crafted to \nblend entertainment with education. Our interactive \ngames are designed to enhance \ncognitive skills, critical thinking,\n and problem-solving abilities. As children play, \nthey embark on a learning journey .`

     let text1=   <h2 className='text-[2rem] text-white font-bold '>Inspiring Learning,<span className='text-yellow-100'>skill Growth  </span>to Elevate Young Minds </h2> 
     let text2=   <h2 className='text-[2rem] text-white font-bold '>Foster curiosity,  <span className='text-blue-100'>ignite growth </span>  - where learning is fun!</h2> 
   
  return (
    <div className='flex flex-col gap-y-6 py-11'>

{/* first div  */}
      <div className='lg:flex-row xl:flex-row xl:justify-between lg:justify-between md:flex-col md:items-center md:justify-center sm:justify-center items-center flex flex-col gap-y-4  justify-between '>

<Skill Colour={"blue"} text={text1}  outline={true}/>
 

 {/* types  */}
 <div className='relative z-10 '>

<Typesc codeblock={codeblock1} Colour={"yellow"} />
<div className='circle shadow-md shadow-yellow-100 w-[70px] h-[70px] bg-pure-greys-900 ring-2 ring-yellow-100 rounded-full flex items-center justify-center absolute sm:right-[50px] sm:-top-[32px] -bottom-[32px] right-[30px] z-0'>
<CgGames className='w-[50px] h-[50px] text-yellow-100'/>
    </div>
 </div>

</div>



{/* next div  */}


<div className=' lg:flex-row-reverse xl:flex-row-reverse xl:justify-between lg:justify-between md:flex-col md:items-center md:justify-center sm:justify-center items-center flex flex-col gap-y-4   justify-between'>
<Skill Colour={"blue"} text={text2}/>

<div className='relative z-10'>
<Typesc codeblock={codeblock2} Colour={"blue"}/>
<div className=' shadow-md shadow-blue-300 circle w-[70px] h-[70px] rounded-full ring-2 justify-center flex items-center ring-blue-100 bg-pure-greys-900 absolute right-[30px] -bottom-[32px]  z-0'>
<CgGames className='w-[50px] h-[50px] text-blue-100'/>
    </div>
</div>

</div>

    </div>
  )
}

export default TypeScriptSection
