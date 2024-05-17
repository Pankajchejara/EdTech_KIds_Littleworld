import React, { createContext, useState } from 'react'

import { app } from '../Database/FireBase'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

export const Appcontext = createContext();

const firestore = getFirestore(app)

async function fetchUserProfileDetails() {
  const usersCollection = collection(firestore, "users");
  const usersSnapshot = await getDocs(usersCollection);
  const userList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
 return userList;
}


export default function Appcontextprovider({ children }) {




  const [CreateCourseData, setCreateCourseData] = useState(
    { image: '', video: '', title: "", about: "" }
  )
  const [Coursedataobject, SetCourseDataObject] = useState({})
  const[purchaseCourseArray,setPurchasedCourseArray]=useState([])
const [profile, setProfile] = useState({})

  const [toggle, settoggle] = useState(true)

 const value = {
   purchaseCourseArray,setPurchasedCourseArray,
 toggle, settoggle, Coursedataobject,SetCourseDataObject,
    fetchUserProfileDetails, profile, setProfile, CreateCourseData, setCreateCourseData
  }


  return (
    <div>
      <Appcontext.Provider value={value}>
        {children}
      </Appcontext.Provider>
    </div>
  )
}


