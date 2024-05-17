import "./App.css";
import React, { useState } from "react";
import Navbar from "./Common/NavbarDetails/Navbar";
import {Routes, Route} from 'react-router-dom';

import Spinner from "./components/Spinner";
import { Suspense } from "react";
import PrivateRoute from "./components/PrivateRoute";
import ForgetPassword from "./components/Forms/ForgetPassword";



const Login =React.lazy(()=>import('./pages/Login'))
const Signup =React.lazy(()=>import('./pages/Signup'))

const Dashboard =React.lazy(()=>import("./components/Dashboard/Dashboard"))
const Home =React.lazy(()=>import("./components/Home"))
const MyCourses =React.lazy(()=>import("./components/InstructorCourseDetail/MyCourses"))
const Dictionary =React.lazy(()=>import('./Common/NavbarDetails/Dictionary'))
const Cardgame =React.lazy(()=>import("./Common/NavbarDetails/Cardgame"))
const CreateCourse =React.lazy(()=>import("./components/InstructorCourseDetail/CreateCourse"))
const Setting =React.lazy(()=>import( "./components/ProfileDetails/Setting"))
const MyProfile =React.lazy(()=>import( "./components/ProfileDetails/MyProfile"))
const Courses =React.lazy(()=>import( "./components/StudentsCourseDetails/Courses"))
const Purchased =React.lazy(()=>import( "./components/StudentsCourseDetails/Purchased"))
const ContactForm =React.lazy(()=>import( './Common/NavbarDetails/ContactForm'))


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  


  return (<>
<div className="w-full relative min-h-screen bg-pure-greys-900 flex flex-col font-inter " >

<Routes>
 
<Route path="/login" element = {<Suspense fallback={<div className="w-full h-full flex justify-center text-white items-center">Loading...<Spinner/></div>}><Login  setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/></Suspense>} />

<Route path="/forget" element = {<Suspense fallback={<div className="w-full h-full flex justify-center text-white items-center">Loading...<Spinner/></div>}><ForgetPassword/></Suspense>} />

<Route path="/Dictionary" element = {<Suspense fallback={<div className="w-full h-full flex justify-center text-white items-center">Loading...<Spinner/></div>}><Dictionary   /></Suspense>} />
<Route path="/Cardgame" element = {<Suspense fallback={<div className="w-full h-full flex justify-center text-whiteitems-center">Loading...<Spinner/></div>}><Cardgame/></Suspense>} />
<Route path="/ContactUs" element = {<Suspense fallback={<div className="w-full h-full flex justify-center text-white items-center">Loading...<Spinner/></div>}><ContactForm   /></Suspense>} />
<Route path="/signup" element = {<Suspense fallback={<div className="w-full h-full flex justify-center  text-white items-center">Loading...<Spinner/></div>}><Signup  setIsLoggedIn={setIsLoggedIn}  isLoggedIn={isLoggedIn} /></Suspense>} />

        <Route path="/dashboard" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Suspense fallback={<div className="w-full h-full flex justify-center items-center text-white">Loading...<Spinner/></div>}><Dashboard/></Suspense>
              
          </PrivateRoute>
       
        } />


<Route path="/dashboard" element = {
          <PrivateRoute isLoggedIn={isLoggedIn}>
               <Suspense fallback={<div className="w-full h-full flex justify-center text-white items-center">Loading...<Spinner/></div>}><Dashboard/></Suspense>
          </PrivateRoute>
       
        } >

<Route path="/dashboard/profile" element = {<Suspense fallback={<div className="w-full h-full text-white flex justify-center items-center">Loading...<Spinner/></div>}><MyProfile /></Suspense>} />
<Route path="/dashboard/CreateCourse" element = {<Suspense fallback={<div className="w-full h-full text-white flex justify-center items-center">Loading...<Spinner/></div>}><CreateCourse/></Suspense>} />
<Route path="/dashboard/mycourses" element = {<Suspense fallback={<div className="w-full h-full flex  text-white justify-center items-center">Loading...<Spinner/></div>}><MyCourses/></Suspense>} />
<Route path="/dashboard/purchased" element = {<Suspense fallback={<div className="w-full h-full flex  text-white justify-center items-center">Loading...<Spinner/></div>}><Purchased/></Suspense>} />
<Route path="/dashboard/courses" element = {<Suspense fallback={<div className="w-full h-full flex text-white justify-center items-center">Loading...<Spinner/></div>}><Courses/></Suspense>} />
<Route path="/dashboard/setting" element = {<Suspense fallback={<div className="w-full h-full flex  text-white justify-center items-center">Loading...<Spinner/></div>}><Setting/></Suspense>} />


 </Route>

 <Route path="/Games"element = {<Suspense fallback={<div className="w-full h-full flex justify-center items-center text-white">Loading...<Spinner/></div>}><Cardgame /></Suspense>} />
 {/* <Route path="/Games"element = {<Suspense fallback={<div className="w-full h-full flex justify-center items-center"><Spinner/></div>}><Cardgame /></Suspense>} /> */}
 <Route path="/"element = {<Suspense fallback={<div className="w-full h-[800px] flex justify-center items-center text-white">Loading...<Spinner/></div>}><Home /></Suspense>} />







</Routes>
<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>



  </div>
   </>
  );
}

export default App;
