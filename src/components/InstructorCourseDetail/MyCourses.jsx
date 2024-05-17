import React, { useContext, useState ,useEffect} from 'react'
import { Appcontext } from '../../context/Appcontext'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../Common/Icon'
import toast from 'react-hot-toast'
import {app} from '../../Database/FireBase'

import {getFirestore,collection,doc,getDocs,deleteDoc} from 'firebase/firestore'
const MyCourses = () => {

  const firestore=getFirestore(app)
  const[mycourse,setMycourse]=useState([])
  const navigate=useNavigate();
  const {setCreateCourseData,settoggle}=useContext(Appcontext)




useEffect(() => {
  const fetchCourses = async () => {
    try {
      
      const CourseCollection = collection(firestore, "courses");
      const CourseSnapshot = await getDocs(CourseCollection);
     
      const CourseList = CourseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
      setMycourse(CourseList);
    } catch (error) {
     
    }
  };

  fetchCourses();
 
}, [firestore,mycourse]);



const deleteDocumentById = async (collectionName, documentId) => {
  try {
    // Get a Firestore instance
    const firestore = getFirestore(app);

    // Create a reference to the document you want to delete
    const docRef = doc(firestore, collectionName, documentId);

    // Delete the document
    await deleteDoc(docRef);

    toast.success(" deleted successfully");
  } catch (error) {
    toast.error("Error deleting document");
  }
};







function DeleteCourse (obj){
  deleteDocumentById('courses',obj.id)

}




function EditCourse(courseObject){
  settoggle(false)
  navigate('/dashboard/CreateCourse')

  
  setCreateCourseData(courseObject)

}

function CreateCourseHandle(){
  navigate('/dashboard/CreateCourse')
}


  return (
<>

    <div className='w-11/12 h-full  mx-auto flex  gap-x-[20px] flex-wrap gap-y-[10px] justify-center items-center'>
    
    {
      (mycourse.length==0) ?(
     (<div className='text-white text-3xl w-full h-full flex flex-col items-center justify-center '>
        <p>No course available</p>
      <IconBtn text="create course" onclick={CreateCourseHandle}/>
      </div>)
      
      ):
    

      ( 
        
     (mycourse).map((obj)=>{
         return <div  className='  bg-pure-greys-900 hover:shadow-pure-greys-500  shadow-md  rounded-md w-[300px] h-[400px]  flex flex-col gap-y-[5px] items-center '>
         <div className='w-full h-[200px] rounded-md border border-b-white'>
    
    
 
        <img src={obj.image} className='object-cover w-full h-full aspect-auto' alt='not Available'/>
                </div>
                <div className='flex flex-col justify-center items-center'>
                 {/* <p className='text-white text-2xl break-words w-full text-center '>{`${( obj.title).substring(0,2)}`}</p> */}
                 <p className='text-white text-2xl break-words w-full text-center '>{`${( obj.title)}`}</p>
        <p className='text-white font-sarif overflow-y-auto break-words w-full '>{`${( obj.about)}...`}</p>
  </div>
       <div className='flex flex-col w-full gap-y-3'>
       <button className=' w-[80%] mx-auto hover:opacity-70 rounded-md bg-red-100 opacity-60' onClick={()=>DeleteCourse(obj)}>Delete</button>
       <button className=' w-[80%] hover:bg-yellow-25 mx-auto rounded-md bg-yellow-200 ' onClick={()=>EditCourse(obj)}>EDIT</button></div>
       </div>
        })
       )
    }
  

 

    </div>
    </>
  )
}

export default MyCourses
