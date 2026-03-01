import React, { useState } from 'react';
import { PageHeader } from '../../components/PageHeader';
import { DataGrid } from '../../components/DataGrid';
import { Button } from '../../components/Button';
import '../../styles/pages.css';

export const FeeStructure = () => {
  const [fees, setFees] = useState([
    { id: 1, class: '10-A', tuition: 5000, transport: 2000, uniform: 1500, total: 8500 },
    { id: 2, class: '10-B', tuition: 5000, transport: 2000, uniform: 1500, total: 8500 },
    { id: 3, class: '12-A', tuition: 6000, transport: 2000, uniform: 1500, total: 9500 },
  ]);

  const columns = [
    { field: 'class', headerName: 'Class' },
    { field: 'tuition', headerName: 'Tuition Fee' },
    { field: 'transport', headerName: 'Transport Fee' },
    { field: 'uniform', headerName: 'Uniform Fee' },
    { field: 'total', headerName: 'Total', render: (val) => `₹${val}` },
  ];

  return (
    <div className="page">
      <PageHeader 
        title="Fee Structure"
        subtitle="Manage fee structure"
      />
      <div className="page-content">
        <DataGrid columns={columns} rows={fees} />
      </div>
    </div>
  );
};
