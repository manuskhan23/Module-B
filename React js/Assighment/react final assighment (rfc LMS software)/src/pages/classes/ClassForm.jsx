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
  className: yup.string().required('Class name is required'),
  gradeLevel: yup.string().required('Grade level is required'),
  classTeacher: yup.string().required('Class teacher is required'),
  schedule: yup.string().required('Schedule is required'),
  roomNumber: yup.string().required('Room number is required'),
  capacity: yup.number().typeError('Capacity must be a number').required('Capacity is required').positive(),
});

export const ClassForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'teachers'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const teachersList = querySnapshot.docs.map(doc => ({
          value: doc.data().name,
          label: doc.data().name
        }));
        setTeachers(teachersList);
      } catch (error) {
        toast.error('Error fetching teachers');
      }
    };

    fetchTeachers();

    if (id) {
      const fetchClass = async () => {
        try {
          const docRef = doc(db, 'classes', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            reset(docSnap.data());
          }
        } catch (error) {
          toast.error('Error fetching class data');
        }
      };
      fetchClass();
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (id) {
        const docRef = doc(db, 'classes', id);
        await updateDoc(docRef, {
          ...data,
          updatedAt: serverTimestamp(),
        });
        toast.success('Class updated successfully!');
      } else {
        // Check for duplicate class and grade level for THIS user
        const q = query(
          collection(db, 'classes'),
          where('userId', '==', user.uid),
          where('className', '==', data.className),
          where('gradeLevel', '==', data.gradeLevel)
        );
        const duplicateCheck = await getDocs(q);

        if (!duplicateCheck.empty) {
          toast.error('This Class and Grade Level already exists!');
          setLoading(false);
          return;
        }

        await addDoc(collection(db, 'classes'), {
          ...data,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
        toast.success('Class created successfully!');
      }
      navigate('/classes');
    } catch (error) {
      toast.error('Failed to create class: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <PageHeader
        title={id ? 'Edit Class' : 'Create Class'}
        subtitle={id ? 'Modify class details' : 'Add a new class'}
        onBack={() => navigate('/classes')}
      />
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-grid">
            <Input
              label="Class Name"
              {...register('className')}
              placeholder="e.g., 10-A"
              error={errors.className?.message}
              required
            />
            <Input
              label="Grade Level"
              {...register('gradeLevel')}
              placeholder="e.g., Grade 10"
              error={errors.gradeLevel?.message}
              required
            />
            <Select
              label="Class Teacher"
              {...register('classTeacher')}
              options={teachers}
              error={errors.classTeacher?.message}
              required
            />
            <Input
              label="Schedule"
              {...register('schedule')}
              placeholder="e.g., Mon - Fri, 8:00 AM - 2:00 PM"
              error={errors.schedule?.message}
              required
            />
            <Input
              label="Room Number"
              {...register('roomNumber')}
              placeholder="e.g., Room 101"
              error={errors.roomNumber?.message}
              required
            />
            <Input
              label="Capacity"
              type="number"
              {...register('capacity')}
              error={errors.capacity?.message}
              required
            />
          </div>
          <div className="form-actions">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : (id ? 'Update Class' : 'Create Class')}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/classes')} disabled={loading}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
