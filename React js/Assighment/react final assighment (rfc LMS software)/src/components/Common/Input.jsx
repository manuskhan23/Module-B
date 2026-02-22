import React from 'react';
import { TextField } from '@mui/material';

const MyInput = ({ label, ...props }) => {
    return (
        <TextField
            fullWidth
            label={label}
            variant="outlined"
            margin="normal"
            {...props}
        />
    );
};

export default MyInput;
