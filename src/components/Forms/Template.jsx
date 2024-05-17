import React from 'react'

import SignupForm from './SignupForm'
import LoginForm from './LoginForm'




const Template = ({ title, desc1, desc2, formtype, setIsLoggedIn }) => {

    return (
        <div className='flex  shadow-md justify-center bg-pure-greys-900 mt-[50px]   w-11/12 max-w-[1160px] py-12 mx-auto   gap-y-0'>

            <div className='p-5 relative border shadow-md shadow-cyan-500 w-11/12 bg-pure-greys-900 max-w-[450px]' >
                <h1
                    className='text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]'
                >
                    {title}
                </h1>

                <p className='text-[1.125rem] leading[1.625rem] mt-4' >
                    <span className='text-richblack-100'>{desc1}</span>
                    <br />
                    <span className='text-blue-100 italic'>{desc2}</span>
                </p>

                {formtype === "signup" ?
                    (<SignupForm setIsLoggedIn={setIsLoggedIn} />) :
                    (<LoginForm setIsLoggedIn={setIsLoggedIn} />)}
            </div>

        </div>
    )
}

export default Template
