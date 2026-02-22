import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Divider } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import MyInput from '../../components/Common/Input';
import MyButton from '../../components/Common/Button';
import { useNavigate, Link } from 'react-router-dom';
import { Google as GoogleIcon } from '@mui/icons-material';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name
            });
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
                    <Typography variant="h4" align="center" gutterBottom color="primary">
                        LMS Signup
                    </Typography>
                    <form onSubmit={handleSignup}>
                        <MyInput
                            label="Full Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <MyInput
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <MyInput
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}
                        <MyButton
                            type="submit"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </MyButton>
                    </form>

                    <Box sx={{ my: 2, display: 'flex', alignItems: 'center' }}>
                        <Divider sx={{ flexGrow: 1 }} />
                        <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>OR</Typography>
                        <Divider sx={{ flexGrow: 1 }} />
                    </Box>

                    <MyButton
                        fullWidth
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleLogin}
                        sx={{ mb: 2 }}
                    >
                        Sign Up with Google
                    </MyButton>

                    <Typography align="center" variant="body2">
                        Already have an account? <Link to="/login" style={{ color: '#005F02', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default Signup;
