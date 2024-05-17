
import React, { useContext, useEffect, useState } from 'react'
import { Appcontext } from '../../context/Appcontext'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Spinner from '../Spinner'
import { FaCloudUploadAlt } from "react-icons/fa";
import IconBtn from '../../Common/Icon'
import toast from 'react-hot-toast'
import {app} from '../../Database/FireBase'
import {getFirestore,collection,addDoc,getDoc,doc,setDoc} from 'firebase/firestore'






const CreateCourse = () => {

const firestore=getFirestore(app)
const {  mainDataOfCourse,toggle,settoggle ,CreateCourseData,setCreateCourseData} = useContext(Appcontext)
const UploadPreset=process.env.REACT_APP_UPLOAD_PRESET;
const CloudName=process.env.REACT_APP_CLOUD_NAME
const[videoShow,setVideoShow]=useState(true)
const [isPlaying, setIsPlaying] = useState(false);
const [progress, setProgress] = useState(0);
  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };
  
  const[imageurl,setImageUrl]=useState('')
 
  const[videourl,setvideoUrl]=useState('')
  const[loading,setLoading]=useState(false)
  const navigate = useNavigate();





const CreateCourse=async()=>{
   const res=await addDoc(collection(firestore,'courses'),{
    image:imageurl,video:videourl,title:CreateCourseData.title,about:CreateCourseData.about
   })
    
   
    setCreateCourseData({title:"",video:"",about:"",image:""})
    
}




  function selectFileVideoHandler(){
    document.querySelector(".videoinput_field").click();
  }
  


  

 

  function changeHandler(e) {

 const { name, value, files } = e.target;

    setCreateCourseData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));

    
  };





const updateCourse = async (courseid, newdata) => {
  try {
      const course = doc(firestore, "courses", courseid);
      const coursesnapshot = await getDoc(course);
      const coursedata = coursesnapshot.data();
      
      // Merge the new pin with the existing data
      const updatedCourseData = { ...coursedata, ...newdata };
      
      // Set the merged data back to Firestore
      await setDoc(course, updatedCourseData);
    
  } catch (error) {
      console.error("Error updating pin:", error);
  }
};




 


  // submit data 

  function submithandle(e){
    e.preventDefault()
    
    //edit course 
 if (!toggle){
const obj={
  title:CreateCourseData.title,about:CreateCourseData.about,image:imageurl?(imageurl):(CreateCourseData.image),video:videourl?(videourl):(CreateCourseData.video)
}
         
 updateCourse(CreateCourseData.id,obj)
toast.success("course updated")
    settoggle(true)
     navigate('/dashboard/mycourses')
     setCreateCourseData({image:'',title:"",about:"",video:""})
 }
   
    //create new course
  
    else{
       
    if(CreateCourseData.image&&CreateCourseData.video&&CreateCourseData.about&&CreateCourseData.title){
          CreateCourse()
          toast.success("Course Added Successfully")
          navigate('/dashboard/mycourses')
        }
        else{
          toast.error('please fill all the field')
    }
          }
  }
  
 

//  fetch image 

async function  UploadImage(){
    try{
    
    setLoading(true)
      let data = new FormData()
  data.append("file",CreateCourseData.image)
  data.append("upload_preset",UploadPreset)
  data.append("cloud_name",CloudName)
// start 
const xhr = new XMLHttpRequest();

  xhr.open(
    'POST',
    `https://api.cloudinary.com/v1_1/${CloudName}/image/upload`,
    true
  );

  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  xhr.upload.onprogress = (event) => {
    if (event.lengthComputable) {
      const percentCompleted = Math.round(
        (event.loaded * 100) / event.total
      );
      setProgress(percentCompleted);
    }
  };

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        if(isImageUrl(data.secure_url)){
                setImageUrl(data.secure_url)
                setLoading(false)
                
                toast.success("Image uploaded")
               setProgress(0)
         }
        
        else{
                setLoading(false)
                toast.error("please select other file or image")
                setProgress(0)
              }
              
      } else {
          setLoading(false)
        toast.error(" Error ! please select image again")
        setProgress(0)
      }
      
    }
  };
