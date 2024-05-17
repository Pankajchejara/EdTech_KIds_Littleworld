import React, {  useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider,signInWithPopup ,fetchSignInMethodsForEmail,onAuthStateChanged,sendEmailVerification} from "firebase/auth";//auth
import {app} from '../../Database/FireBase' //app

import {getFirestore,collection,addDoc,doc,getDocs,getDoc,setDoc,updateDoc,deleteDoc} from 'firebase/firestore'


const ContactUsForm = () => {
  const auth=getAuth(app)
  const firestore=getFirestore(app)
const navigate=useNavigate()
const[showSpan,setShowSpan]=useState(false)
  const[formdata,SetFormdata]=useState({
    firstname:'', lastname:'',  email:'',phonenumber:"",message:''
  })
  console.log("formdata",formdata)

  function changeContactForm(e){
    SetFormdata((prev)=>{
        return{...prev,[e.target.name]:e.target.value}
    })
  }

  async function submitContactForm(e) {
   e.preventDefault();
   setShowSpan(true)
   if(!formdata.firstname ==''&& !formdata.lastname ==''&& !formdata.email ==''&&!formdata.phonenumber ==''&&!formdata.message ==''){
    toast.success("Thanks for your feedback");
    const docRef = await addDoc(collection(firestore, "Feedback"), {
      ...formdata
  });



    navigate('/')
   }
   else{
    toast.error(`please fill all the field`)
   }
  }

  return (
    <form
      className="flex flex-col gap-7"
      onSubmit={submitContactForm}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="lable-style">
            First Name
          </label>
          <input
         
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="bg-pure-greys-700 rounded-md text-white"
             onChange={changeContactForm}
          />
          {showSpan&&!formdata.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="lable-style">
            Last Name
          </label>
          <input
          
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="bg-pure-greys-700 rounded-md text-white"
            onChange={changeContactForm}
          />
           {showSpan&&!formdata.lastname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="bg-pure-greys-700 rounded-md text-white"
          onChange={changeContactForm}
        />
        {showSpan&&!formdata.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

        
          
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="bg-pure-greys-700 rounded-md text-white"
              onChange={changeContactForm}
              
            />
          
        </div>
        {showSpan&&!formdata.phonenumber && (
          <span className="-mt-1 text-[12px] text-yellow-100">
          Please enter your phone number.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="bg-pure-greys-700 rounded-md text-white"
          onChange={changeContactForm}
        />
        {showSpan&&!formdata.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>

      <button
       
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
        `}
      >
        Send Message
      </button>
    </form>
  )
}

export default ContactUsForm