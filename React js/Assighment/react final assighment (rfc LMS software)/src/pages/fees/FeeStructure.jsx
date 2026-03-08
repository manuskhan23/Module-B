import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PageHeader } from '../../components/PageHeader';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { DataGrid } from '../../components/DataGrid';
import { toast } from 'react-toastify';
import { db } from '../../config/firebase';
import { collection, addDoc, query, getDocs, deleteDoc, doc, serverTimestamp, where } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages.css';

const schema = yup.object().shape({
  className: yup.string().required('Class is required'),
  tuitionFee: yup.number().typeError('Must be a number').required('Tuition fee is required').min(0),
  transportFee: yup.number().typeError('Must be a number').required('Transport fee is required').min(0),
  uniformFee: yup.number().typeError('Must be a number').required('Uniform fee is required').min(0),
  otherFees: yup.number().typeError('Must be a number').required('Other fees is required').min(0),
});

export const FeeStructure = () => {
  const { user } = useAuth();
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) fetchFees();
  }, [user]);

  const fetchFees = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'fee_structure'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const feesData = querySnapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          ...d,
          total: (Number(d.tuitionFee) || 0) + (Number(d.transportFee) || 0) + (Number(d.uniformFee) || 0) + (Number(d.otherFees) || 0)
        };
      }).sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0));
      setFees(feesData);
    } catch (error) {
      toast.error('Error fetching fee structure');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'fee_structure'), {
        ...data,
        userId: user.uid,
        createdAt: serverTimestamp(),
      });
      toast.success('Fee structure added!');
      reset();
      fetchFees();
    } catch (error) {
      toast.error('Failed to save fee structure');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this fee structure?')) {
      try {
        await deleteDoc(doc(db, 'fee_structure', id));
        toast.success('Deleted successfully');
        fetchFees();
      } catch (error) {
        toast.error('Failed to delete');
      }
    }
  };

  const columns = [
    { field: 'className', headerName: 'Class' },
    { field: 'tuitionFee', headerName: 'Tuition', render: (val) => `$${val}` },
    { field: 'transportFee', headerName: 'Transport', render: (val) => `$${val}` },
    { field: 'uniformFee', headerName: 'Uniform', render: (val) => `$${val}` },
    { field: 'otherFees', headerName: 'Other', render: (val) => `$${val}` },
    { field: 'total', headerName: 'Total', render: (val) => <strong>{val}</strong> },
  ];

  return (
    <div className="page">
      <PageHeader title="Fee Structure" subtitle="Define fee models for different classes" />
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)} className="form" style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>Add New Fee Model</h3>
          <div className="form-grid">
            <Input
              label="Class Name"
              {...register('className')}
              placeholder="e.g., 10th Grade"
              error={errors.className?.message}
              required
            />
            <Input
              label="Tuition Fee"
              type="number"
              {...register('tuitionFee')}
              error={errors.tuitionFee?.message}
              required
            />
            <Input
              label="Transport Fee"
              type="number"
              {...register('transportFee')}
              error={errors.transportFee?.message}
              required
            />
            <Input
              label="Uniform Fee"
              type="number"
              {...register('uniformFee')}
              error={errors.uniformFee?.message}
              required
            />
            <Input
              label="Other Fees"
              type="number"
              {...register('otherFees')}
              error={errors.otherFees?.message}
              required
            />
          </div>
          <div className="form-actions">
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? 'Saving...' : 'Add Fee Structure'}
            </Button>
          </div>
        </form>

        <div className="form">
          <h3 style={{ marginBottom: '20px' }}>Existing Fee Models</h3>
          <DataGrid
            columns={columns}
            rows={fees}
            loading={loading}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};
