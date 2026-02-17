// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa5uQR0dmocroKWqCit6DvHNWiqsxzEyo",
  authDomain: "auth-app-c0b6a.firebaseapp.com",
  projectId: "auth-app-c0b6a",
  storageBucket: "auth-app-c0b6a.firebasestorage.app",
  messagingSenderId: "692602261174",
  appId: "1:692602261174:web:189689191ec293f74ee017",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
