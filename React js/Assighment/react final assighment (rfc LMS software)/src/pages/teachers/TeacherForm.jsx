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
  phone: yup.string().required('Phone is required'),
  subject: yup.string().required('Subject is required'),
  qualification: yup.string().required('Qualification is required'),
  address: yup.string().required('Address is required'),
});

export const TeacherForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'subjects')
        );
        const querySnapshot = await getDocs(q);
        const subjectsList = querySnapshot.docs.map(doc => ({
          value: doc.data().subjectName,
          label: doc.data().subjectName
        }));
        setSubjects(subjectsList);
      } catch (error) {
        toast.error('Error fetching subjects');
      }
    };

    fetchSubjects();

    if (id) {
      const fetchTeacher = async () => {
        try {
          const docRef = doc(db, 'teachers', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            reset(docSnap.data());
          }
        } catch (error) {
          toast.error('Error fetching teacher data');
        }
      };
      fetchTeacher();
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (id) {
        const docRef = doc(db, 'teachers', id);
        await updateDoc(docRef, {
          ...data,
          updatedAt: serverTimestamp(),
        });
        toast.success('Teacher updated successfully!');
      } else {
        // Check for duplicate email for THIS user
        const q = query(
          collection(db, 'teachers'),
          where('userId', '==', user.uid),
          where('email', '==', data.email)
        );
        const duplicateCheck = await getDocs(q);

        if (!duplicateCheck.empty) {
          toast.error('A teacher with this email already exists!');
          setLoading(false);
          return;
        }

        await addDoc(collection(db, 'teachers'), {
          ...data,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
        toast.success('Teacher registered successfully!');
      }
      navigate('/teachers');
    } catch (error) {
      toast.error('Failed to save teacher: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <PageHeader
        title={id ? 'Edit Teacher' : 'Add Teacher'}
        subtitle={id ? 'Modify teacher record' : 'Create a new teacher record'}
        onBack={() => navigate('/teachers')}
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
            <Select
              label="Subject"
              {...register('subject')}
              options={subjects}
              error={errors.subject?.message}
              required
            />
            <Input
              label="Qualification"
              {...register('qualification')}
              error={errors.qualification?.message}
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
              {loading ? 'Saving...' : (id ? 'Update Teacher' : 'Save Teacher')}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/teachers')} disabled={loading}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

