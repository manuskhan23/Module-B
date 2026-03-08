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
  subjectName: yup.string().required('Subject name is required'),
  subjectCode: yup.string().required('Subject code is required'),
  teacherName: yup.string().required('Teacher name is required'),
  credits: yup.number().typeError('Credits must be a number').required('Credits is required').positive(),
});

export const SubjectForm = () => {
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
      const fetchSubject = async () => {
        try {
          const docRef = doc(db, 'subjects', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            reset(docSnap.data());
          }
        } catch (error) {
          toast.error('Error fetching subject data');
        }
      };
      fetchSubject();
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (id) {
        const docRef = doc(db, 'subjects', id);
        await updateDoc(docRef, {
          ...data,
          updatedAt: serverTimestamp(),
        });
        toast.success('Subject updated successfully!');
      } else {
        // Check for duplicate subject code for THIS user
        const q = query(
          collection(db, 'subjects'),
          where('userId', '==', user.uid),
          where('subjectCode', '==', data.subjectCode)
        );
        const duplicateCheck = await getDocs(q);

        if (!duplicateCheck.empty) {
          toast.error('A subject with this code already exists!');
          setLoading(false);
          return;
        }

        await addDoc(collection(db, 'subjects'), {
          ...data,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
        toast.success('Subject created successfully!');
      }
      navigate('/subjects');
    } catch (error) {
      toast.error('Failed to save subject: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <PageHeader
        title={id ? 'Edit Subject' : 'Create Subject'}
        subtitle={id ? 'Modify subject details' : 'Add a new subject'}
        onBack={() => navigate('/subjects')}
      />
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-grid">
            <Input
              label="Subject Name"
              {...register('subjectName')}
              placeholder="e.g., Mathematics"
              error={errors.subjectName?.message}
              required
            />
            <Input
              label="Subject Code"
              {...register('subjectCode')}
              placeholder="e.g., MTH101"
              error={errors.subjectCode?.message}
              required
            />
            <Select
              label="Teacher"
              {...register('teacherName')}
              options={teachers}
              error={errors.teacherName?.message}
              required
            />
            <Input
              label="Credits"
              type="number"
              {...register('credits')}
              error={errors.credits?.message}
              required
            />
          </div>
          <div className="form-actions">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : (id ? 'Update Subject' : 'Create Subject')}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/subjects')} disabled={loading}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

