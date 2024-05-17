
import React, { useContext, useEffect, useState } from 'react';
import { Appcontext } from '../../context/Appcontext';
import {app} from '../../Database/FireBase' //app
import toast from 'react-hot-toast';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc,updateDoc,collection, query, where, getDocs } from 'firebase/firestore';
import Spinner from '../Spinner';

const Purchased = () => {
  const { fetchUserProfileDetails} = useContext(Appcontext);
  const [CourseArray, setCourseArray] = useState([]);
  const firestore = getFirestore(app);
  const auth = getAuth(app);
const [loading,setLoading]=useState(true)
  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        setLoading(true)
        const userProfile = await fetchUserProfileDetails();
        const user = auth.currentUser;
        
        if (user) {
          const purchasedCourseIds = userProfile
            .filter((obj) => obj.email === user.email)[0]
            .purchaseCourseArray;
          
          const promises = purchasedCourseIds.map((courseId) => fetchDataById('courses', courseId));
          const courses = await Promise.all(promises);
         

            setCourseArray(courses);
            setLoading(false)
          
        }
      } catch (error) {
        toast.error("Something Went Wrong !", error);
        setLoading(false)
      }
    };

    fetchPurchasedCourses();
  }, []);

  const fetchDataById = async (collectionName, documentId) => {
    try {
      const docRef = doc(firestore, collectionName, documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {...data,documentId};
      } else {
        const obj={
          title:" course deleted ",
          about:"This Course deleted by Owner",
          image:"",
          video:"",
          documentId
        }
        return obj
      }
    } catch (error) {
      const obj={
        title:"course deleted by Owner",
        about:"This Course deleted by Owner",
        image:"",
        video:"",
        documentId
      }
      return obj
    }
  };
  const [isPlaying, setIsPlaying] = useState(false);


    const togglePlay = () => {
      setIsPlaying((prevIsPlaying) => !prevIsPlaying);
    };
  const [show,setShow]=useState('');
  
  
  
  function delhandle(id){
  setShow(false)
  
   
  }
  async function updateDocumentById(collectionName, documentId, newData) {
    try {
      
        // Reference to the document in a specific collection
        const docRef = doc(firestore, collectionName, documentId);
  
        // Perform the update
        await updateDoc(docRef, newData).then((res)=>{

        
          
        });
    } catch (error) {
        toast.error("Something Went Wrong");
    }
  }
  
  function viewhandle(obj){
  setShow(obj.id)
  }


  async function fetchUserByEmail(email) {
    const firestore = getFirestore(app);
    const usersCollection = collection(firestore, 'users');
    const q = query(usersCollection, where('email', '==', email));
  
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        
        return null;
      } else {
        // There should be only one document with the given email, so we return the first one
        const userData = querySnapshot.docs[0].data();
       
        return userData;
      }
    } catch (error) {
  
      throw error;
    }
  }
  




  const clickHandlerDelete = async (obj) => {
  
  
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return;
      }
  
      const userData = await fetchUserByEmail(user.email);
      if (!userData) {
    
        return;
      }
  
      const newPurchaseCourseArray = userData.purchaseCourseArray.filter(id => id !== obj.documentId);
  
      try {
        
        await updateDocumentById("users", userData.id, {
          ...userData,
          purchaseCourseArray: newPurchaseCourseArray
        }).then(()=>{

          toast.success(" Course deleted Sucessfully")
        })
        setCourseArray(prevCourses => prevCourses.filter(course => course.documentId !== obj.documentId));
        
     
      } catch (error) {
        toast.error("Something Went Wrong");
    
      }
    });
  };
  
  
  

  return (
    <div className='w-full relative'>
      {CourseArray.length > 0 ? (
        <div className='w-full flex-wrap h-full mx-auto flex gap-x-[20px] justify-center items-center gap-y-[10px]'>
          {CourseArray.map((obj) => (
           !loading&& <div key={obj.id}>
              <div className='bg-pure-greys-900 hover:shadow-pure-greys-500 shadow-md rounded-md w-[300px] h-[400px] flex flex-col gap-y-[5px] items-center'>
                <div className='w-full h-[200px] rounded-md border border-b-white'>
                  <img src={obj.image} className='object-cover w-full h-full aspect-auto' alt='Not Available' />
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <p className='text-white text-2xl break-words w-full'>{`${obj.title}`}</p>
                  <p className='text-white font-sarif overflow-y-auto break-words w-full'>{`${obj.about}...`}</p>
                </div>
                <button className='text-white w-[80%] mx-auto hover:bg-red-100 rounded-md bg-blue-100'onClick={()=>clickHandlerDelete(obj)}>Delete</button>
                <button className='text-blue-400 w-[80%] mx-auto rounded-md bg-yellow-100' onClick={() => viewhandle(obj)}>View Details</button>
              </div>
              {show === obj.id && (
                <div className='bg-pure-greys-900 fixed top-[0px] left-0 right-0 shadow-md border border-pure-greys-500 rounded-md w-full h-full hover:shadow-pure-greys-500 flex flex-col gap-y-[5px] justify-center items-center'>
                  <div className='w-full h-full relative'>
                    <video controls autoPlay={isPlaying} onClick={togglePlay} style={{ cursor: 'pointer' }} className='object-fill w-full h-full'>
                      <source src={obj.video} type="video/mp4" />
                      Your browser does not support the video tag. 
                    </video>
                  </div>
                  <p className='text-white absolute bottom-10'>{obj.title}</p>
                  <button className='text-blue-400 absolute hover:bg-blue-400 top-[100px] right-0 bg-yellow-100 p-2 rounded-xl' onClick={() => delhandle(obj.id)}>Close</button>
                </div>
              )}
            </div>
          ))}
        
     
        
        </div>

      ) : (<>
       
    { !loading&&   <p className='text-white text-center text-3xl'>No purchased courses available</p>}
    
    {loading&&   <div className='w-full  flex h-[400px] justify-center items-center'>
          <Spinner/>
        </div>}
    
    
     </>
   )}
    </div>
  );
}

export default Purchased;

