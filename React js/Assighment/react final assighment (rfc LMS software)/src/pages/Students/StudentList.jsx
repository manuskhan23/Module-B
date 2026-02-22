import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import PageHeader from '../../components/Common/PageHeader';
import MyDataGrid from '../../components/Common/DataGrid';
import MyButton from '../../components/Common/Button';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'First Name', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'class', headerName: 'Class', width: 110 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <MyButton size="small" variant="outlined">Edit</MyButton>
            ),
        },
    ];

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "students"));
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setStudents(data);
            } catch (error) {
                console.error("Error fetching students: ", error);
                // Fallback mock data for demonstration
                setStudents([
                    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', class: '10th' },
                    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', class: '9th' },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
    }, []);

    return (
        <Box>
            <PageHeader
                title="Students"
                subtitle="Manage all registered students"
            />
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <MyButton>Add New Student</MyButton>
            </Box>
            <MyDataGrid rows={students} columns={columns} loading={loading} />
        </Box>
    );
};

export default StudentList;
