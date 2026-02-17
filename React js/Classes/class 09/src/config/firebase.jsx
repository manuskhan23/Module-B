// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDXJvy2cGoipAnguMUG_8T8jkdy00Lm2Zs",
  authDomain: "webauth-ff55b.firebaseapp.com",
  projectId: "webauth-ff55b",
  storageBucket: "webauth-ff55b.firebasestorage.app",
  messagingSenderId: "752317938721",
  appId: "1:752317938721:web:ac6f6eb2170a82c318b760",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
