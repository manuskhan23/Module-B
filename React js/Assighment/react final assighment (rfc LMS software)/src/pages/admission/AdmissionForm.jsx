import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PageHeader } from '../../components/PageHeader';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { toast } from 'react-toastify';
import { db } from '../../config/firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, where } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages.css';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  dateOfBirth: yup.string().required('DOB is required'),
  gender: yup.string().required('Gender is required'),
  address: yup.string().required('Address is required'),
  previousSchool: yup.string().required('Previous school info is required'),
  gradeApplyingFor: yup.string().required('Grade is required'),
  parentName: yup.string().required('Parent/Guardian name is required'),
  parentPhone: yup.string().required('Parent phone is required'),
});

export const AdmissionForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchClasses = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'classes'),
          where('userId', '==', user.uid)
        );
        const querySnapshot = await getDocs(q);
        const classesList = querySnapshot.docs.map(doc => ({
          value: doc.data().className,
          label: doc.data().className
        }));
        setClasses(classesList);
      } catch (error) {
        toast.error('Error fetching classes');
      }
    };
    fetchClasses();
  }, [user]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'admissions'), {
        ...data,
        userId: user.uid,
        status: 'Pending',
        appliedAt: serverTimestamp(),
      });
      toast.success('Admission application submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to submit application: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <PageHeader
        title="Admission Form"
        subtitle="Apply for new student admission"
        onBack={() => navigate('/dashboard')}
      />
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className="form-grid">
            <Input
              label="First Name"
              {...register('firstName')}
              error={errors.firstName?.message}
              required
            />
            <Input
              label="Last Name"
              {...register('lastName')}
              error={errors.lastName?.message}
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
              label="Date of Birth"
              type="date"
              {...register('dateOfBirth')}
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
              label="Grade Applying For"
              {...register('gradeApplyingFor')}
              options={classes}
              error={errors.gradeApplyingFor?.message}
              required
            />
            <Input
              label="Parent Name"
              {...register('parentName')}
              error={errors.parentName?.message}
              required
            />
            <Input
              label="Parent Phone"
              {...register('parentPhone')}
              error={errors.parentPhone?.message}
              required
            />
            <Input
              label="Previous School"
              {...register('previousSchool')}
              error={errors.previousSchool?.message}
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
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Admission Application'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/dashboard')} disabled={loading}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
