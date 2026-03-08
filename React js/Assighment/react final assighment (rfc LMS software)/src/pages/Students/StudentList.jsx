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

export const StudentList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchStudents();
  }, [user]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'students'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const studentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || (a.createdAt ? new Date(a.createdAt) : 0);
        const dateB = b.createdAt?.toDate?.() || (b.createdAt ? new Date(b.createdAt) : 0);
        return dateB - dateA;
      });
      setStudents(studentsData);
    } catch (error) {
      toast.error('Error fetching students: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteDoc(doc(db, 'students', id));
        toast.success('Student deleted successfully');
        fetchStudents();
      } catch (error) {
        toast.error('Failed to delete student: ' + error.message);
      }
    }
  };

  const columns = [
    { field: 'rollNo', headerName: 'Roll No' },
    { field: 'name', headerName: 'Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'grade', headerName: 'Grade' },
    { field: 'phone', headerName: 'Phone' },
  ];

  return (
    <div className="page">
      <PageHeader
        title="Students"
        subtitle="Manage all students"
        actions={
          <Button
            variant="primary"
            onClick={() => navigate('/students/add')}
          >
            <FiPlus /> Add Student
          </Button>
        }
      />
      <div className="page-content">
        <DataGrid
          columns={columns}
          rows={students}
          loading={loading}
          onEdit={(student) => navigate(`/students/edit/${student.id}`)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