xhr.send(data);
    }
    catch(err){
      setLoading(false)
     toast.error(" Error ! please select image again")
     setProgress(0)
    }
  }
    

   
  // fetch or upload video 
 
    const UploadVideo = async () => {
      try {
        if (!CreateCourseData.video) {
          toast.alert('Please select a video file.');
          return;
        }
     
         setLoading(true)
        const formData = new FormData();
        formData.append('file', CreateCourseData.video);
        formData.append('upload_preset', UploadPreset);

        const xhr = new XMLHttpRequest();

        xhr.open(
          'POST',
          `https://api.cloudinary.com/v1_1/${CloudName}/video/upload`,
          true
        );
      
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentCompleted = Math.round(
              (event.loaded * 100) / event.total
            );
            setProgress(percentCompleted);
          }
        };
      
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              const data = JSON.parse(xhr.responseText);
              if(IsVideoUrl(data.secure_url)){
                setvideoUrl(data.secure_url)
                setVideoShow(true)
 
    
                     
                      setLoading(false)
                      toast.success("Video uploaded")
                     setProgress(0)
                }
              
              else{
                      setLoading(false)
                      toast.error("please select other file or video")
                      setProgress(0)
                    }
                    
            } else {
               setLoading(false)
              toast.error(" Error ! please select video again")
              setProgress(0)
            }
            
          }
        };
      xhr.send(formData);
          }
          catch(err){
            setLoading(false)
           toast.error(" Error ! please select video again")
           setProgress(0)
          }
        }



  
function submitImagehandle(e){
e.preventDefault()
    
UploadImage();
 }




  function isImageUrl(url) {
    if(typeof(url)=='string'){

      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']; 
    
      const extension = url.split('.').pop().toLowerCase();
     
      return imageExtensions.includes(extension);
    }
    else{
      return 0;
    }
  }



  function IsVideoUrl(url) {
    if(typeof(url)=='string'){

      const videoExtensions = ['mp4']; 
    
      const extension = url.split('.').pop().toLowerCase();
      
      return videoExtensions.includes(extension);
    }
    else if(url=""){
      return 1
    }
    else{
      return 0;
    }
  }



  

