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
import { collection, addDoc, query, getDocs, serverTimestamp, where } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages.css';

const schema = yup.object().shape({
  studentId: yup.string().required('Student is required'),
  amount: yup.number().typeError('Amount must be a number').required('Amount is required').positive(),
  feeType: yup.string().required('Fee type is required'),
  paymentMethod: yup.string().required('Payment method is required'),
  dueDate: yup.string().required('Due date is required'),
  status: yup.string().required('Status is required'),
});

export const FeeSubmission = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      status: 'Paid',
    }
  });

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Students
      const studentSnap = await getDocs(query(collection(db, 'students'), where('userId', '==', user.uid)));
      setStudents(studentSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        value: doc.id,
        label: doc.data().name
      })));

      // Fetch Submissions
      const q = query(collection(db, 'fees'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      setSubmissions(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0)));
    } catch (error) {
      toast.error('Error fetching data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const studentName = students.find(s => s.value === data.studentId)?.label || '';
      await addDoc(collection(db, 'fees'), {
        ...data,
        userId: user.uid,
        studentName,
        createdAt: serverTimestamp(),
        paymentDate: new Date().toISOString().split('T')[0]
      });
      toast.success('Fee submission recorded!');
      reset();
      fetchData();
    } catch (error) {
      toast.error('Failed to submit fee: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    { field: 'studentName', headerName: 'Student' },
    { field: 'feeType', headerName: 'Fee Type' },
    { field: 'amount', headerName: 'Amount', render: (val) => `$${val}` },
    { field: 'paymentDate', headerName: 'Payment Date' },
    { field: 'dueDate', headerName: 'Due Date' },
    {
      field: 'status',
      headerName: 'Status',
      render: (status) => <span className={`badge badge-${status?.toLowerCase()}`}>{status}</span>
    },
  ];

  return (
    <div className="page">
      <PageHeader title="Fee Submission" subtitle="Record and view student fee payments" />
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)} className="form" style={{ marginBottom: '30px' }}>
          <h3 style={{ marginBottom: '20px' }}>New Fee Record</h3>
          <div className="form-grid">
            <Select
              label="Student"
              {...register('studentId')}
              options={students}
              error={errors.studentId?.message}
              required
            />
            <Select
              label="Fee Type"
              {...register('feeType')}
              options={[
                { value: 'Tuition Fee', label: 'Tuition Fee' },
                { value: 'Library Fee', label: 'Library Fee' },
                { value: 'Laboratory Fee', label: 'Laboratory Fee' },
                { value: 'Transport Fee', label: 'Transport Fee' },
                { value: 'Other', label: 'Other' },
              ]}
              error={errors.feeType?.message}
              required
            />
            <Input
              label="Amount"
              type="number"
              {...register('amount')}
              error={errors.amount?.message}
              required
            />
            <Input
              label="Due Date"
              type="date"
              {...register('dueDate')}
              error={errors.dueDate?.message}
              required
            />
            <Select
              label="Payment Method"
              {...register('paymentMethod')}
              options={[
                { value: 'Cash', label: 'Cash' },
                { value: 'Online', label: 'Online' },
                { value: 'Bank Transfer', label: 'Bank Transfer' },
              ]}
              error={errors.paymentMethod?.message}
              required
            />
            <Select
              label="Status"
              {...register('status')}
              options={[
                { value: 'Paid', label: 'Paid' },
                { value: 'Pending', label: 'Pending' },
              ]}
              error={errors.status?.message}
              required
            />
          </div>
          <div className="form-actions">
            <Button type="submit" variant="primary" disabled={submitting}>
              {submitting ? 'Processing...' : 'Record Payment'}
            </Button>
          </div>
        </form>

        <div className="form">
          <h3 style={{ marginBottom: '20px' }}>Fee History</h3>
          <DataGrid columns={columns} rows={submissions} loading={loading} />
        </div>
      </div>
    </div>
  );
};
