import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCYHdxaEmWclxADhMJoWBZ4wIGrZ7GlddM",
  authDomain: "lms-software-3e0dd.firebaseapp.com",
  projectId: "lms-software-3e0dd",
  storageBucket: "lms-software-3e0dd.firebasestorage.app",
  messagingSenderId: "978097080453",
  appId: "1:978097080453:web:f7f583479a4f8d337a01ec",
  measurementId: "G-X5GV1X5SHV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

export default app;
