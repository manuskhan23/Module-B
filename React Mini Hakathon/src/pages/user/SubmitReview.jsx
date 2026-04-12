import { Box, Container, TextField, Button, Typography, Paper, Rating, Grid, MenuItem, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../../components/DashboardNavbar";
import { branchService } from "../../utils/branchService";
import { reviewService } from "../../utils/reviewService";
import RateReviewIcon from "@mui/icons-material/RateReview";

export default function SubmitReview() {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    branchId: "",
    rating: 0,
    comment: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setFetching(true);
      const data = await branchService.getAllBranches();
      setBranches(data);
    } catch (error) {
      toast.error("Failed to load branches");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.branchId) {
      toast.error("Please select a branch first");
      return;
    }
    if (!formData.rating || formData.rating === 0) {
      toast.error("Please provide a star rating");
      return;
    }
    if (!formData.comment.trim()) {
      toast.error("Please write a short comment about your experience");
      return;
    }

    try {
      setLoading(true);
      const uid = localStorage.getItem("userUID");
      const uName = localStorage.getItem("userName");
      
      // More robust branch name finding to ensure name is never missing
      const selectedBranch = branches.find(b => String(b.id) === String(formData.branchId));
      const branchName = (selectedBranch && selectedBranch.name) ? selectedBranch.name : "Franchise Store";

      await reviewService.addReview({
        userId: uid,
        userName: uName,
        branchId: formData.branchId,
        branchName: branchName,
        rating: formData.rating,
        comment: formData.comment.trim(),
        createdAt: new Date().toISOString()
      });

      toast.success("Thank you for your review!");
      navigate("/user/dashboard");
    } catch (error) {
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8faff" }}>
      <DashboardNavbar role="user" />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="md">
          <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 6, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)' }}>
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Box sx={{ 
                display: 'inline-flex', 
                p: 2, 
                bgcolor: '#e8f5e9', 
                borderRadius: '50%', 
                color: '#2e7d32',
                mb: 2
              }}>
                <RateReviewIcon fontSize="large" />
              </Box>
              <Typography variant="h4" fontWeight="900" sx={{ color: '#1a1a2e', mb: 1 }}>
                Share Your Experience
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Your feedback helps us improve and helps others make better choices.
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Select Branch to Review"
                    name="branchId"
                    value={formData.branchId}
                    onChange={handleChange}
                    disabled={fetching}
                    sx={{
                      '& .MuiOutlinedInput-root': { borderRadius: 3 }
                    }}
                  >
                    {branches.map((b) => (
                      <MenuItem key={b.id} value={b.id}>
                        {b.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                    How would you rate it?
                  </Typography>
                  <Rating
                    size="large"
                    name="rating"
                    value={formData.rating}
                    onChange={handleRatingChange}
                    sx={{ 
                      fontSize: '3rem',
                      color: '#2e7d32'
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="What did you think of the product?"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    placeholder="Tell us about the quality, taste, or your overall satisfaction..."
                    sx={{
                      '& .MuiOutlinedInput-root': { borderRadius: 4 }
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading || fetching}
                    sx={{ 
                      py: 2, 
                      borderRadius: 4, 
                      bgcolor: '#2e7d32',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      textTransform: 'none',
                      boxShadow: '0 10px 20px rgba(46, 125, 50, 0.2)',
                      '&:hover': { bgcolor: '#1b5e20' }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Review Now"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
