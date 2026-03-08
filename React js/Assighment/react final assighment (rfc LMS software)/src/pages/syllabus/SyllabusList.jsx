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

export const SyllabusList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [syllabus, setSyllabus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchSyllabus();
  }, [user]);

  const fetchSyllabus = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'syllabus'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const syllabusData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0));
      setSyllabus(syllabusData);
    } catch (error) {
      toast.error('Error fetching syllabus: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this syllabus?')) {
      try {
        await deleteDoc(doc(db, 'syllabus', id));
        toast.success('Syllabus deleted successfully');
        fetchSyllabus();
      } catch (error) {
        toast.error('Failed to delete syllabus: ' + error.message);
      }
    }
  };

  const columns = [
    { field: 'subjectName', headerName: 'Subject' },
    { field: 'grade', headerName: 'Grade' },
    { field: 'duration', headerName: 'Duration' },
    { field: 'topics', headerName: 'Topics' },
  ];

  return (
    <div className="page">
      <PageHeader
        title="Syllabus List"
        subtitle="Manage all course syllabus"
        actions={
          <Button
            variant="primary"
            onClick={() => navigate('/syllabus/add')}
          >
            <FiPlus /> Add Syllabus
          </Button>
        }
      />
      <div className="page-content">
        <DataGrid
          columns={columns}
          rows={syllabus}
          loading={loading}
          onEdit={(syl) => navigate(`/syllabus/edit/${syl.id}`)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
