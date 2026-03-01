import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PageHeader } from '../../components/PageHeader';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { DataGrid } from '../../components/DataGrid';
import { toast } from 'react-toastify';
import '../../styles/pages.css';

const schema = yup.object().shape({
  studentId: yup.string().required('Student is required'),
  examId: yup.string().required('Exam is required'),
  marksObtained: yup.number().required('Marks is required').min(0).max(100),
  grade: yup.string().required('Grade is required'),
});

export const ExamResult = () => {
  const [results, setResults] = useState([
    { id: 1, student: 'John Doe', exam: 'Mathematics', marks: 85, grade: 'A+', status: 'Published' },
    { id: 2, student: 'Jane Smith', exam: 'English', marks: 78, grade: 'A', status: 'Published' },
  ]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const newResult = {
        id: results.length + 1,
        student: data.studentId,
        exam: data.examId,
        marks: data.marksObtained,
        grade: data.grade,
        status: 'Published',
      };
      setResults([...results, newResult]);
      toast.success('Result added successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to add result');
    }
  };

  const columns = [
    { field: 'student', headerName: 'Student' },
    { field: 'exam', headerName: 'Exam' },
    { field: 'marks', headerName: 'Marks', render: (val) => `${val}/100` },
    { field: 'grade', headerName: 'Grade' },
    { field: 'status', headerName: 'Status', render: (status) => <span className={`badge badge-${status.toLowerCase()}`}>{status}</span> },
  ];

  return (
    <div className="page">
      <PageHeader title="Exam Results" subtitle="Record and publish exam results" />
      <div className="page-content">
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #E5E7EB' }}>
          <h3 style={{ marginBottom: '20px' }}>Add Exam Result</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-grid">
              <Select
                label="Student"
                {...register('studentId')}
                options={[
                  { value: 'john', label: 'John Doe' },
                  { value: 'jane', label: 'Jane Smith' },
                ]}
                error={errors.studentId?.message}
                required
              />
              <Select
                label="Exam"
                {...register('examId')}
                options={[
                  { value: 'math', label: 'Mathematics' },
                  { value: 'eng', label: 'English' },
                  { value: 'sci', label: 'Science' },
                ]}
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
              <Select
                label="Grade"
                {...register('grade')}
                options={[
                  { value: 'A+', label: 'A+' },
                  { value: 'A', label: 'A' },
                  { value: 'B', label: 'B' },
                  { value: 'C', label: 'C' },
                ]}
                error={errors.grade?.message}
                required
              />
            </div>
            <div className="form-actions">
              <Button type="submit" variant="primary">Add Result</Button>
            </div>
          </form>
        </div>

        <h3 style={{ marginBottom: '16px' }}>Recent Results</h3>
        <DataGrid columns={columns} rows={results} />
      </div>
    </div>
  );
};
