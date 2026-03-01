import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PageHeader } from '../../components/PageHeader';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Button } from '../../components/Button';
import { DataGrid } from '../../components/DataGrid';
import { toast } from 'react-toastify';
import '../../styles/pages.css';

const schema = yup.object().shape({
  studentId: yup.string().required('Student is required'),
  amount: yup.number().required('Amount is required').positive(),
  feeType: yup.string().required('Fee type is required'),
  paymentMethod: yup.string().required('Payment method is required'),
  transactionId: yup.string().required('Transaction ID is required'),
});

export const FeeSubmission = () => {
  const [submissions, setSubmissions] = useState([
    { id: 1, student: 'John Doe', amount: 5000, feeType: 'Tuition', date: '2024-01-15', status: 'Completed' },
    { id: 2, student: 'Jane Smith', amount: 2000, feeType: 'Transport', date: '2024-01-14', status: 'Completed' },
  ]);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const newSubmission = {
        id: submissions.length + 1,
        student: data.studentId,
        amount: data.amount,
        feeType: data.feeType,
        date: new Date().toISOString().split('T')[0],
        status: 'Completed',
      };
      setSubmissions([...submissions, newSubmission]);
      toast.success('Fee submitted successfully!');
      reset();
    } catch (error) {
      toast.error('Failed to submit fee');
    }
  };

  const columns = [
    { field: 'student', headerName: 'Student' },
    { field: 'amount', headerName: 'Amount', render: (val) => `₹${val}` },
    { field: 'feeType', headerName: 'Fee Type' },
    { field: 'date', headerName: 'Date' },
    { field: 'status', headerName: 'Status', render: (status) => <span className={`badge badge-${status.toLowerCase()}`}>{status}</span> },
  ];

  return (
    <div className="page">
      <PageHeader title="Fee Submission" subtitle="Record student fee payments" />
      <div className="page-content">
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #E5E7EB' }}>
          <h3 style={{ marginBottom: '20px' }}>Add Fee Submission</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-grid">
              <Select
                label="Student"
                {...register('studentId')}
                options={[
                  { value: 'john', label: 'John Doe' },
                  { value: 'jane', label: 'Jane Smith' },
                ]}
                error={errors.studentId?.message}
                required
              />
              <Input
                label="Amount"
                type="number"
                {...register('amount')}
                error={errors.amount?.message}
                required
              />
              <Select
                label="Fee Type"
                {...register('feeType')}
                options={[
                  { value: 'tuition', label: 'Tuition' },
                  { value: 'transport', label: 'Transport' },
                  { value: 'uniform', label: 'Uniform' },
                ]}
                error={errors.feeType?.message}
                required
              />
              <Select
                label="Payment Method"
                {...register('paymentMethod')}
                options={[
                  { value: 'cash', label: 'Cash' },
                  { value: 'online', label: 'Online' },
                  { value: 'cheque', label: 'Cheque' },
                ]}
                error={errors.paymentMethod?.message}
                required
              />
              <Input
                label="Transaction ID"
                {...register('transactionId')}
                error={errors.transactionId?.message}
                required
              />
            </div>
            <div className="form-actions">
              <Button type="submit" variant="primary">Submit Fee</Button>
            </div>
          </form>
        </div>

        <h3 style={{ marginBottom: '16px' }}>Recent Submissions</h3>
        <DataGrid columns={columns} rows={submissions} />
      </div>
    </div>
  );
};
