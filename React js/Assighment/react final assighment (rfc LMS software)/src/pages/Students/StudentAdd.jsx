import React, { useState } from 'react';
import { Box, Paper, Grid } from '@mui/material';
import PageHeader from '../../components/Common/PageHeader';
import MyInput from '../../components/Common/Input';
import MySelect from '../../components/Common/Select';
import MyButton from '../../components/Common/Button';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const StudentAdd = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        class: '',
        gender: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "students"), formData);
            alert("Student added successfully!");
            setFormData({ firstName: '', lastName: '', email: '', class: '', gender: '' });
        } catch (e) {
            console.error("Error adding document: ", e);
            alert("Error adding student. Check console.");
        }
    };

    return (
        <Box>
            <PageHeader title="Add Student" subtitle="Register a new student in the system" />
            <Paper sx={{ p: 4 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <MyInput
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MyInput
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <MyInput
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MySelect
                                label="Class"
                                name="class"
                                value={formData.class}
                                onChange={handleChange}
                                options={[
                                    { label: '9th', value: '9th' },
                                    { label: '10th', value: '10th' },
                                    { label: '11th', value: '11th' }
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <MySelect
                                label="Gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                options={[
                                    { label: 'Male', value: 'male' },
                                    { label: 'Female', value: 'female' },
                                    { label: 'Other', value: 'other' }
                                ]}
                            />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 3 }}>
                            <MyButton type="submit" size="large">Submit Registration</MyButton>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
};

export default StudentAdd;
