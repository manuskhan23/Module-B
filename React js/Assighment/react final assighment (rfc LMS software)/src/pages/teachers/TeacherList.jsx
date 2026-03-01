import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { PageHeader } from '../../components/PageHeader';
import { DataGrid } from '../../components/DataGrid';
import { Button } from '../../components/Button';
import { setTeachers, setLoading } from '../../store/slices/teacherSlice';
import '../../styles/pages.css';

export const TeacherList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teachers, loading } = useSelector(state => state.teacher);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    dispatch(setLoading(true));
    try {
      const mockData = [
        { id: 1, name: 'Mr. Smith', email: 'smith@example.com', subject: 'Mathematics', phone: '9876543210', status: 'Active' },
        { id: 2, name: 'Ms. Johnson', email: 'johnson@example.com', subject: 'English', phone: '9876543211', status: 'Active' },
      ];
      dispatch(setTeachers(mockData));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'subject', headerName: 'Subject' },
    { field: 'phone', headerName: 'Phone' },
    { 
      field: 'status', 
      headerName: 'Status',
      render: (status) => <span className={`badge badge-${status.toLowerCase()}`}>{status}</span>
    },
  ];

  return (
    <div className="page">
      <PageHeader 
        title="Teachers"
        subtitle="Manage all teachers"
        actions={
          <Button 
            variant="primary" 
            onClick={() => navigate('/teachers/add')}
          >
            <FiPlus /> Add Teacher
          </Button>
        }
      />
      <div className="page-content">
        <DataGrid 
          columns={columns} 
          rows={teachers}
          loading={loading}
          onEdit={(teacher) => navigate(`/teachers/edit/${teacher.id}`)}
          onDelete={(id) => console.log('Delete:', id)}
        />
      </div>
    </div>
  );
};
