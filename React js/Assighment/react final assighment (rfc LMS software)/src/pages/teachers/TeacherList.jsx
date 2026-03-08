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

export const TeacherList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchTeachers();
  }, [user]);

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'teachers'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const teachersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => {
        // Sort by createdAt (Firestore Timestamp or Date or Number)
        const dateA = a.createdAt?.toDate?.() || (a.createdAt ? new Date(a.createdAt) : 0);
        const dateB = b.createdAt?.toDate?.() || (b.createdAt ? new Date(b.createdAt) : 0);
        return dateB - dateA;
      });
      setTeachers(teachersData);
    } catch (error) {
      toast.error('Error fetching teachers: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      try {
        await deleteDoc(doc(db, 'teachers', id));
        toast.success('Teacher deleted successfully');
        fetchTeachers();
      } catch (error) {
        toast.error('Failed to delete teacher: ' + error.message);
      }
    }
  };

  const columns = [
    { field: 'name', headerName: 'Full Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'subject', headerName: 'Subject' },
    { field: 'phone', headerName: 'Phone' },
    { field: 'qualification', headerName: 'Qualification' },
  ];

  return (
    <div className="page">
      <PageHeader
        title="Teachers List"
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
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
