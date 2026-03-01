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
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  subject: yup.string().required('Subject is required'),
  qualification: yup.string().required('Qualification is required'),
  address: yup.string().required('Address is required'),
});

export const TeacherForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      toast.success('Teacher added successfully!');
      navigate('/teachers');
    } catch (error) {
      toast.error('Failed to save teacher');
    }
  };

  return (
    <div className="page">
      <PageHeader 
        title="Add Teacher"
        subtitle="Create a new teacher record"
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
              options={[
                { value: 'mathematics', label: 'Mathematics' },
                { value: 'english', label: 'English' },
                { value: 'science', label: 'Science' },
                { value: 'history', label: 'History' },
              ]}
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
            <Button type="submit" variant="primary">Save Teacher</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/teachers')}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
