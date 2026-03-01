import React from 'react';
import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PageHeader } from '../../components/PageHeader';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { toast } from 'react-toastify';
import '../../styles/pages.css';

const schema = yup.object().shape({
  schoolName: yup.string().required('School name is required'),
  principalName: yup.string().required('Principal name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  pincode: yup.string().required('Pincode is required'),
  affiliation: yup.string().required('Affiliation is required'),
});

export const SchoolRegistration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      toast.success('School registered successfully!');
    } catch (error) {
      toast.error('Failed to register school');
    }
  };

  return (
    <div className="page">
      <PageHeader
        title="School Registration"
        subtitle="Register school and admin staff"
      />
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <h3 style={{ marginBottom: '20px' }}>School Information</h3>
          <div className="form-grid">
            <Input
              label="School Name"
              {...register('schoolName')}
              error={errors.schoolName?.message}
              required
            />
            <Input
              label="Principal Name"
              {...register('principalName')}
              error={errors.principalName?.message}
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
            <Input
              label="Address"
              {...register('address')}
              error={errors.address?.message}
              required
            />
            <Input
              label="City"
              {...register('city')}
              error={errors.city?.message}
              required
            />
            <Input
              label="State"
              {...register('state')}
              error={errors.state?.message}
              required
            />
            <Input
              label="Pincode"
              {...register('pincode')}
              error={errors.pincode?.message}
              required
            />
            <Input
              label="Affiliation"
              {...register('affiliation')}
              error={errors.affiliation?.message}
              required
            />
          </div>

          <div className="form-actions">
            <Button type="submit" variant="primary">Register School</Button>
            <Button type="button" variant="secondary">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
