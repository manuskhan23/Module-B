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
  name: yup.string().required('Subject name is required'),
  code: yup.string().required('Subject code is required'),
  teacher: yup.string().required('Teacher is required'),
  credits: yup.number().required('Credits is required').positive(),
});

export const SubjectForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      toast.success('Subject created successfully!');
      navigate('/subjects');
    } catch (error) {
      toast.error('Failed to create subject');
    }
  };

  return (
    <div className="page">
      <PageHeader 
        title="Create Subject"
        subtitle="Add a new subject"
        onBack={() => navigate('/subjects')}
      />
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-grid">
            <Input
              label="Subject Name"
              {...register('name')}
              placeholder="e.g., Mathematics"
              error={errors.name?.message}
              required
            />
            <Input
              label="Subject Code"
              {...register('code')}
              placeholder="e.g., MTH101"
              error={errors.code?.message}
              required
            />
            <Select
              label="Teacher"
              {...register('teacher')}
              options={[
                { value: 'smith', label: 'Mr. Smith' },
                { value: 'johnson', label: 'Ms. Johnson' },
              ]}
              error={errors.teacher?.message}
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
            <Button type="submit" variant="primary">Create Subject</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/subjects')}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
