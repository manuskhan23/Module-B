import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/Slices/AddtoCardSlice';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import {
    Box,
    Typography,
    Container,
    Paper,
    Grid,
    TextField,
    Button,
    Divider,
    IconButton,
    InputAdornment,
    Fade,
    Zoom,
    Stack
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function Checkout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.AddtoCardSlice);
    const [paymentMethod, setPaymentMethod] = useState('card');

    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

    const handlePayment = (e) => {
        e.preventDefault();
        toast.info('🚀 Authorizing payment...', { autoClose: 1500 });

        setTimeout(() => {
            dispatch(clearCart());
            toast.success('🎉 Transaction Successful! Your order is on the way.');
            navigate('/product');
        }, 2500);
    };

    if (cart.length === 0) {
        return (
            <>
                <Navbar />
                <Container sx={{ mt: 10, textAlign: 'center' }}>
                    <Typography variant="h4" color="textSecondary">Cart is empty</Typography>
                    <Button variant="contained" sx={{ mt: 3, borderRadius: '25px', px: 4 }} onClick={() => navigate('/product')}>Return to Shop</Button>
                </Container>
            </>
        );
    }

    return (
        <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 8 }}>
            <Navbar />
            <Container maxWidth="md" sx={{ py: 6 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                    <IconButton onClick={() => navigate('/cart')} sx={{ mr: 2, bgcolor: 'white', boxShadow: 1, '&:hover': { bgcolor: '#f0f0f0' } }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-1px' }}>Complete Purchase</Typography>
                </Box>

                <Stack spacing={4}>
                    {/* SECTION 1: TOP - Order Review (Full Width) */}
                    <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 6, boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: 4, height: 24, bgcolor: 'primary.main', borderRadius: 4, mr: 1.5 }} />
                            Step 1: Review Order Items ({totalQuantity})
                        </Typography>

                        <Grid container spacing={3}>
                            {cart.map((item) => (
                                <Grid item xs={12} sm={6} key={item.id}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        p: 2,
                                        borderRadius: 4,
                                        bgcolor: '#fff',
                                        border: '1px solid #f1f5f9',
                                        '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }
                                    }}>
                                        <Box sx={{ width: 60, height: 60, bgcolor: '#f8fafc', borderRadius: 3, p: 1, mr: 2, display: 'flex', alignItems: 'center' }}>
                                            <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                        </Box>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>{item.title.slice(0, 25)}...</Typography>
                                            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                                                ${item.price} x {item.quantity}
                                            </Typography>
                                        </Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'primary.main' }}>
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        <Divider sx={{ my: 4, borderStyle: 'dashed' }} />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Box sx={{ width: { xs: '100%', sm: '300px' } }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography color="textSecondary">Subtotal</Typography>
                                    <Typography sx={{ fontWeight: 600 }}>${totalAmount.toFixed(2)}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography color="textSecondary">Shipping</Typography>
                                    <Typography color="success.main" sx={{ fontWeight: 700 }}>FREE</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2, bgcolor: 'primary.main', borderRadius: 3, color: 'white' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Total Payable</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 800 }}>${totalAmount.toFixed(2)}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>

                    {/* SECTION 2: BOTTOM - Payment Selection & Form (Full Width) */}
                    <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 6, boxShadow: '0 10px 40px rgba(0,0,0,0.03)', border: '1px solid #edf2f7' }}>
                        <Typography variant="h6" sx={{ mb: 4, fontWeight: 700, display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: 4, height: 24, bgcolor: 'primary.main', borderRadius: 4, mr: 1.5 }} />
                            Step 2: Payment Method
                        </Typography>

                        <Grid container spacing={2} sx={{ mb: 5 }}>
                            {[
                                { id: 'card', label: 'Credit Card', icon: <CreditCardIcon />, img: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' },
                                { id: 'paypal', label: 'PayPal', icon: <AccountBalanceWalletIcon />, img: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg' },
                                { id: 'cod', label: 'Cash on Delivery', icon: <LocalShippingIcon /> }
                            ].map((method) => (
                                <Grid item xs={12} sm={4} key={method.id}>
                                    <Box
                                        onClick={() => setPaymentMethod(method.id)}
                                        sx={{
                                            p: 3,
                                            borderRadius: 5,
                                            border: '2px solid',
                                            borderColor: paymentMethod === method.id ? 'primary.main' : '#f1f5f9',
                                            bgcolor: paymentMethod === method.id ? 'primary.50' : 'white',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            transition: 'all 0.3s ease',
                                            transform: paymentMethod === method.id ? 'translateY(-4px)' : 'none',
                                            boxShadow: paymentMethod === method.id ? '0 12px 24px rgba(25, 118, 210, 0.12)' : 'none',
                                            position: 'relative'
                                        }}
                                    >
                                        {paymentMethod === method.id && (
                                            <CheckCircleIcon sx={{ position: 'absolute', top: 12, right: 12, color: 'primary.main', fontSize: '1.2rem' }} />
                                        )}
                                        <Box sx={{ mb: 1, color: paymentMethod === method.id ? 'primary.main' : 'text.disabled' }}>
                                            {method.icon}
                                        </Box>
                                        <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: paymentMethod === method.id ? 'primary.main' : 'text.primary' }}>
                                            {method.label}
                                        </Typography>
                                        {method.img && <img src={method.img} height="12" alt="" style={{ marginTop: 8, filter: paymentMethod === method.id ? 'none' : 'grayscale(1)' }} />}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>

                        <form onSubmit={handlePayment}>
                            {/* Card Form - 4 Inputs */}
                            <Zoom in={paymentMethod === 'card'} unmountOnExit>
                                <Box sx={{ p: 3, bgcolor: '#f8fafc', borderRadius: 5 }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Card Number"
                                                placeholder="xxxx xxxx xxxx xxxx"
                                                required
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CreditCardIcon sx={{ color: 'text.secondary' }} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField fullWidth label="Card Holder" placeholder="Name on card" required />
                                        </Grid>
                                        <Grid item xs={6} sm={6}>
                                            <TextField fullWidth label="Expiry Date" placeholder="MM/YY" required />
                                        </Grid>
                                        <Grid item xs={6} sm={6}>
                                            <TextField fullWidth label="Secure CVV" placeholder="***" type="password" required />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </Zoom>

                            <Fade in={paymentMethod === 'paypal'} unmountOnExit>
                                <Box sx={{ textAlign: 'center', py: 5, bgcolor: '#fdfdff', borderRadius: 5, border: '2px dashed #e2e8f0' }}>
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" height="35" alt="Paypal" />
                                    <Typography sx={{ mt: 2, color: 'text.secondary', fontWeight: 500 }}>
                                        Redirecting secure payment to PayPal portal...
                                    </Typography>
                                </Box>
                            </Fade>

                            <Fade in={paymentMethod === 'cod'} unmountOnExit>
                                <Box sx={{ p: 4, bgcolor: '#f0fff4', borderRadius: 5, border: '1px solid #c6f6d5', display: 'flex', alignItems: 'center' }}>
                                    <LocalShippingIcon sx={{ fontSize: 40, color: '#2f855a', mr: 3 }} />
                                    <Box>
                                        <Typography variant="subtitle1" sx={{ color: '#276749', fontWeight: 700 }}>Cash on Delivery</Typography>
                                        <Typography variant="body2" sx={{ color: '#2f855a' }}>Pay at your doorstep when the items are delivered.</Typography>
                                    </Box>
                                </Box>
                            </Fade>

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{
                                    mt: 6,
                                    py: 2.5,
                                    borderRadius: 4,
                                    fontWeight: 800,
                                    fontSize: '1.15rem',
                                    textTransform: 'none',
                                    bgcolor: 'primary.main',
                                    boxShadow: '0 12px 24px rgba(25, 118, 210, 0.25)',
                                    '&:hover': { bgcolor: 'primary.dark', transform: 'translateY(-2px)' }
                                }}
                            >
                                Confirm Payment (${totalAmount.toFixed(2)})
                            </Button>
                        </form>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
}

export default Checkout;
