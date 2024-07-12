// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWWswi01iyTpwXpcQO0jmR8Zd2Qu2tE3E",
  authDomain: "vocal-2d0f9.firebaseapp.com",
  projectId: "vocal-2d0f9",
  storageBucket: "vocal-2d0f9.appspot.com",
  messagingSenderId: "47613869714",
  appId: "1:47613869714:web:4f904d4dc2049f7162704b",
  measurementId: "G-6Q9BH6F1ZG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);
const db = getFirestore(app);
export {auth,app,db};