function subvideohandle(e){
e.preventDefault();
UploadVideo()
  
}
  

  return (
    <>
  { !loading&& <div className='border w-11/12 mx-auto rounded-xl bg-pure-greys-900' data-aos="fade-up">
      <div className='w-11/12 mx-auto py-5'>
        <div className='py-[20px] text-center'>
          <h2 className='text-white text-center font-bold text-3xl'>Create course</h2>
          <p className='text-red-100  text-center font-bold text-md'><sup>*</sup> Image size should be less than Upto 20Mb</p>
          <p className='text-red-100  text-center font-bold text-md'> <sup>*</sup>video size should be less than Upto 100 mb</p>
        </div>

        
        <form className='gap-y-5' >


<div className='gap-y-[20px] flex flex-col'>
  
{/* imagesection */}


<div className='flex bg-pure-greys-700 justify-between gap-y-3  gap-x-4 enrollbox border-b-white'>


        <div className=' w-full h-full  relative'onClick={()=>document.querySelector(".input_field").click()}>

 {
  toggle?(CreateCourseData.image?(<img src={URL.createObjectURL(CreateCourseData.image)} alt="Not Available" className=' w-full rounded-md h-full object-fill' />): (<div className='w-full h-full flex justify-center items-center text-white text-[100px] bg-pure-greys-600'><FaCloudUploadAlt /></div>)
  ):
  (CreateCourseData.image?(isImageUrl(CreateCourseData.image)?(<img src={CreateCourseData.image} alt='No available' className=' w-full rounded-md h-full object-fill' />):(<img src={URL.createObjectURL(CreateCourseData.image)} alt="not Available" className=' w-full h-full aspect-square object-fill' />))
   : (<div className='w-full h-full flex justify-center items-center text-white text-[100px] bg-pure-greys-600'><FaCloudUploadAlt /></div>))
 }
 
 <input type='file' name='image' accept="image/*" className='text-white  input_field  absolute top-9 hidden' onChange={changeHandler}  />
      
          </div>

          
<div className='flex items-center justify-center mr-7'>
          <IconBtn onclick={submitImagehandle} outline={true} >UploadImage</IconBtn>
</div>
 </div>
          
   {/* imagesectionend        */}
  

{/* videosection  start*/}
<div className='  flex bg-pure-greys-700  justify-between enrollbox gap-y-3 gap-x-5 border-b-white'>
          
  <div className='w-full  h-full ' onClick={selectFileVideoHandler}>

{/* {((videoShow || CreateCourseData.video) && (
  <video
    key={!(IsVideoUrl(CreateCourseData.video)) ? URL.createObjectURL(CreateCourseData.video) : CreateCourseData.video}
   
    className='object-fill'
    controls width="100%" height="300px"
    autoPlay={isPlaying}
    onClick={togglePlay}
    style={{ cursor: 'pointer' }}
  >
    <source src={!IsVideoUrl(CreateCourseData.video) ? URL.createObjectURL(CreateCourseData.video) : CreateCourseData.video} type="video/mp4" />
    
  </video>
))} */}
{/* {((videoShow || CreateCourseData.video)  (
  <video
    key={!(IsVideoUrl(CreateCourseData.video)) ? URL.createObjectURL(CreateCourseData.video) : CreateCourseData.video}
    className='object-fill'
    controls width="100%" height="300px"
    autoPlay={isPlaying}
    onClick={togglePlay}
    style={{ cursor: 'pointer' }}
  >
    <source src={!IsVideoUrl(CreateCourseData.video) ? URL.createObjectURL(CreateCourseData.video) : CreateCourseData.video} type="video/mp4" />
  </video>
))} */}
{((videoShow || CreateCourseData.video !== '') || CreateCourseData.video === '') && (
  <video
    key={CreateCourseData.video || 'empty'}
    className='object-fill'
    controls
    width="100%"
    height="300px"
    autoPlay={isPlaying}
    onClick={togglePlay}
    style={{ cursor: 'pointer' }}
  >
    {CreateCourseData.video !== '' && !IsVideoUrl(CreateCourseData.video) && (
      <source src={URL.createObjectURL(CreateCourseData.video)} type="video/mp4" />
    )}
    {CreateCourseData.video !== '' && IsVideoUrl(CreateCourseData.video) && (
      <source src={CreateCourseData.video} type="video/mp4" />
    )}
  </video>
)}




<input type='file' name='video' accept="video/*" className='text-white block lg:hidden videoinput_field ' onChange={changeHandler}  />

  </div>

  

 
<div className='flex items-center justify-center mr-7'>
<IconBtn onclick={subvideohandle} outline={true} >UploadVideo</IconBtn>

</div>
</div>          
    {/* videosection end        */}
           

         <div>
            <label htmlFor='title' className='text-white'>Title:</label>
            <br />
            <input value={CreateCourseData.title} onChange={changeHandler} type='text' name='title' id='tie' className='bg-pure-greys-700 text-white w-full py-[12px] rounded-xl border-b border-richblack-600 ' />
          </div>
          

        
          <div>
            <label htmlFor='about' className='text-white '>About Course:</label>
            <br />
            <textarea value={CreateCourseData.about} onChange={changeHandler} id='tie' name='about' className='bg-pure-greys-700 w-full py-[12px] rounded-xl border-b-richblack-600  text-white cursor-text' required={true} />
          </div>


<div>
       {
        toggle?( <IconBtn  outline={true} className='text-white' text="Submit" onclick={submithandle} type='submit'/>):(<IconBtn className='text-white' color="yellow" text="Edit Course" onclick={submithandle} type='submit'/>
        )
       }  
 </div>     

 </div>    
        </form>

       


      </div>
    </div>}
 { loading&& <div className='w-11/12 h-[500px] flex justify-center items-center'>
 <p className='text-white'> Uploading ... <span className='text-blue-100'>{progress} %</span>  </p>
<Spinner/>
   </div>}
   </>
  )
}

export default CreateCourse
