import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { PageHeader } from '../../components/PageHeader';
import { DataGrid } from '../../components/DataGrid';
import { Button } from '../../components/Button';
import '../../styles/pages.css';

export const SyllabusList = () => {
  const navigate = useNavigate();
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const fetchSyllabus = async () => {
    setLoading(true);
    try {
      const mockData = [
        { id: 1, class: '10-A', subject: 'Mathematics', chapters: 15, releaseDate: '2024-01-10', status: 'Released' },
        { id: 2, class: '10-A', subject: 'English', chapters: 12, releaseDate: '2024-01-12', status: 'Released' },
        { id: 3, class: '12-A', subject: 'Science', chapters: 18, releaseDate: '2024-01-15', status: 'Draft' },
      ];
      setSyllabus(mockData);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'class', headerName: 'Class' },
    { field: 'subject', headerName: 'Subject' },
    { field: 'chapters', headerName: 'Chapters' },
    { field: 'releaseDate', headerName: 'Release Date' },
    { field: 'status', headerName: 'Status', render: (status) => <span className={`badge badge-${status.toLowerCase()}`}>{status}</span> },
  ];

  return (
    <div className="page">
      <PageHeader 
        title="Syllabus"
        subtitle="Manage course syllabus"
        actions={
          <Button 
            variant="primary" 
            onClick={() => navigate('/syllabus/add')}
          >
            <FiPlus /> Create Syllabus
          </Button>
        }
      />
      <div className="page-content">
        <DataGrid columns={columns} rows={syllabus} loading={loading} />
      </div>
    </div>
  );
};
