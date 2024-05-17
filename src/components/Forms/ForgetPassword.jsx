import React, { useState } from 'react'
import IconBtn from '../../Common/Icon'
import {  getAuth ,sendPasswordResetEmail,onAuthStateChanged} from 'firebase/auth'
import toast from 'react-hot-toast'
const ForgetPassword = () => {
  

const[email,setEmail]=useState('')
const auth = getAuth();
onAuthStateChanged(auth,(user)=>{
  setEmail(user.email)
  })


const sendPasswordReset = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Reset Password link sent Successfully")
        
      })
      .catch((error) => {
       toast.error("something went wrong")
      });
  };

  function clickHandler(e){

sendPasswordReset(email)

}
function changehandle(e){
setEmail(e.target.value)
}
  return (
    <div className='bg-pure-greys-900'>
      <div className='w-[300px] h-[200px] flex flex-col gap-y-8 mx-auto my-auto mt-[300px] justify-center items-center '>
        <input  className="w-full px-3 outline-none rounded-md bg-pure-greys-600 h-[40px] text-white" type='email' placeholder='type your email' onChange={changehandle} value={email}/>
          <IconBtn onclick={clickHandler} text={"sent"}/>
      </div>
    </div>
  )
}

export default ForgetPassword
