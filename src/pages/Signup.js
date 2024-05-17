import React from 'react'

import Template from '../components/Forms/Template'

const Signup = ({setIsLoggedIn}) => {
  return (
    <Template
      title="Supercharge Your Learning Journey with LittleWorld – Explore for Free"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      
      text="Revolutionizing education, the digital interface offers tools, resources, and interactive content for an enhanced online learning experience."
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

export default Signup
