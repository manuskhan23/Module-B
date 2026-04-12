import { Box, Container, Card, CardContent, Typography, Button, Chip, CircularProgress, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DashboardNavbar from "../../components/DashboardNavbar";
import { productService } from "../../utils/productService";
import { offerService } from "../../utils/offerService";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

export default function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [activeOffers, setActiveOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({}); // { productId: quantity }

  useEffect(() => {
    fetchProducts();
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const [productsData, offersData] = await Promise.all([
        productService.getAllProducts(),
        offerService.getAllOffers()
      ]);
      setProducts(productsData);
      setActiveOffers(offersData);
      
      // Initialize quantities for all products
      const initialQuantities = {};
      productsData.forEach(p => {
        initialQuantities[p.id] = 1;
      });
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const getDiscountedPrice = (product) => {
    const offer = activeOffers.find(o => o.productIds?.includes(product.id));
    if (!offer) return null;
    const discount = (Number(product.price) * offer.discount) / 100;
    return Number(product.price) - discount;
  };

  const handleQuantityChange = (productId, delta) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }));
  };

  const addToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    const salePrice = getDiscountedPrice(product);
    const finalPrice = salePrice !== null ? salePrice : Number(product.price);
    
    const cartItem = {
      ...product,
      price: finalPrice,
      quantity: quantity,
      totalPrice: finalPrice * quantity
    };

    // Check if product already exists in cart, then update quantity
    const existingIndex = cart.findIndex(item => item.id === product.id);
    let newCart;
    if (existingIndex > -1) {
      newCart = [...cart];
      newCart[existingIndex].quantity += quantity;
      newCart[existingIndex].totalPrice = newCart[existingIndex].price * newCart[existingIndex].quantity;
    } else {
      newCart = [...cart, cartItem];
    }

    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    toast.success(`${product.name} (x${quantity}) added to cart!`);
    
    // Reset quantity input to 1 after adding
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const proceedToOrder = () => {
    if (cart.length === 0) {
      toast.error("Please add items to cart first");
      return;
    }
    navigate("/user/order");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8faff" }}>
      <DashboardNavbar role="user" />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
                Browse Products
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Explore our menu and add items to your order.
              </Typography>
            </Box>
            {cart.length > 0 && (
                <Button variant="contained" color="secondary" onClick={clearCart}>
                    Clear Cart
                </Button>
            )}
          </Box>

          {loading ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <CircularProgress />
              <Typography color="textSecondary" sx={{ mt: 2 }}>Loading products...</Typography>
            </Box>
          ) : products.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <RestaurantMenuIcon sx={{ fontSize: 64, color: "#ccc", mb: 2 }} />
              <Typography variant="h6" color="textSecondary">No products available yet.</Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, width: "100%" }}>
              {products.map((product) => (
                <Box key={product.id} sx={{ width: "265px", flexShrink: 0 }}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 4,
                      border: "none",
                      overflow: "hidden",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)",
                      "&:hover": { boxShadow: "0 20px 40px -10px rgba(102, 126, 234, 0.25)", transform: "translateY(-8px)" }
                    }}
                  >
                    <Box
                      sx={{
                        height: 180,
                        backgroundColor: "#f5f7fa",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        position: "relative"
                      }}
                    >
                      {product.imageUrl ? (
                        <Box
                          component="img"
                          src={product.imageUrl}
                          alt={product.name}
                          sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "0.5s", "&:hover": { transform: "scale(1.1)" } }}
                          onError={(e) => { e.target.style.display = "none"; }}
                        />
                      ) : (
                        <Typography sx={{ fontSize: 60, filter: "drop-shadow(2px 2px 10px rgba(0,0,0,0.1))" }}>🍔</Typography>
                      )}
                      <Box sx={{ position: "absolute", top: 12, left: 12 }}>
                        <Chip
                            label={product.category || "General"}
                            size="small"
                            sx={{ bgcolor: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)", fontWeight: "bold", border: "1px solid rgba(0,0,0,0.1)" }}
                        />
                      </Box>
                    </Box>

                    <CardContent sx={{ p: 3, flex: 1, display: "flex", flexDirection: "column" }}>
                      <Typography variant="h6" sx={{ fontWeight: "800", mb: 2, color: "#1a1a2e" }}>
                        {product.name}
                      </Typography>
                      
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2, gap: 1 }}>
                          <IconButton size="small" onClick={() => handleQuantityChange(product.id, -1)} sx={{ border: "1px solid #ddd" }}>
                              <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ minWidth: "30px", textAlign: "center", fontWeight: "bold" }}>
                              {quantities[product.id] || 1}
                          </Typography>
                          <IconButton size="small" onClick={() => handleQuantityChange(product.id, 1)} sx={{ border: "1px solid #ddd" }}>
                              <AddIcon fontSize="small" />
                          </IconButton>
                      </Box>

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: "auto", pt: 2, borderTop: "1px solid #f0f0f0" }}>
                        <Box>
                            {getDiscountedPrice(product) ? (
                                <>
                                    <Typography variant="caption" sx={{ textDecoration: 'line-through', color: 'text.secondary', display: 'block' }}>
                                        ${Number(product.price).toFixed(2)}
                                    </Typography>
                                    <Typography variant="h5" sx={{ color: "#2e7d32", fontWeight: "900" }}>
                                        ${getDiscountedPrice(product).toFixed(2)}
                                    </Typography>
                                </>
                            ) : (
                                <Typography variant="h5" sx={{ color: "#2e7d32", fontWeight: "900" }}>
                                    ${Number(product.price).toFixed(2)}
                                </Typography>
                            )}
                        </Box>
                        <Button
                          variant="contained"
                          onClick={() => addToCart(product)}
                          sx={{ 
                            background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
                            borderRadius: 2,
                            fontWeight: "bold",
                            px: 3,
                            boxShadow: "0 4px 10px rgba(46, 125, 50, 0.4)"
                          }}
                        >
                          Add
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          )}

          {/* Cart Summary Header */}
          {cart.length > 0 && (
            <Card sx={{ mt: 6, borderRadius: 4, boxShadow: "0 15px 40px -10px rgba(0,0,0,0.1)", overflow: "hidden" }}>
              <Box sx={{ p: 3, background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)", color: "#fff", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Cart Session Details ({cart.map(i => i.quantity).reduce((a, b) => a + b, 0)} items)
                </Typography>
                <Typography variant="h5" fontWeight="900">
                    Total: ${cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
                </Typography>
              </Box>
              <CardContent sx={{ p: 0 }}>
                {cart.map((item, idx) => (
                  <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 3, borderBottom: "1px solid #f0f0f0" }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ p: 1, px: 2, bgcolor: '#e8f5e9', borderRadius: 2, fontWeight: '800', color: '#2e7d32' }}>x{item.quantity}</Box>
                        <Box>
                            <Typography variant="body1" sx={{ fontWeight: "600" }}>{item.name}</Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>{item.category}</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Typography variant="h6" sx={{ color: "#1a1a2e", fontWeight: "800" }}>${item.totalPrice.toFixed(2)}</Typography>
                        <IconButton size="small" color="error" onClick={() => removeFromCart(idx)} sx={{ bgcolor: '#fff1f0' }}><RemoveIcon /></IconButton>
                    </Box>
                  </Box>
                ))}
                <Box sx={{ p: 3 }}>
                    <Button
                    variant="contained"
                    fullWidth
                    sx={{ 
                        py: 2, 
                        fontSize: "1.2rem", 
                        fontWeight: "900", 
                        borderRadius: 3,
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        boxShadow: "0 10px 25px -5px rgba(102, 126, 234, 0.5)",
                        '&:hover': { transform: 'scale(1.01)', boxShadow: "0 15px 30px -5px rgba(102, 126, 234, 0.6)" }
                    }}
                    onClick={proceedToOrder}
                    >
                    Complete Checkout • ${cart.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
                    </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Container>
      </Box>
    </Box>
  );
}
