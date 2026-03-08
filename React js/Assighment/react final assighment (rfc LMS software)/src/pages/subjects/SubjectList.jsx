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

export const SubjectList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchSubjects();
  }, [user]);

  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'subjects'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const subjectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0));
      setSubjects(subjectsData);
    } catch (error) {
      toast.error('Error fetching subjects: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await deleteDoc(doc(db, 'subjects', id));
        toast.success('Subject deleted successfully');
        fetchSubjects();
      } catch (error) {
        toast.error('Failed to delete subject: ' + error.message);
      }
    }
  };

  const columns = [
    { field: 'subjectCode', headerName: 'Code' },
    { field: 'subjectName', headerName: 'Subject' },
    { field: 'teacherName', headerName: 'Teacher' },
    { field: 'credits', headerName: 'Credits' },
  ];

  return (
    <div className="page">
      <PageHeader
        title="Subject List"
        subtitle="Manage all subjects"
        actions={
          <Button
            variant="primary"
            onClick={() => navigate('/subjects/add')}
          >
            <FiPlus /> Create Subject
          </Button>
        }
      />
      <div className="page-content">
        <DataGrid
          columns={columns}
          rows={subjects}
          loading={loading}
          onEdit={(subj) => navigate(`/subjects/edit/${subj.id}`)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
