// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPJutkdilsPWkhCMFJ1mmxQP1YdDG_8I4",
  authDomain: "react-mini-hkathon.firebaseapp.com",
  projectId: "react-mini-hkathon",
  storageBucket: "react-mini-hkathon.firebasestorage.app",
  messagingSenderId: "296809611017",
  appId: "1:296809611017:web:98ab3bc9df8b83e53dddd8",
  measurementId: "G-6M5B5DKC64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);

// Auth Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Configure providers
googleProvider.addScope("profile");
googleProvider.addScope("email");

githubProvider.addScope("user:email");

export { auth, database, firestore, googleProvider, githubProvider };