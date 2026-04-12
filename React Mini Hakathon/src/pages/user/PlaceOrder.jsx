import { Box, Container, Card, CardContent, TextField, Button, Grid, Typography, CircularProgress, Divider, List, ListItem, ListItemText, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import DashboardNavbar from "../../components/DashboardNavbar";
import { orderService } from "../../utils/orderService";
import { branchService } from "../../utils/branchService";
import StoreIcon from "@mui/icons-material/Store";

export default function PlaceOrder() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    branchId: "",
    paymentMethod: "Cash on Delivery"
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [savedCart, branchesData] = await Promise.all([
        localStorage.getItem("cart"),
        branchService.getAllBranches()
      ]);
      
      if (savedCart) setCart(JSON.parse(savedCart));
      setBranches(branchesData);
    } catch (error) {
       console.error("Error fetching data:", error);
    } finally {
       setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.branchId) {
      toast.error("Please fill in all required fields including the branch");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty. Please add items first.");
      return;
    }

    setSubmitting(true);
    try {
      const uid = localStorage.getItem("userUID") || "guest";
      const totalAmount = calculateTotal();

      const selectedBranch = branches.find(b => b.id === formData.branchId);

      await orderService.placeOrder({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        branchId: formData.branchId,
        branchName: selectedBranch?.name || "Main Branch",
        items: cart,
        totalAmount: totalAmount,
        userId: uid,
        createdAt: new Date().toISOString()
      });

      // Add profit to branch manager
      await branchService.addProfitToBranch(formData.branchId, totalAmount);

      toast.success("Order placed successfully!");
      localStorage.removeItem("cart"); // Clear cart after successful order
      setCart([]);
      setFormData({ name: "", email: "", phone: "", address: "", paymentMethod: "Cash on Delivery" });
      
      setTimeout(() => {
          navigate("/user/orders");
      }, 2000);
    } catch (error) {
      console.error("Order failed:", error);
      toast.error("Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8faff" }}>
      <DashboardNavbar role="user" />
      <Box sx={{ pt: 6, pb: 10 }}>
        <Box sx={{ px: 3, width: "100%" }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
              Checkout
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Review your items and provide delivery details.
            </Typography>
          </Box>

          {cart.length === 0 ? (
            <Card sx={{ textAlign: "center", py: 8 }}>
              <CardContent>
                 <ShoppingCartIcon sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
                 <Typography variant="h5" sx={{ mb: 2 }}>Please first add item into "Add to Cart."</Typography>
                 <Button variant="contained" component={Link} to="/user/products" sx={{ backgroundColor: "#2e7d32", '&:hover': { bgcolor: '#1b5e20' } }}>
                     Go to Products
                 </Button>
              </CardContent>
            </Card>
          ) : (
            <Grid container spacing={3} sx={{ width: "100%" }}>
              {/* Cart Summary Header - Full Width */}
              <Grid item xs={12} sx={{ width: "100%" }}>
                <Card sx={{ width: "100%", borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                   <Box sx={{ p: 2, bgcolor: '#e8f5e9', borderBottom: '1px solid #c8e6c9' }}>
                      <Typography variant="h6" sx={{ fontWeight: "800", color: '#2e7d32' }}>
                        Cart Summary ({cart.map(i => i.quantity).reduce((a, b) => a + b, 0)} items)
                      </Typography>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <List disablePadding>
                      {cart.map((item, idx) => (
                        <Box key={idx}>
                          <ListItem sx={{ px: 0, py: 1.5 }}>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                    {item.name} (x{item.quantity})
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 800, color: "#2e7d32" }}>
                                     ${(Number(item.price) * item.quantity).toFixed(2)}
                                   </Typography>
                                </Box>
                              }
                              secondary={item.category || "Food Item"}
                            />
                          </ListItem>
                          {idx < cart.length - 1 && <Divider />}
                        </Box>
                      ))}
                    </List>
                     <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, p: 2, backgroundColor: "#f1f8e9", borderRadius: 3, border: '1px dashed #2e7d32' }}>
                       <Typography variant="h6" fontWeight="bold">Total Due</Typography>
                       <Typography variant="h5" sx={{ color: "#2e7d32", fontWeight: 900 }}>
                         ${calculateTotal().toFixed(2)}
                       </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Delivery Form - Now also Full Width below the card */}
              <Grid item xs={12} sx={{ width: "100%" }}>
                <Card sx={{ width: "100%", borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ fontWeight: "800", mb: 4, color: '#1a1a2e' }}>
                      Delivery & Payment Details
                    </Typography>
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={3}>
                         <Grid item xs={12}>
                           <TextField
                             fullWidth
                             select
                             label="Pickup/Delivery Branch"
                             name="branchId"
                             value={formData.branchId}
                             onChange={handleChange}
                             required
                             variant="outlined"
                             sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#f1f8e9' } }}
                             helperText="Choose the branch to fulfill your order"
                           >
                              {branches.map((b) => (
                                <MenuItem key={b.id} value={b.id}>
                                  {b.name} - {b.location}
                                </MenuItem>
                              ))}
                           </TextField>
                         </Grid>
                         <Grid item xs={12} sm={6}>
                           <TextField
                             fullWidth
                             label="Full Name"
                             name="name"
                             value={formData.name}
                             onChange={handleChange}
                             required
                             sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                           />
                         </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Phone Number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            select
                            label="Payment Method"
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            SelectProps={{ native: true }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                          >
                            <option value="Cash on Delivery">Cash on Delivery</option>
                            <option value="Online Payment">Online Payment</option>
                            <option value="Card on Delivery">Card on Delivery</option>
                          </TextField>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Delivery Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            required
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            disabled={submitting}
                             sx={{ 
                               background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                               py: 2, 
                               fontSize: "1.2rem", 
                               fontWeight: "900",
                               borderRadius: 3,
                               mt: 2,
                               boxShadow: "0 10px 20px -10px rgba(46, 125, 50, 0.5)",
                               '&:hover': { background: 'linear-gradient(135deg, #1b5e20 0%, #0d3b10 100%)', boxShadow: '0 15px 30px -10px rgba(46, 125, 50, 0.6)' }
                             }}
                          >
                            {submitting ? "Processing..." : `Confirm Order • $${calculateTotal().toFixed(2)}`}
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}
