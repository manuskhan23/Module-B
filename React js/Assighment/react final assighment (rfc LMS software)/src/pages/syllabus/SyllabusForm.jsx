import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PageHeader } from '../../components/PageHeader';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { toast } from 'react-toastify';
import '../../styles/pages.css';

const schema = yup.object().shape({
  class: yup.string().required('Class is required'),
  subject: yup.string().required('Subject is required'),
  chapters: yup.string().required('Chapters are required'),
  releaseDate: yup.string().required('Release date is required'),
});

export const SyllabusForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      toast.success('Syllabus created successfully!');
      navigate('/syllabus');
    } catch (error) {
      toast.error('Failed to create syllabus');
    }
  };

  return (
    <div className="page">
      <PageHeader 
        title="Create Syllabus"
        subtitle="Create and release new syllabus"
        onBack={() => navigate('/syllabus')}
      />
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-grid">
            <Select
              label="Class"
              {...register('class')}
              options={[
                { value: '10-A', label: '10-A' },
                { value: '10-B', label: '10-B' },
                { value: '12-A', label: '12-A' },
              ]}
              error={errors.class?.message}
              required
            />
            <Select
              label="Subject"
              {...register('subject')}
              options={[
                { value: 'mathematics', label: 'Mathematics' },
                { value: 'english', label: 'English' },
                { value: 'science', label: 'Science' },
              ]}
              error={errors.subject?.message}
              required
            />
            <Input
              label="Release Date"
              type="date"
              {...register('releaseDate')}
              error={errors.releaseDate?.message}
              required
            />
            <Input
              label="Chapters"
              {...register('chapters')}
              placeholder="Chapter 1, Chapter 2, ..."
              error={errors.chapters?.message}
              required
            />
          </div>
          <div className="form-actions">
            <Button type="submit" variant="primary">Create Syllabus</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/syllabus')}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
