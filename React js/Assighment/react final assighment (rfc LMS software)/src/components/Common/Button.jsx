import React from 'react';
import { Button } from '@mui/material';

const MyButton = ({ children, variant = "contained", color = "primary", ...props }) => {
    return (
        <Button
            variant={variant}
            color={color}
            {...props}
        >
            {children}
        </Button>
    );
};

export default MyButton;
