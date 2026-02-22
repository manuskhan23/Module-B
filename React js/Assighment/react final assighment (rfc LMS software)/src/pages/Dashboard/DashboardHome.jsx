import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import PageHeader from '../../components/Common/PageHeader';
import {
    People as PeopleIcon,
    School as SchoolIcon,
    Book as BookIcon,
    Class as ClassIcon
} from '@mui/icons-material';

const StatCard = ({ title, count, icon, color }) => (
    <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', backgroundColor: color, color: 'white' }}>
        <Box sx={{ mr: 2 }}>{icon}</Box>
        <Box>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="h4">{count}</Typography>
        </Box>
    </Paper>
);

const DashboardHome = () => {
    const stats = [
        { title: 'Students', count: '1,250', icon: <PeopleIcon fontSize="large" />, color: '#005F02' },
        { title: 'Teachers', count: '45', icon: <SchoolIcon fontSize="large" />, color: '#427A43' },
        { title: 'Subjects', count: '12', icon: <BookIcon fontSize="large" />, color: '#C0B87A' },
        { title: 'Classes', count: '20', icon: <ClassIcon fontSize="large" />, color: '#427A43' },
    ];

    return (
        <Box>
            <PageHeader title="LMS Dashboard" subtitle="Overview of your school system" />
            <Grid container spacing={3}>
                {stats.map((stat) => (
                    <Grid item xs={12} sm={6} md={3} key={stat.title}>
                        <StatCard {...stat} />
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ mt: 5 }}>
                <Typography variant="h5" gutterBottom>Recent Activity</Typography>
                <Paper sx={{ p: 3 }}>
                    <Typography color="textSecondary">No recent activity found.</Typography>
                </Paper>
            </Box>
        </Box>
    );
};

export default DashboardHome;
