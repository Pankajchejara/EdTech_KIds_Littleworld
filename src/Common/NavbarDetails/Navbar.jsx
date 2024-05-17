import React, { useContext, useState,useEffect } from 'react';
import {app} from '../../Database/FireBase'
import {getAuth,onAuthStateChanged,signOut} from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import { Appcontext } from '../../context/Appcontext';
import { Links } from '../../data/Links';
import { NavLink, matchPath } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { IoIosMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { CgGames } from "react-icons/cg";
import { FaBook } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import toast from 'react-hot-toast';
import {getFirestore} from 'firebase/firestore'

const Navbar = (props) => {

const firestore=getFirestore(app);
const auth=getAuth(app)
let [show, setShow] = useState(true)
const[ACCOUNT_TYPE,setAccountType]=useState('student')
const [click, setClick] = useState(true)
let isLoggedIn = props.isLoggedIn;
let setIsLoggedIn = props.setIsLoggedIn;

useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
        if(!user){
     
      setIsLoggedIn(false)
        }
        if(user?.emailVerified){
            setIsLoggedIn(true)
        }
        
        
    })
},[])

    let location = useLocation();
    let navigate = useNavigate();
   

    const { fetchUserProfileDetails } = useContext(Appcontext)
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



    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    function clickhandle(e) {

        setShow(false)
    }
    function clickhandledel(e) {

        setShow(true)
    }

   

    
    function Dropdown() {
        setClick(!click)
        click ? (document.querySelector('.boxx').classList.add('transformm-active')) : (document.querySelector('.boxx').classList.remove('transformm-active'))

    }
    function clickhandlehome() {
        navigate('/')
    }
    return (
        <div className={`z-50 w-full   relative `}>


            <nav className='flex fixed  top-0 bg-pure-greys-900 items-center  py-[10px] shadow-xl shadow-pure-greys-500/50 w-full '>
                <div className='mx-auto  w-11/12 flex flex-row lg:flex-row  items-center    justify-between'>
                    <p className=' text-white py-[10px] xl:mr-[100px] cursor-pointer' onClick={clickhandlehome}><span className='text-4xl font-bold text-blue-100'>L</span>ittle<span className='text-3xl'>W</span>orld</p>
                    {
                        (show ? (<button className='text-white block lg:hidden ' onClick={clickhandle}><IoIosMenu className="cursor-pointer text-2xl text-yellow-100" /></button>) : (<button className='text-white  block lg:hidden' onClick={clickhandledel}><RxCross1 className='text-yellow-100 text-2xl cursor-pointer' /></button>))


                    }
                    <div className='  hidden gap-x-7  lg:flex   justify-center   items-center'>

                        <Link to="/" className={` font-bold ${matchRoute("/")? " text-yellow-100":"text-white"}`}>Home</Link>

                        <Link to="/Dictionary" className={` font-bold ${matchRoute("/Dictionary")? " text-yellow-100":"text-white"}`}>Dictionary</Link>
                        <Link to="/Cardgame" className={` font-bold ${matchRoute("/Cardgame")? " text-yellow-100":"text-white"}`}>Cardgame</Link>
                        <Link to="/ContactUs" className={` font-bold ${matchRoute("/ContactUs")? " text-yellow-100":"text-white"}`}>ContactUs</Link>




                        {!isLoggedIn &&
                            <Link to="/login">
                                <button className='bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700'>
                                    Log in
                                </button>
                            </Link>
                        }
                        {!isLoggedIn &&
                            <Link to="/signup">
                                <button className='bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700'>
                                    Sign up
                                </button>
                            </Link>
                        }
                        {isLoggedIn &&
                            <Link to="/">
                                <button onClick={() => {
                                    // setIsLoggedIn(false);
                                    signOut(auth)
                                    // setMainDataOfCourse([])
                                    toast.success("Logged Out");
                                }}
                                    className='bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700'>
                                    Log Out
                                </button>
                            </Link>
                        }
                        {isLoggedIn &&
                            <Link to="/dashboard/profile">
                                <button
                                    className='bg-richblack-800 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-richblack-700'>
                                    Dashboard
                                </button>
                            </Link>
                        }

                    </div>
                </div>
            </nav>





            {/* responsive  sideNavbar*/}



            <div className={
                !show
                    ? 'fixed  flex flex-col  gap-3 lg:py-11  py-8 border border-pure-greys-5   lg:hidden left-0 top-0 w-[200px] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
                    : 'ease-in-out w-[200px] duration-[2000ms] fixed top-0 bottom-0 left-[-100%]'
            }>




                <div className='flex flex-col gap-y-3 border-yellow-5 '>




                    <Link to="/" className={`text-white font-bold w-full ${matchRoute("/") ? "bg-yellow-800 border-l-yellow-100 border-l-[2px] text-yellow-100" : "bg-opacity-0"}    `}><div className='flex py-2 justify-between opacity-90  w-[70%] mx-auto'><FaHome className='text-2xl' />Home</div></Link>

                    <Link to="/Games" className={`text-white font-bold w-full ${matchRoute("/Games") ? "bg-yellow-800 border-l-yellow-100 border-l-[2px] text-yellow-100" : "bg-opacity-0"}    `}><div className='flex justify-between py-2  w-[70%] mx-auto opacity-90 '><CgGames className='text-2xl' />Games</div></Link>

                    <Link to="/Dictionary" className={`text-white font-bold w-full ${matchRoute("/Dictionary") ? "bg-yellow-800 border-l-yellow-100 border-l-[2px] text-yellow-100" : "bg-opacity-0"}   `}><div className='flex justify-between  py-2 w-[70%] mx-auto opacity-90 '><FaBook className='text-2xl' />Dictionary</div></Link>

                    <Link to="/ContactUs" className={`text-white font-bold w-full ${matchRoute('/AboutUs') ? "bg-yellow-800 border-l-yellow-100 border-l-[2px] text-yellow-100" : "bg-opacity-0"}     `}><div className='flex justify-between py-2  w-[70%] mx-auto opacity-90 '><CgGames className='text-2xl' />ContactUs</div></Link>



                </div>
                {/* dashboard start  */}
                <div className=' w-full relative py-7'>
                    <div className='w-full h-[30px] text-center text-white opacity-75 border-b-pure-greys-500 '>Dashobard</div>
                    <div className="boxx transformm w-[100%] flex flex-col  gap-y-3">
                        {
                            Links.map((link,id) => (


                (link.type == (ACCOUNT_TYPE)|| link.name == "My Profile" || link.name == "Setting") &&


                                <NavLink to={link.path} key={id}>
                                    <div key={id} className={`py-[8px] ${matchRoute(link.path) ? "bg-yellow-800 border-l-yellow-100 border-l-[2px] text-yellow-100" : "bg-opacity-0 text-black"} text-center`}>
                                        {link.name}

                                    </div>
                                </NavLink>

                            ))
                        }
                    </div>
                    {
                        click ? (<IoIosArrowDown className='text-white text-2xl absolute top-7 right-0' id="buttonn" onClick={Dropdown} />) : (<IoIosArrowUp className='text-white text-2xl absolute top-7 right-0' id="buttonn" onClick={Dropdown} />)}
                </div>
                {/* dashboard end  */}

                <div className='w-full flex flex-col py-[30px] gap-4 justify-center items-center'>

                    {!isLoggedIn &&
                        <Link to="/login">
                            <button className='bg-pure-greys-700 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-pure-greys-300'>
                                Log in
                            </button>
                        </Link>
                    }
                    {!isLoggedIn &&
                        <Link to="/signup">
                            <button className='bg-pure-greys-700 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-pure-greys-300'>
                                Sign up
                            </button>
                        </Link>
                    }
                    {isLoggedIn &&
                        <Link to="/">
                            <button onClick={() => {
                                setIsLoggedIn(false);

                                toast.success("Logged Out");
                            }}
                                className='bg-pure-greys-700 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-pure-greys-300'>
                                Log Out
                            </button>
                        </Link>
                    }
                    {isLoggedIn &&
                        <Link to="/dashboard/profile">
                            <button
                                className='bg-pure-greys-700 text-richblack-100 py-[8px] 
                    px-[12px] rounded-[8px] border border-pure-greys-300'>
                                Dashboard
                            </button>
                        </Link>
                    }

                </div>






            </div>



        </div>
    )
}

export default Navbar

