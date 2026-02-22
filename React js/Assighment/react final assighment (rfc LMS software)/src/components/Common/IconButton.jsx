import React from 'react';
import { IconButton } from '@mui/material';

const MyIconButton = ({ children, ...props }) => {
    return (
        <IconButton {...props}>
            {children}
        </IconButton>
    );
};

export default MyIconButton;
