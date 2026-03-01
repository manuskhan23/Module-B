import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { PageHeader } from '../../components/PageHeader';
import { DataGrid } from '../../components/DataGrid';
import { Button } from '../../components/Button';
import '../../styles/pages.css';

export const ClassList = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const mockData = [
        { id: 1, name: '10-A', section: 'A', strength: 45, classTeacher: 'Mr. Smith' },
        { id: 2, name: '10-B', section: 'B', strength: 42, classTeacher: 'Ms. Johnson' },
        { id: 3, name: '12-A', section: 'A', strength: 38, classTeacher: 'Mr. Brown' },
      ];
      setClasses(mockData);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: 'name', headerName: 'Class' },
    { field: 'section', headerName: 'Section' },
    { field: 'strength', headerName: 'Strength' },
    { field: 'classTeacher', headerName: 'Class Teacher' },
  ];

  return (
    <div className="page">
      <PageHeader 
        title="Classes"
        subtitle="Manage classes"
        actions={
          <Button 
            variant="primary" 
            onClick={() => navigate('/classes/add')}
          >
            <FiPlus /> Add Class
          </Button>
        }
      />
      <div className="page-content">
        <DataGrid columns={columns} rows={classes} loading={loading} />
      </div>
    </div>
  );
};
