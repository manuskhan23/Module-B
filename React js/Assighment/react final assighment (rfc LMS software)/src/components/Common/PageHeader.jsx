import React from 'react';
import { Typography, Box, Divider } from '@mui/material';

const PageHeader = ({ title, subtitle }) => {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom color="primary">
                {title}
            </Typography>
            {subtitle && (
                <Typography variant="subtitle1" color="textSecondary">
                    {subtitle}
                </Typography>
            )}
            <Divider sx={{ mt: 2 }} />
        </Box>
    );
};

export default PageHeader;
