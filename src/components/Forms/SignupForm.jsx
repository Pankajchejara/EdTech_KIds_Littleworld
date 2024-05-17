import React, { useContext, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Appcontext } from '../../context/Appcontext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { RxCross1 } from "react-icons/rx";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from "firebase/auth";//auth
import { app } from '../../Database/FireBase' //app
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore'
const SignupForm = ({ setIsLoggedIn }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState("student");
    const { fetchUserProfileDetails, setProfile } = useContext(Appcontext)
    const firestore = getFirestore(app)
    const navigate = useNavigate();
    const auth = getAuth(app);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        dob: "",
        about: "",
        gender: "",
        contact: "",
    })

    function fetchProfiledata() {

        fetchUserProfileDetails().then((res) => {

            onAuthStateChanged(auth, (user) => {
                if (user) {

                    setProfile((res.filter((obj) => obj.email === user.email))[0])

                }

            })
        })
    }


    async function addUser(firstName, lastName, dob, email, contact, gender, about, accountType) {
        try {
            let userData;
            if (accountType === 'student') {
                userData = {
                    firstName,
                    lastName,
                    dob,
                    contact,
                    gender,
                    about,
                    email,
                    accountType,
                    purchaseCourseArray: [] // Initialize purchasedCourse with an empty array
                };
            } else {
                userData = {
                    firstName,
                    lastName,
                    dob,
                    contact,
                    gender,
                    about,
                    email,
                    accountType
                };
            }

            // Check if the user with the same email already exists
            const userRef = collection(firestore, 'users');
            const querySnapshot = await getDocs(query(userRef, where('email', '==', email)));

            if (!querySnapshot.empty) {
                // User already exists, display appropriate message

                return;
            }

            // User does not exist, add them to the Firestore collection
            await addDoc(userRef, userData);
            fetchProfiledata()
        } catch (error) {

            toast.error('Failed to add user. Please try again later.');
        }
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
                toast.error("No user signed in.");

            }
        } catch (error) {
            toast.error("Error sending verification email:", error);

        }
    }


    function verifyEmail() {
        const verifyInterval = setInterval(async () => {
            onAuthStateChanged(auth, async (user) => {
                await user.reload(); // Reload user data to get the latest email verification status
                if (user.emailVerified) {
                    setIsLoggedIn(true);

                    navigate("/dashboard/profile"); // Navigate to the profile page
                    clearInterval(verifyInterval); // Stop checking
                } else {

                }
            });
        }, 5000);

        // Move clearInterval outside of setInterval to ensure it is called only once


        setTimeout(() => {
            clearInterval(verifyInterval);
        }, 30000);

    }

    async function signUp(email, password) {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {

                sendVerificationEmail(email)
                addUser(formData.firstName, formData.lastName, formData.dob, formData.email, formData.contact, formData.gender, formData.about, accountType);

            })
            .catch((err) => {

                if (err.code === 'auth/email-already-in-use') {

                    onAuthStateChanged(auth, (user) => {
                        if (user?.email?.emailVerified) {
                            toast.error('User already exists please login')
                        } else {
                            toast.error("please verify email AND refresh the page")
                            sendEmailVerification(email)
                        }
                    })
                    // toast.error("user Already exists please login")
                }
                else if (err.code === "auth/network-request-failed") {
                    toast.error("network connection  failed")
                }
                else {
                    toast.error("password should have minimum  6 character")

                }

            })



    }

    function changeHandler(event) {

        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]: event.target.value
            }
        ))

    }

    async function submitHandler(e) {

        const { email, password } = formData;
        e.preventDefault();
        if (formData.password == formData.confirmPassword) {
await signUp(email, password); }
        else {
            toast.error("Password don't match")
        }
 }



    const [show, setShow] = useState(true)
    function closeBoxHandler() {
        setShow(false)
    }



