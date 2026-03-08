import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { PageHeader } from '../../components/PageHeader';
import { DataGrid } from '../../components/DataGrid';
import { Button } from '../../components/Button';
import { toast } from 'react-toastify';
import { db } from '../../config/firebase';
import { collection, query, getDocs, deleteDoc, doc, orderBy, where } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import '../../styles/pages.css';

export const ClassList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchClasses();
  }, [user]);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'classes'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const classesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0));
      setClasses(classesData);
    } catch (error) {
      toast.error('Error fetching classes: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await deleteDoc(doc(db, 'classes', id));
        toast.success('Class deleted successfully');
        fetchClasses();
      } catch (error) {
        toast.error('Failed to delete class: ' + error.message);
      }
    }
  };

  const columns = [
    { field: 'className', headerName: 'Class Name' },
    { field: 'gradeLevel', headerName: 'Grade Level' },
    { field: 'classTeacher', headerName: 'Teacher' },
    { field: 'schedule', headerName: 'Schedule' },
    { field: 'roomNumber', headerName: 'Room' },
    { field: 'capacity', headerName: 'Capacity' },
  ];

  return (
    <div className="page">
      <PageHeader
        title="Class List"
        subtitle="Manage all classes"
        actions={
          <Button
            variant="primary"
            onClick={() => navigate('/classes/add')}
          >
            <FiPlus /> Create Class
          </Button>
        }
      />
      <div className="page-content">
        <DataGrid
          columns={columns}
          rows={classes}
          loading={loading}
          onEdit={(cls) => navigate(`/classes/edit/${cls.id}`)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
