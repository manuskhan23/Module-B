import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { PageHeader } from '../../components/PageHeader';
import { DataGrid } from '../../components/DataGrid';
import { Button } from '../../components/Button';
import '../../styles/pages.css';

export const SubjectList = () => {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const mockData = [
        { id: 1, name: 'Mathematics', code: 'MTH101', teacher: 'Mr. Smith', credits: 4 },
        { id: 2, name: 'English', code: 'ENG101', teacher: 'Ms. Johnson', credits: 3 },
        { id: 3, name: 'Science', code: 'SCI101', teacher: 'Dr. Brown', credits: 4 },
      ];
      setSubjects(mockData);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'code', headerName: 'Code' },
    { field: 'name', headerName: 'Subject' },
    { field: 'teacher', headerName: 'Teacher' },
    { field: 'credits', headerName: 'Credits' },
  ];

  return (
    <div className="page">
      <PageHeader 
        title="Subjects"
        subtitle="Manage subjects"
        actions={
          <Button 
            variant="primary" 
            onClick={() => navigate('/subjects/add')}
          >
            <FiPlus /> Add Subject
          </Button>
        }
      />
      <div className="page-content">
        <DataGrid columns={columns} rows={subjects} loading={loading} />
      </div>
    </div>
  );
};
