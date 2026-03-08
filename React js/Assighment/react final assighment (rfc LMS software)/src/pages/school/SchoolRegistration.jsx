import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PageHeader } from '../../components/PageHeader';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { db } from '../../config/firebase';
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp, query, where } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
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
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (id) {
      const fetchSchool = async () => {
        try {
          const docRef = doc(db, 'schools', id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            reset(docSnap.data());
          }
        } catch (error) {
          toast.error('Error fetching school data');
        }
      };
      fetchSchool();
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (id) {
        const docRef = doc(db, 'schools', id);
        await updateDoc(docRef, {
          ...data,
          updatedAt: serverTimestamp(),
        });
        toast.success('School updated successfully!');
      } else {
        await addDoc(collection(db, 'schools'), {
          ...data,
          userId: user.uid,
          createdAt: serverTimestamp(),
        });
        toast.success('School registered successfully!');
      }
      navigate('/school');
    } catch (error) {
      toast.error('Failed to save school details: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <PageHeader
        title={id ? 'Edit School' : 'School Registration'}
        subtitle={id ? 'Update school information' : 'Register a new school'}
        onBack={() => navigate('/school')}
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
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : (id ? 'Update School' : 'Register School')}
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate('/school')} disabled={loading}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
