import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';

const SelectWithFirebaseDatabase = ({ label, value, onChange, collectionName, labelField = "name", valueField = "id", ...props }) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, collectionName));
                const data = querySnapshot.docs.map(doc => ({
                    value: doc[valueField] || doc.id,
                    label: doc.data()[labelField]
                }));
                setOptions(data);
            } catch (error) {
                console.error("Error fetching firebase data for select:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionName, labelField, valueField]);

    return (
        <FormControl fullWidth margin="normal">
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label={label}
                onChange={onChange}
                disabled={loading}
                {...props}
            >
                {loading ? (
                    <MenuItem disabled><CircularProgress size={20} sx={{ mr: 1 }} /> Loading...</MenuItem>
                ) : (
                    options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))
                )}
            </Select>
        </FormControl>
    );
};

export default SelectWithFirebaseDatabase;
