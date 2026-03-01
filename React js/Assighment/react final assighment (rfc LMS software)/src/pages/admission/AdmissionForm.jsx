import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PageHeader } from '../../components/PageHeader';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { DatePicker } from '../../components/DatePicker';
import { Button } from '../../components/Button';
import { toast } from 'react-toastify';
import '../../styles/pages.css';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  dateOfBirth: yup.string().required('DOB is required'),
  class: yup.string().required('Class is required'),
  parentName: yup.string().required('Parent name is required'),
  parentPhone: yup.string().required('Parent phone is required'),
  address: yup.string().required('Address is required'),
});

export const AdmissionForm = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      toast.success('Admission created successfully!');
    } catch (error) {
      toast.error('Failed to create admission');
    }
  };

  return (
    <div className="page">
      <PageHeader 
        title="Create Admission"
        subtitle="Register a new student admission"
      />
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h3 style={{ marginBottom: '20px' }}>Student Information</h3>
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
            <DatePicker
              label="Date of Birth"
              value=""
              onChange={(val) => setValue('dateOfBirth', val)}
              error={errors.dateOfBirth?.message}
              required
            />
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
            <Input
              label="Address"
              {...register('address')}
              error={errors.address?.message}
              required
            />
          </div>

          <h3 style={{ marginBottom: '20px', marginTop: '30px' }}>Parent/Guardian Information</h3>
          <div className="form-grid">
            <Input
              label="Parent Name"
              {...register('parentName')}
              error={errors.parentName?.message}
              required
            />
            <Input
              label="Parent Phone"
              type="tel"
              {...register('parentPhone')}
              error={errors.parentPhone?.message}
              required
            />
          </div>

          <div className="form-actions">
            <Button type="submit" variant="primary">Create Admission</Button>
            <Button type="button" variant="secondary">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
