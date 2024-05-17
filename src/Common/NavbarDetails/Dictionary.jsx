import React, {  useState } from 'react'
import Spinner from '../../components/Spinner';

import { CiSearch } from "react-icons/ci"
import { AiFillSound } from "react-icons/ai";

import toast from 'react-hot-toast';
const defaultImage="https://res.cloudinary.com/dqr1ihw8d/image/upload/v1713271018/yfsyj8pbg6pjuimxpc8t.png"
let ErrorImage=" https://res.cloudinary.com/dqr1ihw8d/image/upload/v1709386219/eex2ojsnzhpzyf82bxjx.jpg"
const Dictionary = () => {



    
    
    const[music,setMusic]=useState("")
    const[image,setImage]=useState(defaultImage)
    const[viewAudioIcon,setViewAudioIcon]=useState(false)
 
    const[example,SetExample]=useState("")
    const[pos,setPos]=useState('')
    const[loading,setLoading]=useState(false);
    const[inword,setInword]=useState("")
    const[defination,setDefination]=useState("Apple")

   
     const unsplashurl=`https://api.unsplash.com/search/photos?page=1&query=${inword}&client_id=p7Sl3eBqlIgMOZnRAGaC0g0ACR3lf5risDUIPGZDeXc` 
    
    const dictionaryUrl=`https://api.dictionaryapi.dev/api/v2/entries/en/${inword}`

    async function dictionaryWord() {
      try {
          setLoading(true);
  
          const response = await fetch(dictionaryUrl);
          const alldata = await response.json();
  
          const pos = alldata[0]?.meanings[0]?.partOfSpeech || "Error";
          const exam = alldata[0]?.meanings[0]?.definitions[0]?.example || "No example available";
          const defination = alldata[0]?.meanings[0]?.definitions[0]?.definition || "No definition available";
          const music = alldata[0]?.phonetics[0]?.audio || "";
          
          setPos(pos);
          SetExample(exam);
          setDefination(defination);
          setMusic(music);
          setViewAudioIcon(!!music);
          setLoading(false);
      } catch (error) {
         
          setDefination("No definition available");
          SetExample("No example available");
          setPos("Error");
          setLoading(false);
          setViewAudioIcon(false);
          setImage(ErrorImage);
          toast.error("Please type carefully");
      }
  
      try {
          const unsplashdata = await fetch(unsplashurl);
          const unsplashJsonData = await unsplashdata.json();
  
          if (unsplashJsonData.results && unsplashJsonData.results.length > 0) {
              setImage(unsplashJsonData.results[0].urls.small);
          } else {
              setImage(ErrorImage);
          }
      } catch (error) {
          console.error('Error fetching image:', error);
          setImage(ErrorImage);
          toast.error("Something went wrong");
      }
  }
  




  function changehandler(e){
 setInword(e.target.value)
  }

  function clickHandler(e){
    dictionaryWord(inword)
  }

  function clickToPlayAudio(){
    let audio =new Audio(music)
    audio.play();
  }
 
  return (
    <div className='   rounded-[0.5rem]  mt-[100px] overflow-x-hidden w-full  bg-pure-greys-900 ' >
<div className='w-[50%] mx-auto relative'>

<div className='flex  items-center flex-col'>

        <div className='flex bg-pure-greys-700 w-[50%] rounded-[0.5rem] justify-evenly '>

       <input type='text' onChange={changehandler} value={inword} className=' w-[200px] outline-none rounded-[0.5rem] p-[12px] bg-pure-greys-700 text-brown-200 font-bold 'placeholder='Type text here'/>
      <p className='w-[40px] h-[40px] cursor-pointer'><CiSearch  className='text-blue-100  text-[50px] 'onClick={clickHandler}/></p>

 </div>



      { !loading&&  <div className='flex flex-col w-full '>
                
            <p className='text-brown-200 text-[25px] font-bold mt-7'>{defination}</p>
            <div className='w-full h-1 bg-richblack-5'></div>
            <br/>
            <p ><span className='text-brown-200'>Example :</span> <span className='text-blue-200'>{example}</span> </p>
          
            <p><span className='font-bold text-brown-200 text-[20px]'> Part of Speech :</span><span className='font-sarif text-blue-100'>{pos}</span></p>
            <div className='lg:w-[500px] md:w-[300px] w-[200px] sm:w-[300px] h-[140px]  md:h-[150px] sm:h-[150px] lg:h-[250px] mx-auto rounded-md border border-b-white'>
   

       <img src={image} className='object-cover w-full h-full aspect-auto' alt='Not Available'/>
               </div>
            <div className='flex gap-x-[30px] w-full p-[10px]'>
                  <p className=' font-bold text-brown-200 text-3xl'>{inword}</p>
                {
                 viewAudioIcon&& <button onClick={clickToPlayAudio}><AiFillSound className='text-blue-100 text-2xl'/></button>
                }
            </div>

         </div>}


       {loading&&

       <div className='w-full h-[500px]  text-white opacity-80 text-3xl flex items-center justify-center'>
            Please wait...  <Spinner/>
         </div>}


</div>



         
        
        
     </div>
    </div>
   
  )
}

export default Dictionary
