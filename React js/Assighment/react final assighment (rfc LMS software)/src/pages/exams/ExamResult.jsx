import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PageHeader } from '../../components/PageHeader';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { DataGrid } from '../../components/DataGrid';
import { toast } from 'react-toastify';
import { db } from '../../config/firebase';
import { collection, addDoc, query, getDocs, deleteDoc, doc, orderBy, serverTimestamp, where } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages.css';

const schema = yup.object().shape({
  studentId: yup.string().required('Student is required'),
  examId: yup.string().required('Exam is required'),
  marksObtained: yup.number().typeError('Marks must be a number').required('Marks is required').min(0).max(100),
  totalMarks: yup.number().typeError('Total marks must be a number').required('Total marks is required').min(1),
  grade: yup.string().required('Grade is required'),
});

export const ExamResult = () => {
  const { user } = useAuth();
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [studentSnap, examSnap, resultSnap] = await Promise.all([
        getDocs(query(collection(db, 'students'), where('userId', '==', user.uid))),
        getDocs(query(collection(db, 'exams'), where('userId', '==', user.uid))),
        getDocs(query(collection(db, 'results'), where('userId', '==', user.uid)))
      ]);

      setStudents(studentSnap.docs.map(doc => ({ value: doc.id, label: doc.data().name })));
      setExams(examSnap.docs.map(doc => ({ value: doc.id, label: doc.data().examName })));
      setResults(resultSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0)));
    } catch (error) {
      toast.error('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const studentName = students.find(s => s.value === data.studentId)?.label || '';
      const examName = exams.find(e => e.value === data.examId)?.label || '';
      const percentage = (data.marksObtained / data.totalMarks) * 100;

      await addDoc(collection(db, 'results'), {
        ...data,
        userId: user.uid,
        studentName,
        examName,
        percentage: percentage.toFixed(2),
        createdAt: serverTimestamp(),
      });

      toast.success('Result published successfully!');
      reset();
      fetchData();
    } catch (error) {
      toast.error('Failed to publish result: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this result?')) {
      try {
        await deleteDoc(doc(db, 'results', id));
        toast.success('Result deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete result');
      }
    }
  };

  const columns = [
    { field: 'studentName', headerName: 'Student' },
    { field: 'examName', headerName: 'Exam' },
    { field: 'marksObtained', headerName: 'Marks', render: (val, row) => `${val}/${row.totalMarks}` },
    { field: 'percentage', headerName: 'Percentage', render: (val) => `${val}%` },
    { field: 'grade', headerName: 'Grade' },
  ];

  return (
    <div className="page">
      <PageHeader title="Exam Results" subtitle="Manage and publish student performance" />
      <div className="page-content">
        <div className="form-container-card">
          <h3 className="section-title">Record Exam Result</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-grid">
              <Select
                label="Student"
                {...register('studentId')}
                options={students}
                error={errors.studentId?.message}
                required
              />
              <Select
                label="Exam"
                {...register('examId')}
                options={exams}
                error={errors.examId?.message}
                required
              />
              <Input
                label="Marks Obtained"
                type="number"
                {...register('marksObtained')}
                error={errors.marksObtained?.message}
                required
              />
              <Input
                label="Total Marks"
                type="number"
                {...register('totalMarks')}
                defaultValue={100}
                error={errors.totalMarks?.message}
                required
              />
              <Select
                label="Grade"
                {...register('grade')}
                options={[
                  { value: 'A+', label: 'A+' },
                  { value: 'A', label: 'A' },
                  { value: 'B', label: 'B' },
                  { value: 'C', label: 'C' },
                  { value: 'D', label: 'D' },
                  { value: 'F', label: 'F' },
                ]}
                error={errors.grade?.message}
                required
              />
            </div>
            <div className="form-actions">
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Publishing...' : 'Publish Result'}
              </Button>
            </div>
          </form>
        </div>

        <div className="list-container-card">
          <h3 className="section-title">Result List</h3>
          <DataGrid
            columns={columns}
            rows={results}
            loading={loading}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};
