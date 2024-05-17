import React, { useState ,useEffect,useContext} from 'react'
 import Sidebar from './Sidebar'
 import {Links} from '../../data/Links'
 
 import { Appcontext } from '../../context/Appcontext';
import { getAuth,onAuthStateChanged} from "firebase/auth";//auth
import {app} from '../../Database/FireBase' //app
import {getFirestore} from 'firebase/firestore'
const MainSection = () => {
const[ACCOUNT_TYPE,setAccountType]=useState('student')

const firestore=getFirestore(app)
const auth = getAuth(app);
const { fetchUserProfileDetails} = useContext(Appcontext)
try{
  useEffect(()=>{
    fetchUserProfileDetails().then((res)=>{
    
      onAuthStateChanged(auth,(user)=>{
        if(user){
         
        setAccountType(((res.filter((obj)=>obj.email===user.email))[0]).accountType)
        }
      })
  }) 
  },[firestore])
  
 
}
catch{
  setAccountType('student')
}
  return (
    <div className=" text-white hidden lg:flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-900 bg-pure-greys-900 py-10 gap-y-[20px]">
      {
        Links.map((link,index)=>(
          
            
              (link.type==ACCOUNT_TYPE||link.name=="My Profile"||link.name=="Setting")&&( <Sidebar key={index} link={link}/>)
            
          
          
           
        ))
      }
    </div>
  )
}

export default MainSection
