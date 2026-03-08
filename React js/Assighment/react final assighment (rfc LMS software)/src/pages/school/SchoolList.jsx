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

export const SchoolList = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) fetchSchools();
    }, [user]);

    const fetchSchools = async () => {
        setLoading(true);
        try {
            const q = query(
                collection(db, 'schools'),
                where('userId', '==', user.uid)
            );
            const querySnapshot = await getDocs(q);
            const schoolsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })).sort((a, b) => (b.createdAt?.toDate?.() || 0) - (a.createdAt?.toDate?.() || 0));
            setSchools(schoolsData);
        } catch (error) {
            toast.error('Error fetching schools: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this school?')) {
            try {
                await deleteDoc(doc(db, 'schools', id));
                toast.success('School deleted successfully');
                fetchSchools();
            } catch (error) {
                toast.error('Failed to delete school: ' + error.message);
            }
        }
    };

    const columns = [
        { field: 'schoolName', headerName: 'School Name' },
        { field: 'principalName', headerName: 'Principal' },
        { field: 'phone', headerName: 'Phone' },
        { field: 'email', headerName: 'Email' },
        { field: 'city', headerName: 'City' },
        { field: 'affiliation', headerName: 'Affiliation' },
    ];

    return (
        <div className="page">
            <PageHeader
                title="School List"
                subtitle="View and manage registered schools"
                actions={
                    <Button
                        variant="primary"
                        onClick={() => navigate('/school/add')}
                    >
                        <FiPlus /> Register School
                    </Button>
                }
            />
            <div className="page-content">
                <DataGrid
                    columns={columns}
                    rows={schools}
                    loading={loading}
                    onEdit={(school) => navigate(`/school/edit/${school.id}`)}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};
