import { Box, Container, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography, Rating, CircularProgress, Avatar, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import DashboardNavbar from "../../components/DashboardNavbar";
import { reviewService } from "../../utils/reviewService";
import { branchService } from "../../utils/branchService";
import { userProfileService } from "../../utils/userProfileService";
import { toast } from "react-toastify";

const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
};

export default function BranchReviews() {
  const [loading, setLoading] = useState(true);
  const [branchReviews, setBranchReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const uid = localStorage.getItem("userUID");
      const userProfile = await userProfileService.getUserProfile(uid);

      const allBranches = await branchService.getAllBranches();
      let assignedBranch = null;

      if (userProfile?.managerId) {
        assignedBranch = allBranches.find(b => String(b.managerId) === String(userProfile.managerId));
      }
      if (!assignedBranch && userProfile?.branchId) {
        assignedBranch = allBranches.find(b => String(b.id) === String(userProfile.branchId));
      }

      if (!assignedBranch) {
        setBranchReviews([]);
        return;
      }

      const allReviews = await reviewService.getAllReviews();
      const myReviews = allReviews.filter(r => String(r.branchId) === String(assignedBranch.id));
      
      setBranchReviews(myReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load real reviews");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f4f0" }}>
      <DashboardNavbar role="branch_manager" />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: "900", mb: 1, color: "#1b5e20" }}>
              Customer Experience
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Analyze feedback from your verified branch customers.
            </Typography>
          </Box>

          <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <Box sx={{ p: 3, background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)", color: "#fff" }}>
               <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Latest Feedback Wall
              </Typography>
            </Box>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f1f8e9" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Customer</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Rating</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Comment</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                         <CircularProgress />
                         <Typography color="textSecondary" sx={{ mt: 2 }}>Loading verified customer reviews...</Typography>
                      </TableCell>
                    </TableRow>
                  ) : branchReviews.length > 0 ? (
                    branchReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar 
                                    src={review.userPhoto} 
                                    sx={{ bgcolor: stringToColor(review.userName || review.userId || "Guest") }}
                                >
                                    {(review.userName || review.userId || "G")[0].toUpperCase()}
                                </Avatar>
                                <Typography variant="body2" fontWeight="500">
                                    {review.userName || "Guest"}
                                </Typography>
                            </Stack>
                        </TableCell>
                        <TableCell>
                          <Rating 
                            value={Number(review.rating) || 0} 
                            readOnly 
                            size="small" 
                            sx={{ color: '#2e7d32' }}
                          />
                        </TableCell>
                        <TableCell sx={{ maxWidth: 300, fontWeight: '500', color: '#1a1a2e' }}>{review.comment}</TableCell>
                        <TableCell>{review.date}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} sx={{ textAlign: "center", py: 3 }}>
                        No reviews have been submitted for your branch yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}
