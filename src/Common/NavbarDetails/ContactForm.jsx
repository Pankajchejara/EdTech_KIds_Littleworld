import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    
    <div className="  w-[300px] sm:w-[400px] md:w-[500px] lg:w-[800px] mt-[100px] mb-5 mx-auto items-center justify-center border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
      Connect with Us and Share Your Opinions
      </h1>
      <p className="">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>
      <div className="w-[90%] ">
      
        
        <ContactUsForm />
    
      </div>
    </div>
      
  
  );
};

export default ContactForm;