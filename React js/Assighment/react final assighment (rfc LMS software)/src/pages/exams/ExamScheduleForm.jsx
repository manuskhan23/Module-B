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
  examName: yup.string().required('Exam name is required'),
  subjectName: yup.string().required('Subject name is required'),
  className: yup.string().required('Class is required'),
  examDate: yup.string().required('Date is required'),
  startTime: yup.string().required('Start time is required'),
  endTime: yup.string().required('End time is required'),
  roomNumber: yup.string().required('Room is required'),
});

export const ExamScheduleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const [subjectsSnap, classesSnap] = await Promise.all([
          getDocs(query(collection(db, 'subjects'), where('userId', '==', user.uid))),
          getDocs(query(collection(db, 'classes'), where('userId', '==', user.uid)))
        ]);

        setSubjects(subjectsSnap.docs.map(doc => ({
          value: doc.data().subjectName,
          label: doc.data().subjectName
        })));

        setClasses(classesSnap.docs.map(doc => ({
          value: doc.data().className,
          label: doc.data().className
        })));
      } catch (error) {
        toast.error('Error fetching dynamic data');
      }
    };

    fetchData();

    if (id) {
      const fetchExam = async () => {
        try {
          const docRef = doc(db, 'exams', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            reset(docSnap.data());
          }
        } catch (error) {
          toast.error('Error fetching exam data');
        }
      };
      fetchExam();
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (id) {
        const docRef = doc(db, 'exams', id);
        await updateDoc(docRef, {
          ...data,
          updatedAt: serverTimestamp(),
        });
        toast.success('Exam schedule updated successfully!');
      } else {
        // Check for duplicate exam schedule for THIS user
        const q = query(
          collection(db, 'exams'),
          where('userId', '==', user.uid),
          where('examDate', '==', data.examDate),
          where('startTime', '==', data.startTime),
          where('roomNumber', '==', data.roomNumber),
          where('className', '==', data.className)
        );
        const duplicateCheck = await getDocs(q);

        if (!duplicateCheck.empty) {
          toast.error('This Exam Schedule (Date, Time, Room, Class) already exists!');
          setLoading(false);
          return;
        }

        await addDoc(collection(db, 'exams'), {
          ...data,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
        toast.success('Exam scheduled successfully!');
      }
      navigate('/exams');
    } catch (error) {
      toast.error('Failed to schedule exam: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <PageHeader
        title={id ? 'Edit Exam' : 'Schedule Exam'}
        subtitle={id ? 'Modify exam schedule' : 'Add new exam schedule'}
        onBack={() => navigate('/exams')}
      />
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-grid">
            <Input
              label="Exam Name"
              {...register('examName')}
              placeholder="e.g., Mid Term"
              error={errors.examName?.message}
              required
            />
            <Select
              label="Subject"
              {...register('subjectName')}
              options={subjects}
              error={errors.subjectName?.message}
              required
            />
            <Select
              label="Class"
              {...register('className')}
              options={classes}
              error={errors.className?.message}
              required
            />
            <Input
              label="Exam Date"
              type="date"
              {...register('examDate')}
              error={errors.examDate?.message}
              required
            />
            <Input
              label="Start Time"
              type="time"
              {...register('startTime')}
              error={errors.startTime?.message}
              required
            />
            <Input
              label="End Time"
              type="time"
              {...register('endTime')}
              error={errors.endTime?.message}
              required
            />
            <Input
              label="Room Number"
              {...register('roomNumber')}
              error={errors.roomNumber?.message}
              required
            />
          </div>
          <div className="form-actions">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Scheduling...' : (id ? 'Update Schedule' : 'Schedule Exam')}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/exams')} disabled={loading}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};


