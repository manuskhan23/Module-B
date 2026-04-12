import { Box, Container, Grid, Card, CardContent, Typography, Button, CircularProgress, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import RateReviewIcon from "@mui/icons-material/RateReview";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import DashboardNavbar from "../../components/DashboardNavbar";
import { orderService } from "../../utils/orderService";
import { productService } from "../../utils/productService";
import { offerService } from "../../utils/offerService";
import { reviewService } from "../../utils/reviewService";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { toast } from "react-toastify";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [myOrders, setMyOrders] = useState([]);
  const [myOrdersCount, setMyOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [myReviewsCount, setMyReviewsCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [activeOffers, setActiveOffers] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const uid = localStorage.getItem("userUID");
      const [allOrders, allProducts, allReviews, allOffers] = await Promise.all([
        orderService.getAllOrders(),
        productService.getAllProducts(),
        reviewService.getAllReviews(),
        offerService.getAllOffers()
      ]);
      setActiveOffers(allOffers);

      const userOrders = allOrders.filter(o => String(o.userId) === String(uid));
      const userReviews = allReviews.filter(r => String(r.userId) === String(uid));
      
      setMyOrders(userOrders);
      setMyOrdersCount(userOrders.length);
      setProductsCount(allProducts.length);
      setMyReviewsCount(userReviews.length);
      
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.reduce((sum, item) => sum + (item.quantity || 1), 0));
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const recentOrders = myOrders.slice(-3).reverse();

  const dashboardCards = [
    { icon: ShoppingCartIcon, title: "Place Order", value: cartCount > 0 ? `${cartCount} in Cart` : "Empty Cart", path: "/user/order", color: "#2e7d32" },
    { icon: RestaurantMenuIcon, title: "Browse Menu", value: productsCount || "0", path: "/user/products", color: "#1b5e20" },
    { icon: LocalOfferIcon, title: "Special Offers", value: activeOffers.length || "0", path: "/user/offers", color: "#4caf50" },
    { icon: HistoryIcon, title: "My History", value: myOrdersCount || "0", path: "/user/orders", color: "#8bc34a" },
    { icon: RateReviewIcon, title: "Community Feedback", value: "VIEW ALL", path: "/user/reviews", color: "#cddc39" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "success";
      case "on the way": return "info";
      case "working": return "primary";
      case "cancelled": return "error";
      default: return "warning";
    }
  };

  const calculateStatus = (order) => {
    if (order.status === "cancelled" || order.status === "completed") return order.status;
    const diffInMinutes = Math.floor((new Date() - new Date(order.createdAt)) / 60000);
    if (diffInMinutes >= 30) return "completed";
    if (diffInMinutes >= 20) return "on the way";
    if (diffInMinutes >= 5) return "working";
    return order.status || "pending";
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f4f0" }}>
      <DashboardNavbar role="user" />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: "900", mb: 1, color: "#1b5e20" }}>
              Welcome back, {localStorage.getItem("userName")?.split(" ")[0] || "Customer"}!
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Your personalized portal for perfected flavors and active orders.
            </Typography>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {dashboardCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <Grid item xs={12} sm={6} md={3} key={idx}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      borderRadius: 4,
                      border: "1px solid rgba(255,255,255,0.3)",
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)",
                      "&:hover": { transform: "translateY(-8px)", boxShadow: "0 20px 40px -10px rgba(46, 125, 50, 0.15)" }
                    }}
                    onClick={() => navigate(card.path)}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                        <Icon sx={{ fontSize: 32, color: card.color }} />
                        <Typography variant="h6" sx={{ fontWeight: '800', color: '#1a1a2e' }}>{card.title}</Typography>
                      </Box>
                      <Typography variant="h4" sx={{ color: card.color, fontWeight: "900" }}>
                        {loading && card.title === "Order History" ? "..." : card.value}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Active Offers Section */}
          {activeOffers.length > 0 && (
            <Box sx={{ mb: 6 }}>
              <Typography variant="h5" sx={{ fontWeight: "800", mb: 3, color: "#1a1a2e", display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label="NEW" size="small" sx={{ bgcolor: "#2e7d32", color: "#fff", fontWeight: "bold" }} /> Special Offers & Promotions
              </Typography>
              <Grid container spacing={2}>
                {activeOffers.map((offer) => (
                  <Grid item xs={12} md={6} key={offer.id}>
                    <Card
                      sx={{
                        background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                        color: '#fff',
                        borderRadius: 4,
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 10px 20px rgba(46, 125, 50, 0.2)'
                      }}
                    >
                      <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
                        <Typography variant="h4" fontWeight="900" sx={{ mb: 1 }}>
                          {offer.discount}% OFF
                        </Typography>
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, textTransform: 'uppercase', letterSpacing: 1 }}>
                          {offer.productName || "Product Sale"}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                          {offer.description}
                        </Typography>
                      </CardContent>
                      <Box sx={{ position: 'absolute', right: -20, bottom: -20, opacity: 0.1 }}>
                         <ShoppingCartIcon sx={{ fontSize: 160 }} />
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Recent Orders */}
          <Card sx={{ borderRadius: 4, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.05)", overflow: 'hidden' }}>
            <Box sx={{ p: 3, background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)", color: "#fff" }}>
               <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                History
              </Typography>
            </Box>
            <CardContent>
              {loading ? (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <CircularProgress />
                  <Typography color="textSecondary" sx={{ mt: 2 }}>Loading your orders...</Typography>
                </Box>
              ) : recentOrders.length > 0 ? (
                <Box>
                  {recentOrders.map((order) => (
                    <Box
                      key={order.id}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: 2,
                        borderBottom: "1px solid #eee",
                        "&:last-child": { borderBottom: "none" }
                      }}
                    >
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: "500" }}>
                          {order.items ? order.items[0]?.name : (order.productName || "Unknown Product")}
                          {order.items && order.items.length > 1 && ` + ${order.items.length - 1} more`}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "–"} • 
                          Qty: {order.items ? order.items.reduce((sum, item) => sum + (item.quantity || 1), 0) : (order.quantity || 1)} • 
                          {order.items?.[0]?.branchName || order.branchName || "Main Branch"}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Chip
                          label={calculateStatus(order)}
                          color={getStatusColor(calculateStatus(order))}
                          size="small"
                          sx={{ textTransform: "capitalize", mb: 0.5 }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No orders yet. Place your first order!
                </Typography>
              )}
              <Button
                variant="contained"
                fullWidth
                sx={{ 
                  mt: 3, 
                  py: 1.5, 
                  borderRadius: 2, 
                  bgcolor: '#2e7d32',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
                  '&:hover': { bgcolor: '#1b5e20' }
                }}
                onClick={() => navigate("/user/orders")}
              >
                View All Order History
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}
