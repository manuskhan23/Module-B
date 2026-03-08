import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PageHeader } from '../../components/PageHeader';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { toast } from 'react-toastify';
import { db } from '../../config/firebase';
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages.css';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  rollNo: yup.string().required('Roll No is required'),
  dateOfBirth: yup.string().required('DOB is required'),
  grade: yup.string().required('Grade is required'),
  gender: yup.string().required('Gender is required'),
  address: yup.string().required('Address is required'),
  phone: yup.string().required('Phone is required'),
});

export const StudentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchClasses = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'classes'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const classesList = querySnapshot.docs.map(doc => ({
          value: doc.data().className,
          label: doc.data().className
        }));
        setClasses(classesList);
      } catch (error) {
        console.error(error);
        toast.error('Error fetching classes');
      }
    };

    fetchClasses();

    if (id) {
      const fetchStudent = async () => {
        try {
          const docRef = doc(db, 'students', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            reset(docSnap.data());
          }
        } catch (error) {
          toast.error('Error fetching student data');
        }
      };
      fetchStudent();
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (id) {
        const docRef = doc(db, 'students', id);
        await updateDoc(docRef, {
          ...data,
          updatedAt: serverTimestamp(),
        });
        toast.success('Student updated successfully!');
      } else {
        // Check for duplicate roll number in the same grade for THIS user
        const q = query(
          collection(db, 'students'),
          where('userId', '==', user.uid),
          where('rollNo', '==', data.rollNo),
          where('grade', '==', data.grade)
        );
        const duplicateCheck = await getDocs(q);

        if (!duplicateCheck.empty) {
          toast.error('A student with this Roll No already exists in this grade!');
          setLoading(false);
          return;
        }

        await addDoc(collection(db, 'students'), {
          ...data,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
        toast.success('Student registered successfully!');
      }
      navigate('/students');
    } catch (error) {
      toast.error('Failed to save student: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <PageHeader
        title={id ? 'Edit Student' : 'Add Student'}
        subtitle={id ? 'Modify student record' : 'Create a new student record'}
        onBack={() => navigate('/students')}
      />
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-grid">
            <Input
              label="Full Name"
              {...register('name')}
              error={errors.name?.message}
              required
            />
            <Input
              label="Roll No"
              {...register('rollNo')}
              error={errors.rollNo?.message}
              required
            />
            <Input
              label="Email"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              required
            />
            <Input
              label="Phone"
              type="tel"
              {...register('phone')}
              error={errors.phone?.message}
              required
            />
            <Input
              label="Date of Birth"
              type="date"
              {...register('dateOfBirth')}
              error={errors.dateOfBirth?.message}
              required
            />
            <Select
              label="Gender"
              {...register('gender')}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ]}
              error={errors.gender?.message}
              required
            />
            <Select
              label="Grade"
              {...register('grade')}
              options={classes}
              error={errors.grade?.message}
              required
            />
            <Input
              label="Address"
              {...register('address')}
              error={errors.address?.message}
              required
            />
          </div>
          <div className="form-actions">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : (id ? 'Update Student' : 'Save Student')}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/students')} disabled={loading}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
