import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  rollNo: yup.string().required('Roll No is required'),
  dateOfBirth: yup.string().required('DOB is required'),
  class: yup.string().required('Class is required'),
  gender: yup.string().required('Gender is required'),
  address: yup.string().required('Address is required'),
  phone: yup.string().required('Phone is required'),
});

export const StudentForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      // Replace with API call
      toast.success('Student added successfully!');
      navigate('/students');
    } catch (error) {
      toast.error('Failed to save student');
    }
  };

  return (
    <div className="page">
      <PageHeader 
        title="Add Student"
        subtitle="Create a new student record"
        onBack={() => navigate('/students')}
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
              label="Roll No"
              {...register('rollNo')}
              error={errors.rollNo?.message}
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
              label="Gender"
              {...register('gender')}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ]}
              error={errors.gender?.message}
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
          <div className="form-actions">
            <Button type="submit" variant="primary">Save Student</Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/students')}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
