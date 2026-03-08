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

export const ExamSchedule = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchExams();
  }, [user]);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'exams'),
        where('userId', '==', user.uid)
      );
      const querySnapshot = await getDocs(q);
      const examsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0));
      setExams(examsData);
    } catch (error) {
      toast.error('Error fetching exam schedule: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this exam schedule?')) {
      try {
        await deleteDoc(doc(db, 'exams', id));
        toast.success('Exam schedule deleted successfully');
        fetchExams();
      } catch (error) {
        toast.error('Failed to delete schedule: ' + error.message);
      }
    }
  };

  const columns = [
    { field: 'examName', headerName: 'Exam' },
    { field: 'subjectName', headerName: 'Subject' },
    { field: 'className', headerName: 'Class' },
    { field: 'examDate', headerName: 'Date' },
    { field: 'startTime', headerName: 'Start' },
    { field: 'endTime', headerName: 'End' },
    { field: 'roomNumber', headerName: 'Room' },
  ];

  return (
    <div className="page">
      <PageHeader
        title="Exam Schedule"
        subtitle="Manage exam schedules for all classes"
        actions={
          <Button
            variant="primary"
            onClick={() => navigate('/exams/add')}
          >
            <FiPlus /> Schedule Exam
          </Button>
        }
      />
      <div className="page-content">
        <DataGrid
          columns={columns}
          rows={exams}
          loading={loading}
          onEdit={(exam) => navigate(`/exams/edit/${exam.id}`)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};
