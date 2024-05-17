import React, { useState } from "react";
import { HomePageExplore } from "../../data/HomePageExplore";

import Tilt  from 'react-parallax-tilt'
import { Glow } from "@codaworks/react-glow";
import { GlowCapture } from "@codaworks/react-glow";


const tabsName = [
  "Explore",
  "Learning",
  "Imagination",
  "Habits",
  "Career paths",
];

const ExploreMore = () => {
  
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  

  const setMyCards = (value) => {
  
    const result = HomePageExplore.filter((course) => course.tag === value);
    
    setCourses(result[0].courses);
    
  };

  return (
    <div className=" w-full h-full  flex flex-col gap-y-6 py-7 items-center">
      <div className="flex flex-col gap-y-2 lg:flex-row border w-[200px] border-blue-300 lg:border-none items-center justify-center gap-x-4 lg:w-11/12 mx-auto   rounded-xl">
        {
            tabsName.map((data,index)=>{
                return <p key={index} className="text-white hover:text-yellow-5 cursor-pointer border-cyan-400 rounded-md border py-1 px-3" onClick={()=>setMyCards(data)}>{data}</p>
            })
        }
      
      </div>
 
     <div className="w-11/12 flex justify-center items-center gap-4 flex-wrap">
        {
            courses.map((data,index)=>{


                return<Tilt key={index}>
                    <GlowCapture>
                        <Glow>
                 <div key= {index} className="w-[280px] h-[180px] sm:w-[300px] sm:h-[200px] flex flex-col gap-y-4 shadow-md  glow:bg-cyan-100/20 cursor-pointer shadow-cyan-400">
                        <p className="text-center border-b border-white border-dashed text-yellow-5 ">{data.heading}</p>
                        <p className="text-white opacity-80 text-center h-[100px]">{data.description}</p>
                        <p className="text-yellow-100 text-xl bg-blue-100 w-full text-center">{data.level}</p>
                        <p>{data.lessionNumber}</p>


                </div>
                </Glow>
                </GlowCapture>
                </Tilt>
            })
        }
     </div>

    </div>
  );
};

export default ExploreMore;