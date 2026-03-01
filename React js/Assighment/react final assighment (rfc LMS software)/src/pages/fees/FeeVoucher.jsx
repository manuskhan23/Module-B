import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { DataGrid } from '../../components/DataGrid';
import { Button } from '../../components/Button';
import { FiPrinter } from 'react-icons/fi';
import { toast } from 'react-toastify';
import '../../styles/pages.css';

export const FeeVoucher = () => {
  const [vouchers, setVouchers] = useState([
    { id: 1, voucherNo: 'FEE001', student: 'John Doe', amount: 8500, date: '2024-01-15', status: 'Paid' },
    { id: 2, voucherNo: 'FEE002', student: 'Jane Smith', amount: 8500, date: '2024-01-20', status: 'Pending' },
    { id: 3, voucherNo: 'FEE003', student: 'Bob Johnson', amount: 9500, date: '2024-01-22', status: 'Paid' },
  ]);

  const handlePrint = (voucherId) => {
    toast.info('Opening print preview...');
    window.print();
  };

  const columns = [
    { field: 'voucherNo', headerName: 'Voucher No' },
    { field: 'student', headerName: 'Student' },
    { field: 'amount', headerName: 'Amount', render: (val) => `₹${val}` },
    { field: 'date', headerName: 'Date' },
    { field: 'status', headerName: 'Status', render: (status) => <span className={`badge badge-${status.toLowerCase()}`}>{status}</span> },
  ];

  return (
    <div className="page">
      <PageHeader 
        title="Fee Vouchers"
        subtitle="Print and manage fee vouchers"
        actions={
          <Button variant="primary" onClick={() => handlePrint()}>
            <FiPrinter /> Print Selected
          </Button>
        }
      />
      <div className="page-content">
        <DataGrid columns={columns} rows={vouchers} />
      </div>
    </div>
  );
};
