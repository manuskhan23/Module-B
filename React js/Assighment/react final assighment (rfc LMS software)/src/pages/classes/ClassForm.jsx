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
  name: yup.string().required('Class name is required'),
  section: yup.string().required('Section is required'),
  classTeacher: yup.string().required('Class teacher is required'),
  strength: yup.number().required('Strength is required').positive(),
});

export const ClassForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      toast.success('Class created successfully!');
      navigate('/classes');
    } catch (error) {
      toast.error('Failed to create class');
    }
  };

  return (
    <div className="page">
      <PageHeader 
        title="Create Class"
        subtitle="Add a new class"
        onBack={() => navigate('/classes')}
      />
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-grid">
            <Input
              label="Class Name"
              {...register('name')}
              placeholder="e.g., 10-A"
              error={errors.name?.message}
              required
            />
            <Input
              label="Section"
              {...register('section')}
              placeholder="e.g., A"
              error={errors.section?.message}
              required
            />
            <Select
              label="Class Teacher"
              {...register('classTeacher')}
              options={[
                { value: 'smith', label: 'Mr. Smith' },
                { value: 'johnson', label: 'Ms. Johnson' },
              ]}
              error={errors.classTeacher?.message}
              required
            />
            <Input
              label="Strength"
              type="number"
              {...register('strength')}
              error={errors.strength?.message}
              required
            />
          </div>
          <div className="form-actions">
            <Button type="submit" variant="primary">Create Class</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/classes')}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
