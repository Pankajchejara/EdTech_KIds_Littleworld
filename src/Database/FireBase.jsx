

import { initializeApp } from "firebase/app"
import toast from "react-hot-toast";

const firebaseConfig = {
  apiKey:process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,    
 messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APPID 

};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  toast.error("Firebase initialization error");
}

export { app };





