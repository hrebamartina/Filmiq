import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyAP4l8EYBovGHHvOlOgJSTBPyGc_omSPzk",
  authDomain: "filmiq-2af7c.firebaseapp.com",
  projectId: "filmiq-2af7c",
  storageBucket: "filmiq-2af7c.firebasestorage.app",
  messagingSenderId: "711819380658",
  appId: "1:711819380658:web:0288f4156f3734b36486ab",
  measurementId: "G-ZV3SE13HMN"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
