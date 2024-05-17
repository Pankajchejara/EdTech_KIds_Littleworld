import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link,  useNavigate } from 'react-router-dom';
import {app} from'../../Database/FireBase'
import { getAuth, signInWithEmailAndPassword ,onAuthStateChanged,sendEmailVerification} from "firebase/auth";
import toast from 'react-hot-toast'


const LoginForm = ({setIsLoggedIn}) => {
    const auth=getAuth(app)
  
 const navigate = useNavigate();


    const [formData, setFormData] = useState( {
        email:"", password:""
    })

    const[showPassword, setShowPassword] = useState(false);

    function changeHandler(event) {

        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )

    }
   
    async function sendVerificationEmail(email) {
        try {
            // Get the current user from Firebase Authentication
            const user = auth.currentUser;
    
            // Check if the user is signed in
            if (user) {
                // Send verification email
                await sendEmailVerification(user);
                toast.success(`Verification email sent successfully to ${email}`);
                verifyEmail()
                // You can add additional logic here if needed
            } else {
                // User is not signed in
              
                toast.error('Failed to send verification email. No user signed in.');
            }
        } catch(err){
            
        }
    }
    
    
    function verifyEmail(){
    const verifyInterval = setInterval(async () => {
        onAuthStateChanged(auth,async(user)=>{

            await user.reload(); // Reload user data to get the latest email verification status
            if (user.emailVerified) {
                // setIsLoggedIn(true);
                clearInterval(verifyInterval); // Stop checking
               
                navigate("/dashboard/profile"); // Navigate to the profile page
            } 
        })
    }, 5000); 

    setTimeout(() => {
        clearInterval(verifyInterval);
    }, 30000);
    }


    function login(email, password) {
        signInWithEmailAndPassword(auth, email, password).then(()=>{

            onAuthStateChanged(auth,async(user)=>{
    
                if (user.emailVerified) {
                    setIsLoggedIn(true)
                    navigate("/dashboard/profile"); // Navigate to the profile page
                    toast.success("your email is verified."); // Display a message to the user

                } else {
                    toast.error("Please verify your email.");
                    
                    sendVerificationEmail(email) // Display a message to the user
                }
            })
        }).catch((err)=>{
           
            if(err.code=='auth/invalid-credential'){
                toast.error("Please Check email or password")
            }
           else if(err.code==="auth/network-request-failed"){
                toast.error("network connection  failed")
            }
        })
    }
    
    
    
    
    
    
    function submitHandler(event) {
        event.preventDefault();
   login(formData.email,formData.password)
}

  return (
    <form onSubmit={submitHandler}
    className="flex flex-col w-full gap-y-4 mt-6">

        <label className='w-full'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Email Address<sup className='text-pink-200'>*</sup>
            </p>
            <input 
                required
                type="email"
                value = {formData.email}
                onChange={changeHandler}
                placeholder="Enter email address"
                name="email"
                className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
        </label>

        <label className='w-full relative'>
            <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
                Password<sup className='text-pink-200'>*</sup>
            </p>
            <input 
                required
                type= {showPassword ? ("text") : ("password")}
                value = {formData.password}
                onChange={changeHandler}
                placeholder="Enter Password"
                name="password"
                className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />

            <span 
            className='absolute right-3 top-[38px] cursor-pointer'
            onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? 

                (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
            </span>

            <Link to="/forget">
                <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto'>
                    Forgot Password
                </p>
            </Link>
        </label>

        <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
            Sign In
        </button>

    </form>
  )
}

export default LoginForm
