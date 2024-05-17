import React ,{useContext,  useState,useEffect}from 'react'
import { Appcontext } from '../../context/Appcontext'
import { getAuth ,onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {app} from '../../Database/FireBase'
import {getFirestore,collection,doc,getDocs,getDoc,updateDoc} from 'firebase/firestore'
import Spinner from '../Spinner';
const Courses = () => {
    const {Coursedataobject,SetCourseDataObject,purchaseCourseArray,setPurchasedCourseArray,fetchUserProfileDetails,purchasedCourse,setPurchasedCourse}=useContext(Appcontext)
    const firestore = getFirestore(app);
const[show,setShow]=useState(false);
const[course,setCourse]=useState("");

const [loading,setLoading]=useState(true)
const navigate=useNavigate();
const auth = getAuth();
const [isPlaying, setIsPlaying] = useState(false);
const user = auth.currentUser;
  const togglePlay = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };
  
  
 
useEffect(()=>{
    fetchUserProfileDetails().then((res)=>{
      
      onAuthStateChanged(auth,(user)=>{
        if(user){
          
          SetCourseDataObject((res.filter((obj)=>obj.email===user.email))[0])
        
          setPurchasedCourseArray((res.filter((obj)=>obj.email===user.email))[0].purchaseCourseArray)
      }
  })
  }) 
  },[])



useEffect(() => {
  const fetchCourses = async () => {
    try {
setLoading(true);
      // Get the user ID
      const user = auth.currentUser;

      // Fetch courses from Firestore
      const courseCollection = collection(firestore, 'courses');
      const courseSnapshot = await getDocs(courseCollection);

      // Map over the course documents and generate IDs for them
      const coursesData = courseSnapshot.docs.map(doc => ({
        id: doc.id, // Use the document ID as the unique identifier
        ...doc.data()
      }));

      // Set the courses state with the retrieved data
      setCourse(coursesData);
     setLoading(false)
     
     
    } catch (error) {
      console.error('Error fetching courses:', error);
      setLoading(false);
    }
  };

  fetchCourses();
}, []); 





const fetchCourseById = async (courseId) => {
  try {
    const courseDocRef = doc(firestore, "courses", courseId);
    const courseDocSnapshot = await getDoc(courseDocRef);
    
    if (courseDocSnapshot.exists()) {
      const courseData = { id: courseId, ...courseDocSnapshot.data() };
   
      setPurchasedCourse((prev)=>{
        return [...prev,courseData]
      })
      
    } else {
      
     
    }
  } catch (error) {
    
    
  }
};
//end fire
async function updateDocumentById(collectionName, documentId, newData) {
  try {
      // Reference to the document in a specific collection
      const docRef = doc(firestore, collectionName, documentId);

      // Perform the update
      await updateDoc(docRef, newData);
     
    
  } catch (error) {
      toast.error("Something Went Wrong");
  }
}
useEffect(()=>{

 
},[Coursedataobject])



function BuyCourseHandler(obj) {
  // Check if the course ID already exists in the purchaseCourseArray
  if (purchaseCourseArray.includes(obj.id)) {
    // Course already purchased, show a message or handle the situation accordingly
    toast.error("Course already purchased");
    return; // Exit the function
  }


  // Add the new course ID to the array
  purchaseCourseArray.push(obj.id);

  // Update the state with the updated purchaseCourseArray
  SetCourseDataObject(prev => ({
    ...prev,
    // purchaseCourseArray: [...prev.purchaseCourseArray, obj.id]
    purchaseCourseArray
  }));
  const collectionName = "users"; // Name of the collection
  const documentId = Coursedataobject.id; // ID of the document to update
 
  updateDocumentById(collectionName,documentId,Coursedataobject)

  // Fetch and process course data
  fetchCourseById(obj.id)
    .then(() => {
      toast.success("Course Purchased");
      navigate('/dashboard/purchased');
    })
    .catch(error => {
      toast.error("Failed to purchase course");
     
    });
}
 function clickhandlerdelete(){
       
        setShow(false)
    }
  return (
    
    <div className=' w-full relative'>
      
      

    
    <div className='w-full flex-wrap  h-full mx-auto flex  gap-x-[20px] justify-center items-center  gap-y-[10px]'>
  { !course.length==0&&(
    course.map((obj)=>{
      
        return !loading&&<div key={obj.id}>
        
        <div  className=' overflow-auto  bg-pure-greys-900 hover:shadow-pure-greys-500  shadow-md  rounded-md w-[300px] h-[400px]  flex flex-col gap-y-[15px] items-center '>
        <div className='w-full h-[200px] rounded-md border border-b-white'>
   
   

       <img src={obj.image} className='object-cover w-full h-full aspect-auto' alt='not available'/>
               </div>
               <div className='flex flex-col justify-center items-center'>
                 <p className='text-white text-2xl break-words w-full '>{`${( obj.title)}`}</p>
        <p className='text-white font-sarif overflow-y-auto break-words w-full '>{`${( obj.about)}...`}</p>
  </div>
     <button className= 'text-blue-400  w-[80%] mx-auto  rounded-md bg-blue-100 ' onClick={()=>BuyCourseHandler(obj)}>buy course</button>
    
      </div>

   {show===(obj.id)&&   <div className=' bg-pure-greys-900 fixed top-[300px] left-[500px] shadow-md border border-pure-greys-500  rounded-md w-[400px] h-[300px] hover:shadow-pure-greys-500 flex flex-col gap-y-[5px] justify-center items-center '>
       <video
      //  key={obj.videourl}
      width="400"
      controls
      autoPlay={isPlaying}
      onClick={togglePlay}
      style={{ cursor: 'pointer' }}
    >
      <source src={obj.video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <p className='text-white'>{obj.title}</p>
         <button className= 'text-blue-400' onClick={clickhandlerdelete}>delde </button>
 </div>
    }
 </div>
       }))
} 
 {
    !loading&&  course.length==0&&<p className='text-white text-3xl text-center'>No Course Available</p>
   }
    


    {loading&&   <div className='w-full  flex h-[400px] justify-center items-center'>
          <Spinner/>
        </div>}
    
    </div>

    </div>
  )
}

export default Courses
