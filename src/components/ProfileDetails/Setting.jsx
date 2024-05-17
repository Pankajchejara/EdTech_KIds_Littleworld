import React, {  useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import IconBtn from '../../Common/Icon'
import { useContext } from 'react';
import { Appcontext } from '../../context/Appcontext';
import toast from 'react-hot-toast'
import {app} from '../../Database/FireBase'
import { getAuth ,onAuthStateChanged, reauthenticateWithCredential, updatePassword,EmailAuthProvider } from 'firebase/auth';
import {getFirestore,doc,updateDoc} from 'firebase/firestore';


const Setting = () => {
  const firestore=getFirestore(app)
  const { fetchUserProfileDetails } = useContext(Appcontext)
  const auth=getAuth(app)
  const [SignUpdataobject, SetSignUpDataObject] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [Password, setPassword] = useState({
    oldPassword: "", newPassword: ""
  })
  let navigate = useNavigate()


   
    //fecth profile data
    useEffect(()=>{
      fetchUserProfileDetails().then((res)=>{
       
        onAuthStateChanged(auth,(user)=>{
          if(user){
            SetSignUpDataObject((res.filter((obj)=>obj.email===user.email))[0])
        }
    })
    }) 
    },[])
    
    
//update
    async function updateDocumentById(collectionName, documentId, newData) {
      try {
          // Reference to the document in a specific collection
          const docRef = doc(firestore, collectionName, documentId);
  
          // Perform the update
          await updateDoc(docRef, newData);
         
          toast.success("Profile successfully updated");
      } catch (error) {
          toast.error("Error updating Profile ");
      }
  }
  
  
   

    //update password firebase
 
    const changePassword = (oldPassword, newPassword) => {
      
    
      // Get the current user
      const user = auth.currentUser;
    
      if (!user) {
        console.error('No user is currently signed in.');
        return;
      }
    
      // Create credentials for reauthentication
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
    
      // Reauthenticate the user with their old password
      reauthenticateWithCredential(user, credential)
        .then(() => {
          // Reauthentication successful, now update the password
          updatePassword(user, newPassword)
            .then(() => {
              toast.success('Password updated successfully');
              // const userEmail = 'pankajkchejara@gmail.com';
              // sendOTPByEmail(userEmail);
          
              navigate('/dashboard/profile')
            })
            .catch((error) => {
              toast.error('Error updating password:');
            });
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            toast.error('Incorrect old password.');
          }
          else if("auth/invalid-credential"){
            toast.error('Incorrect old password.');
          }
          else{toast.error('Error reauthenticating user:',error.code);}
         
        });
    };
    
  

function changehandler(e) {

SetSignUpDataObject((prev) => {
      return { ...prev, [e.target.name]: e.target.value, }
    })
}

//click handle
function clickhandler(e) {
    e.preventDefault()
const collectionName = "users"; // Name of the collection
const documentId = SignUpdataobject.id; // ID of the document to update
const newData = SignUpdataobject

// Call the function with the necessary parameters
updateDocumentById(collectionName, documentId, newData);
  
    navigate('/dashboard/profile')
}
 

//change handle
function changehandlerpass(e) {
    setPassword((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    }
    )
 }
  
 
 //click handle
 
function clickhandlerpassword(e) {
    e.preventDefault();
    changePassword(Password.oldPassword, Password.newPassword);

  }





  return (
    <>
      <form >
        
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-pure-greys-700 bg-pure-greys-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">
            Profile Information
          </h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="firstName" className="lable-style text-white ">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="form-style bg-pure-greys-700 text-white opacity-70"
                value={SignUpdataobject.firstName}
                onChange={changehandler}
              />


            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="lastName" className="lable-style text-white">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter first name"
                className="form-style bg-pure-greys-700 text-white opacity-70"
                value={SignUpdataobject.lastName}
                onChange={changehandler}
              />

            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="dateOfBirth" className="lable-style text-white">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                id="dateOfBirth"
                className="form-style bg-pure-greys-700 text-white opacity-70"
                onChange={changehandler}

              />

            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="gender" className="lable-style text-white">
                Gender
              </label>
              <select
                type="text"
                name="gender"
                id="gender"
                className="form-style bg-pure-greys-700 text-white opacity-70"
                onChange={changehandler}
                value={SignUpdataobject.gender}
              >
                <option>Male</option>
                <option>feMale</option>
              </select>

            </div>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="contactNumber" className="lable-style text-white">
                Contact Number
              </label>
              <input
                type="tel"
                name="contact"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="form-style bg-pure-greys-700 text-white"
                onChange={changehandler}

              />

            </div>
            <div className="flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="about" className="lable-style text-white">
                About
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="form-style bg-pure-greys-700 text-white"
                onChange={changehandler}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>

          <button
            onClick={clickhandler}
            className="cursor-pointer rounded-md bg-blue-700 py-2 px-5 font-semibold text-richblack-50"
          >
            save
          </button>

        </div>
      </form>

      <form onSubmit={clickhandlerpassword}>
        <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-pure-greys-700 bg-pure-greys-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="oldPassword" className="lable-style text-white">
                Current Password
              </label>
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="form-style bg-pure-greys-700 text-white"
                onChange={changehandlerpass}
                value={Password.oldPassword}
               
              />
              <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[33px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>


            </div>
            <div className="relative flex flex-col gap-2 lg:w-[48%]">
              <label htmlFor="newPassword" className="lable-style text-white">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                placeholder="Enter New Password"
                className="form-style bg-pure-greys-700 text-white"
                onChange={changehandlerpass}
                value={Password.newPassword}
              />
              <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[33px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

            </div>
            
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              navigate("/dashboard/profile")
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </>
  )
}
export default Setting;