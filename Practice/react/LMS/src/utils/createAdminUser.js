import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from '../firebase/config';

export async function createAdminUser(email, password, displayName) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    await updateProfile(result.user, { displayName: displayName });
    
    await set(ref(database, `users/${result.user.uid}`), {
      email: email,
      role: 'Admin',
      name: displayName,
      createdAt: new Date().toISOString(),
      isActive: true,
      isAdmin: true
    });
    
    console.log('Admin user created successfully:', result.user.uid);
    return result.user;
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  }
}

export async function createTeacherUser(email, password, displayName) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    await updateProfile(result.user, { displayName: displayName });
    
    await set(ref(database, `users/${result.user.uid}`), {
      email: email,
      role: 'Teacher',
      name: displayName,
      createdAt: new Date().toISOString(),
      isActive: true
    });
    
    console.log('Teacher user created successfully:', result.user.uid);
    return result.user;
  } catch (error) {
    console.error('Error creating teacher user:', error);
    throw error;
  }
}

createAdminUser('admin@lms.com', 'admin123', 'Admin User')
