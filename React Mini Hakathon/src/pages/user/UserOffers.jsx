import { Box, Container, Grid, Card, CardContent, Typography, Button, CircularProgress, Chip, Paper } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar";
import { offerService } from "../../utils/offerService";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

export default function UserOffers() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const data = await offerService.getAllOffers();
      setOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8faff" }}>
      <DashboardNavbar role="user" />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 6, textAlign: "center" }}>
            <Typography variant="h3" fontWeight="900" sx={{ mb: 2, color: "#2e7d32" }}>
              Exclusive Deals & Discounts
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ maxWidth: 700, mx: "auto" }}>
              Save more on your favorite franchise items. Hand-picked offers just for you!
            </Typography>
          </Box>

          {loading ? (
             <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress color="success" />
             </Box>
          ) : offers.length > 0 ? (
            <Grid container spacing={4}>
              {offers.map((offer) => (
                <Grid item xs={12} md={6} key={offer.id}>
                  <Card
                    sx={{
                      height: '100%',
                      background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                      color: '#fff',
                      borderRadius: 6,
                      position: 'relative',
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px -10px rgba(46, 125, 50, 0.3)',
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'translateY(-10px)' }
                    }}
                  >
                    <Box sx={{ p: { xs: 3, md: 5 }, position: 'relative', zIndex: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                           <Chip 
                              icon={<TrendingUpIcon sx={{ color: '#fff !important' }} />}
                              label="FLASH SALE" 
                              sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.3)' }} 
                           />
                           <LocalOfferIcon sx={{ fontSize: 40, opacity: 0.8 }} />
                        </Box>

                        <Typography variant="h2" fontWeight="900" sx={{ mb: 1, letterSpacing: -1 }}>
                           {offer.discount}% OFF
                        </Typography>
                        
                        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2, textTransform: 'uppercase', letterSpacing: 1 }}>
                           {offer.productName || "Special Bundle"}
                        </Typography>

                        <Typography variant="body1" sx={{ mb: 4, opacity: 0.9, lineHeight: 1.6 }}>
                           {offer.description || "Grab this amazing deal before it expires!"}
                        </Typography>

                        <Button
                           variant="contained"
                           onClick={() => navigate("/user/products")}
                           sx={{ 
                              bgcolor: "#fff", 
                              color: "#2e7d32", 
                              fontWeight: "900", 
                              px: 4, 
                              py: 1.5,
                              borderRadius: 3,
                              fontSize: '1rem',
                              '&:hover': { bgcolor: '#f0f0f0', transform: 'scale(1.05)' }
                           }}
                        >
                           ORDER NOW
                        </Button>
                    </Box>
                    <Box sx={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.08 }}>
                        <ShoppingCartIcon sx={{ fontSize: 240 }} />
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 6 }}>
               <Typography variant="h5" color="textSecondary">
                  No active offers at the moment. Check back soon for exciting deals!
               </Typography>
            </Paper>
          )}
        </Container>
      </Box>
    </Box>
  );
}
