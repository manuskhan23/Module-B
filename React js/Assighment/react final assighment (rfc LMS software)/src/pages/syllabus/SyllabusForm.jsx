import React, { useState, useEffect } from 'react';
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
  subjectId: yup.string().required('Subject is required'),
  grade: yup.string().required('Grade is required'),
  topics: yup.string().required('Topics are required'),
  duration: yup.string().required('Duration is required'),
  objectives: yup.string().required('Objectives are required'),
});

export const SyllabusForm = () => {
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
          collection(db, 'subjects'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        setSubjects(querySnapshot.docs.map(doc => ({
          value: doc.id,
          label: doc.data().subjectName
        })));
      } catch (error) {
        toast.error('Error fetching subjects');
      }
    };
    fetchSubjects();

    if (id) {
      const fetchSyllabus = async () => {
        try {
          const docRef = doc(db, 'syllabus', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            reset(docSnap.data());
          }
        } catch (error) {
          toast.error('Error fetching syllabus');
        }
      };
      fetchSyllabus();
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const subjectName = subjects.find(s => s.value === data.subjectId)?.label || '';
      const finalData = { ...data, subjectName };

      if (id) {
        const docRef = doc(db, 'syllabus', id);
        await updateDoc(docRef, {
          ...finalData,
          updatedAt: serverTimestamp(),
        });
        toast.success('Syllabus updated successfully!');
      } else {
        await addDoc(collection(db, 'syllabus'), {
          ...finalData,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
        toast.success('Syllabus created successfully!');
      }
      navigate('/syllabus');
    } catch (error) {
      toast.error('Failed to save syllabus: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <PageHeader
        title={id ? 'Edit Syllabus' : 'Add Syllabus'}
        subtitle={id ? 'Modify syllabus details' : 'Define new syllabus for a subject'}
        onBack={() => navigate('/syllabus')}
      />
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-grid">
            <Select
              label="Subject"
              {...register('subjectId')}
              options={subjects}
              error={errors.subjectId?.message}
              required
            />
            <Input
              label="Grade"
              {...register('grade')}
              placeholder="e.g., 10th Grade"
              error={errors.grade?.message}
              required
            />
            <Input
              label="Duration"
              {...register('duration')}
              placeholder="e.g., 3 Months"
              error={errors.duration?.message}
              required
            />
            <Input
              label="Topics"
              {...register('topics')}
              placeholder="List key topics separated by commas"
              error={errors.topics?.message}
              required
            />
            <Input
              label="Objectives"
              {...register('objectives')}
              placeholder="Learning objectives"
              error={errors.objectives?.message}
              required
            />
          </div>
          <div className="form-actions">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : (id ? 'Update Syllabus' : 'Create Syllabus')}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/syllabus')} disabled={loading}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
