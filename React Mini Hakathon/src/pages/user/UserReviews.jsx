import { Box, Container, Grid, Card, CardContent, Typography, Button, CircularProgress, Rating, Avatar, Divider, Chip } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar";
import { reviewService } from "../../utils/reviewService";
import { branchService } from "../../utils/branchService";
import AddIcon from "@mui/icons-material/Add";
import StoreIcon from "@mui/icons-material/Store";

export default function UserReviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const [reviewsData, branchesData] = await Promise.all([
        reviewService.getAllReviews(),
        branchService.getAllBranches()
      ]);
      // Sort by newest first
      const sortedData = reviewsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setReviews(sortedData);
      setBranches(branchesData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const getBranchName = (review) => {
    if (review.branchName) return review.branchName;
    const branch = branches.find(b => String(b.id) === String(review.branchId));
    return branch ? branch.name : "Franchise Store";
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f4f0" }}>
      <DashboardNavbar role="user" />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 6, flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
            <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              <Typography variant="h3" fontWeight="900" sx={{ color: "#1b5e20", mb: 1 }}>
                Community Feedback
              </Typography>
              <Typography variant="h6" color="textSecondary">
                See what others are saying about our franchise branches.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/user/submit-review")}
              sx={{ 
                bgcolor: "#2e7d32", 
                px: 4, 
                py: 1.5, 
                borderRadius: 3, 
                fontWeight: 'bold',
                boxShadow: '0 10px 20px rgba(46, 125, 50, 0.2)',
                '&:hover': { bgcolor: '#1b5e20' }
              }}
            >
              Write a Review
            </Button>
          </Box>

          {loading ? (
             <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                <CircularProgress color="success" />
             </Box>
          ) : reviews.length > 0 ? (
            <Grid container spacing={4}>
              {reviews.map((review) => (
                <Grid item xs={12} md={6} key={review.id}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 6,
                      border: '1px solid rgba(0,0,0,0.05)',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                      transition: 'transform 0.3s ease',
                      '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 15px 40px rgba(0,0,0,0.08)' }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: '#e8f5e9', color: '#2e7d32', fontWeight: 'bold' }}>
                                {review.userName ? review.userName[0].toUpperCase() : 'U'}
                            </Avatar>
                            <Box>
                                <Typography variant="h6" fontWeight="bold">
                                    {review.userName || "Customer"}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                </Typography>
                            </Box>
                        </Box>
                        <Rating value={review.rating} readOnly sx={{ color: '#2e7d32' }} />
                      </Box>
                      
                      <Chip 
                        icon={<StoreIcon sx={{ fontSize: '1rem !important' }} />}
                        label={getBranchName(review)} 
                        size="small"
                        sx={{ mb: 2, bgcolor: '#f1f8e9', color: '#1b5e20', fontWeight: 'bold' }}
                      />

                      <Typography variant="body1" sx={{ color: '#444', fontStyle: 'italic', lineHeight: 1.7 }}>
                        "{review.comment}"
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: 10 }}>
               <Typography variant="h5" color="textSecondary">
                  No reviews yet. Be the first to share your experience!
               </Typography>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}
