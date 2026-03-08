import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { DataGrid } from '../../components/DataGrid';
import { Button } from '../../components/Button';
import { FiPrinter } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { db } from '../../config/firebase';
import { collection, query, getDocs, where } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages.css';

export const FeeVoucher = () => {
  const { user } = useAuth();
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchVouchers();
  }, [user]);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'fees'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      setVouchers(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        voucherNo: doc.id.substring(0, 8).toUpperCase()
      })).sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0)));
    } catch (error) {
      toast.error('Error fetching vouchers');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = (voucher) => {
    toast.info(`Opening print preview for ${voucher?.studentName || 'selected'}...`);
    window.print();
  };

  const columns = [
    { field: 'voucherNo', headerName: 'Voucher No' },
    { field: 'studentName', headerName: 'Student' },
    { field: 'feeType', headerName: 'Fee Type' },
    { field: 'amount', headerName: 'Amount', render: (val) => `$${val}` },
    { field: 'dueDate', headerName: 'Due Date' },
    {
      field: 'status',
      headerName: 'Status',
      render: (status) => <span className={`badge badge-${status?.toLowerCase()}`}>{status}</span>
    },
  ];

  return (
    <div className="page">
      <PageHeader
        title="Fee Vouchers"
        subtitle="Manage and print student fee vouchers"
        actions={
          <Button variant="primary" onClick={() => window.print()}>
            <FiPrinter /> Print All
          </Button>
        }
      />
      <div className="page-content">
        <div className="form">
          <DataGrid
            columns={columns}
            rows={vouchers}
            loading={loading}
            onEdit={(row) => handlePrint(row)}
            editIcon={<FiPrinter />}
            editLabel="Print"
          />
        </div>
      </div>
    </div>
  );
};
