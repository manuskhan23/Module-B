import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider, db } from '../config/firebase';
import { setDoc, doc, getDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign up with email
  const signup = async (email, password, fullName) => {
    try {
      setError(null);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(db, 'users', userCredential.user.uid);

      await setDoc(userDocRef, {
        uid: userCredential.user.uid,
        email,
        fullName,
        createdAt: new Date().toISOString(),
        authMethod: 'email',
        showRecentActivity: true
      });

      // Add default subjects and teachers
      const defaults = [
        { subject: { name: 'Math', code: 'MATH101', teacher: 'Maaz', credits: 3400 }, teacher: { name: 'Maaz', email: 'maaz@lms.com', phone: '+92 000 0000000', subject: 'Math', qualification: 'Department Head', address: 'Main Campus', userId: userCredential.user.uid, createdAt: serverTimestamp() } },
        { subject: { name: 'Urdu', code: 'URD101', teacher: 'Noor', credits: 4200 }, teacher: { name: 'Noor', email: 'noor@lms.com', phone: '+92 000 2000000', subject: 'Urdu', qualification: 'Department Head', address: 'Main Campus', userId: userCredential.user.uid, createdAt: serverTimestamp() } },
        { subject: { name: 'English', code: 'ENG101', teacher: 'Mateen', credits: 3300 }, teacher: { name: 'Mateen', email: 'mateen@lms.com', phone: '+92 000 3000000', subject: 'English', qualification: 'Department Head', address: 'Main Campus', userId: userCredential.user.uid, createdAt: serverTimestamp() } }
      ];

      for (const item of defaults) {
        // Create Teacher
        await addDoc(collection(db, 'teachers'), {
          ...item.teacher,
          userId: userCredential.user.uid,
          createdAt: serverTimestamp()
        });

        // Create Subject
        await addDoc(collection(db, 'subjects'), {
          subjectName: item.subject.name,
          subjectCode: item.subject.code,
          teacherName: item.subject.teacher,
          credits: item.subject.credits,
          userId: userCredential.user.uid,
          createdAt: serverTimestamp()
        });
      }

      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign in with email
  const signin = async (email, password) => {
    try {
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      setError(null);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          fullName: user.displayName || '',
          photoURL: user.photoURL || '',
          createdAt: new Date().toISOString(),
          authMethod: 'google',
          showRecentActivity: true
        });

        // Add default subjects and teachers for new Google user
        const defaults = [
          {
            subject: { name: 'Math', code: 'MATH101', teacher: 'Maaz', credits: 3400 },
            teacher: { name: 'Maaz', email: 'maaz@lms.com', phone: '+92 000 0000000', qualification: 'Department Head', address: 'Main Campus' }
          },
          {
            subject: { name: 'Urdu', code: 'URD101', teacher: 'Noor', credits: 4200 },
            teacher: { name: 'Noor', email: 'noor@lms.com', phone: '+92 000 2000000', qualification: 'Department Head', address: 'Main Campus' }
          },
          {
            subject: { name: 'English', code: 'ENG101', teacher: 'Mateen', credits: 3300 },
            teacher: { name: 'Mateen', email: 'mateen@lms.com', phone: '+92 000 3000000', qualification: 'Department Head', address: 'Main Campus' }
          }
        ];

        for (const item of defaults) {
          // Create Teacher
          await addDoc(collection(db, 'teachers'), {
            ...item.teacher,
            subject: item.subject.name,
            userId: user.uid,
            createdAt: serverTimestamp()
          });

          // Create Subject
          await addDoc(collection(db, 'subjects'), {
            subjectName: item.subject.name,
            subjectCode: item.subject.code,
            teacherName: item.subject.teacher,
            credits: item.subject.credits,
            userId: user.uid,
            createdAt: serverTimestamp()
          });
        }
      }

      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    signup,
    signin,
    signInWithGoogle,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