return (
        <div>
            {/* student-Instructor tab */}
            <div
                className='flex relative bg-pure-greys-700 p-1 gap-x-1 my-6 rounded-full max-w-max'>

                <button
                    className={`${accountType === "student"
                        ?
                        "bg-pure-greys-900 text-richblack-5"
                        : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setAccountType("student")}>
                    Student
                </button>

                <button
                    className={`${accountType === "instructor"
                        ?
                        "bg-pure-greys-900 text-richblack-5"
                        : "bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setAccountType("instructor")}>
                    Instructor
                </button>
                {
                    show && <div className='absolute  -top-[120px] left-[100px] sm:-top-[100px] sm:left-[100px]  bg-white rounded-sm '><div className=' relative text-white w-[180px] h-[110px] sm:w-[200px] sm:h-[100px] md:w-[300px] md:h-[80px]   z-10 '>
                        <p className=' md:text-2xl text-[16px] sm:text-center  font bold text-blue-800 font-bold  '> Want to Create course </p>
                        <p className=' md:text-[16px] text-[10px]text-center text-blue-700 font-italic'>Please Select Instructor button here </p>
                        <div className='absolute text-white w-[30px] h-[30px] rotate-45 -bottom-3  left-[6px] z-1 bg-white'></div>
                        <button onClick={closeBoxHandler}><RxCross1 className='text-red-100 text-xl absolute top-0 right-0' /></button>
                    </div>
                    </div>
                }
            </div>

            <form onSubmit={submitHandler} >
                {/* first name and lastName */}
                <div className='flex gap-x-4 mt-[20px]'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]  sm:placeholder:text-[16px] placeholder:text-[10px]'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]  sm:placeholder:text-[16px] placeholder:text-[10px]'
                        />
                    </label>
                </div>
                {/* email Add */}
                <div className='mt-[20px]'>
                    <label className='w-full mt-[20px]'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="email"
                            name="email"
                            onChange={changeHandler}
                            placeholder="Enter Email Address "
                            value={formData.email}
                            className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px]  sm:placeholder:text-[16px] placeholder:text-[10px]'
                        />
                    </label>
                </div>


                {/* createPassword and Confirm Password */}
                <div className='w-full flex flex-col md:flex-row  gap-y-4 gap-x-4 mt-[20px]'>
                    <label className='w-full '>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
                        <div className='relative'>
                            <input
                                required
                                type={showPassword ? ("text") : ("password")}
                                name="password"
                                onChange={changeHandler}
                                placeholder="Enter Password"
                                value={formData.password}
                                className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5  w-full p-[12px]  sm:placeholder:text-[16px] placeholder:text-[10px]'
                            />
                            <span
                                className='absolute right-3  top-[13px]  cursor-pointer'
                                onClick={() => setShowPassword((prev) => !prev)}>
                                {showPassword ?

                                    (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :

                                    (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                            </span>
                        </div>
                    </label>


                    <label className='w-full relative'>

                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                        <div className='relative'>
                            <input
                                required
                                type={showConfirmPassword ? ("text") : ("password")}
                                name="confirmPassword"
                                onChange={changeHandler}
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                className='bg-pure-greys-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] sm:placeholder:text-[16px] placeholder:text-[10px]'
                            />
                            <span
                                className='absolute right-3 top-[13px] cursor-pointer'
                                onClick={() => setShowConfirmPassword((prev) => !prev)}>
                                {showConfirmPassword ?

                                    (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :

                                    (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
                            </span>
                        </div>
                    </label>
                </div>
                <button className=' w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6'>
                    Create Account
                </button>
            </form>
            {/* <div className='flex w-full items-center my-4 gap-x-2'>
                <div className='w-full h-[1px] bg-richblack-700'></div>
                <p className='text-richblack-700 font-medium leading[1.375rem]'>
                    OR
                </p>
                <div className='w-full h-[1px] bg-richblack-700'></div>
            </div> */}
            {/* 
            <button onClick={signupwithgoogle} className='w-full flex justify-center items-center rounded-[8px] font-medium text-richblack-100
            border border-richblack-700 px-[12px] py-[8px] gap-x-2 mt-6 '>
                
                <p>Sign Up with Google</p>
            </button> */}



        </div>
    )
}

export default SignupForm
