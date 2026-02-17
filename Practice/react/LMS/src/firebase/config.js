import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB7kfvLNOzwfSjmDv9AqLnJFngID1ZBdsw",
  authDomain: "assignment-3-f07f6.firebaseapp.com",
  databaseURL: "https://assignment-3-f07f6-default-rtdb.firebaseio.com",
  projectId: "assignment-3-f07f6",
  storageBucket: "assignment-3-f07f6.firebasestorage.app",
  messagingSenderId: "56096158704",
  appId: "1:56096158704:web:ddab80afa6b70919fe2335"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getDatabase(app);

export default app;
