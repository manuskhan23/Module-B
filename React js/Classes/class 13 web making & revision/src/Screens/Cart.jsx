import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearCart, removeItem, incrementQuantity, decrementQuantity } from '../store/Slices/AddtoCardSlice'
import Navbar from '../components/Navbar'
import { toast } from 'react-toastify'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    IconButton,
    Divider,
    Box,
    ButtonGroup
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cart } = useSelector((state) => state.AddtoCardSlice)
    const [open, setOpen] = useState(false)

    // Calculate Total correctly (Price * Quantity)
    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0)

    const handleOpenModal = () => {
        if (cart.length > 0) {
            setOpen(true)
        } else {
            toast.error("Cart is empty!")
        }
    }

    const handleCloseModal = () => {
        setOpen(false)
    }

    const handleFinalCheckout = () => {
        setOpen(false)
        navigate("/checkout")
    }

    return (
        <>
            <Navbar />
            <Box sx={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    Shopping Cart
                </Typography>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px' }}>
                    {cart.map((item) => (
                        <div key={item.id} style={{
                            border: '1px solid #eee',
                            padding: '15px',
                            width: '250px',
                            borderRadius: '12px',
                            position: 'relative',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                            backgroundColor: '#fff'
                        }}>
                            <IconButton
                                size="small"
                                color="error"
                                onClick={() => dispatch(removeItem(item.id))}
                                sx={{ position: 'absolute', top: 8, right: 8 }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>

                            <img src={item.image} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'contain' }} />

                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', height: '3rem', overflow: 'hidden' }}>
                                    {item.title.slice(0, 30)}...
                                </Typography>
                                <Typography variant="h6" color="primary" sx={{ my: 1 }}>
                                    ${item.price}
                                </Typography>

                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                                    <ButtonGroup size="small" aria-label="small button group">
                                        <Button onClick={() => dispatch(decrementQuantity(item.id))}>
                                            <RemoveIcon fontSize="small" />
                                        </Button>
                                        <Button disabled sx={{ color: 'black !important', fontWeight: 'bold' }}>
                                            {item.quantity}
                                        </Button>
                                        <Button onClick={() => dispatch(incrementQuantity(item.id))}>
                                            <AddIcon fontSize="small" />
                                        </Button>
                                    </ButtonGroup>
                                    <Typography variant="body2" color="textSecondary">
                                        Sub: ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        </div>
                    ))}
                </div>

                {cart.length === 0 ? (
                    <Box sx={{ mt: 8, textAlign: 'center' }}>
                        <Typography variant="h5" color="textSecondary">Your cart is empty</Typography>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => navigate("/product")}
                            sx={{ mt: 3, borderRadius: '25px', px: 4 }}
                        >
                            Start Shopping
                        </Button>
                    </Box>
                ) : (
                    <Box sx={{ mt: 6, p: 3, backgroundColor: '#f9f9f9', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="h6">Total Summary</Typography>
                            <Typography color="textSecondary">Items: {totalQuantity} | Total: ${totalAmount.toFixed(2)}</Typography>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                color="success"
                                size="large"
                                onClick={handleOpenModal}
                                sx={{ borderRadius: '25px', px: 4, mr: 2 }}
                            >
                                Proceed to Checkout
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => navigate("/product")}
                                sx={{ borderRadius: '25px', px: 4 }}
                            >
                                Add More
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>

            {/* Checkout Modal */}
            <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="sm">
                <DialogTitle sx={{ fontWeight: 'bold' }}>
                    Review Your Order
                </DialogTitle>
                <DialogContent dividers>
                    <List>
                        {cart.map((item) => (
                            <ListItem
                                key={item.id}
                                sx={{ py: 2 }}
                                secondaryAction={
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                }
                            >
                                <ListItemAvatar sx={{ mr: 2 }}>
                                    <Avatar src={item.image} variant="rounded" sx={{ width: 60, height: 60 }} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.title.slice(0, 40) + '...'}
                                    secondary={
                                        <Typography variant="body2" color="textSecondary">
                                            ${item.price} x {item.quantity}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Box sx={{ px: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography>Total Items:</Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>{totalQuantity}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Total Amount:</Typography>
                            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold' }}>
                                ${totalAmount.toFixed(2)}
                            </Typography>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleCloseModal} color="inherit">Edit Cart</Button>
                    <Button
                        onClick={handleFinalCheckout}
                        variant="contained"
                        color="success"
                        size="large"
                        sx={{ borderRadius: '25px', px: 4 }}
                    >
                        Place Order
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Cart