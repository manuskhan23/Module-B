import { Box, Container, Grid, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InventoryIcon from "@mui/icons-material/Inventory";
import GroupIcon from "@mui/icons-material/Group";
import RateReviewIcon from "@mui/icons-material/RateReview";
import StorefrontIcon from "@mui/icons-material/Storefront";
import DashboardNavbar from "../../components/DashboardNavbar";
import { branchService } from "../../utils/branchService";
import { employeeService } from "../../utils/employeeService";
import { inventoryService } from "../../utils/inventoryService";
import { reviewService } from "../../utils/reviewService";
import { userProfileService } from "../../utils/userProfileService";
import { orderService } from "../../utils/orderService";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaidIcon from "@mui/icons-material/Paid";
import { toast } from "react-toastify";

export default function BranchDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [branch, setBranch] = useState(null);
  const [statsData, setStatsData] = useState({ employees: 0, inventory: 0, reviews: 0, totalOrders: 0, totalRevenue: 0 });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const uid = localStorage.getItem("userUID");
      const userProfile = await userProfileService.getUserProfile(uid);

      const allBranches = await branchService.getAllBranches();
      let assignedBranch = null;

      // Map branch via managerId matching
      if (userProfile?.managerId) {
        assignedBranch = allBranches.find(b => String(b.managerId) === String(userProfile.managerId));
      }
      
      // Fallback mapping if managerId is missing but branchId exists
      if (!assignedBranch && userProfile?.branchId) {
        assignedBranch = allBranches.find(b => String(b.id) === String(userProfile.branchId));
      }
      
      setBranch(assignedBranch || null);

      if (assignedBranch) {
        const branchIdStr = String(assignedBranch.id);
        const [allEmployees, allInventory, allReviews, allOrders] = await Promise.all([
          employeeService.getAllEmployees(),
          inventoryService.getAllInventory(),
          reviewService.getAllReviews(),
          orderService.getAllOrders()
        ]);

        const myEmployees = allEmployees.filter(e => String(e.branchId) === branchIdStr);
        const myInventory = allInventory.filter(i => String(i.branchId) === branchIdStr);
        const myReviews = allReviews.filter(r => String(r.branchId) === branchIdStr);
        const myOrders = allOrders.filter(o => String(o.branchId) === branchIdStr);
        
        // Get profit from branch data
        const totalProfit = Number(assignedBranch.totalProfit || 0);
        const totalOrdersCount = Number(assignedBranch.totalOrders || 0);

        setStatsData({
          employees: myEmployees.length,
          inventory: myInventory.length,
          reviews: myReviews.length,
          totalOrders: totalOrdersCount,
          totalRevenue: totalProfit
        });
      }
    } catch (error) {
      console.error("Dashboard DB fetch error:", error);
      toast.error("Failed to load realistic dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { icon: PaidIcon, label: "Total Revenue", value: `$${statsData.totalRevenue.toLocaleString()}`, color: "#2e7d32", path: "/branch/dashboard" },
    { icon: ShoppingCartIcon, label: "Total Orders", value: statsData.totalOrders, color: "#1b5e20", path: "/branch/dashboard" },
    { icon: StorefrontIcon, label: "Branch", value: branch?.name || "Unassigned", color: "#43a047", path: "/branch/dashboard" },
    { icon: GroupIcon, label: "Employees", value: statsData.employees, color: "#2e7d32", path: "/branch/employees" },
    { icon: InventoryIcon, label: "Inventory Items", value: statsData.inventory, color: "#1b5e20", path: "/branch/inventory" },
    { icon: RateReviewIcon, label: "Reviews", value: statsData.reviews, color: "#43a047", path: "/branch/reviews" }
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f4f0" }}>
      <DashboardNavbar role="branch_manager" />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: "900", mb: 1, color: '#1b5e20' }}>
              Store Operations Hub
            </Typography>
            <Typography variant="h6" color="textSecondary">
                Precision management for your local franchise performance.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {loading ? (
               <Box sx={{ width: "100%", textAlign: "center", py: 5 }}>
                 <CircularProgress />
                 <Typography sx={{ mt: 2 }} color="textSecondary">Loading real-time branch data...</Typography>
               </Box>
            ) : !branch ? (
               <Typography color="error" sx={{ ml: 3, mt: 2 }}>You are not assigned to a branch yet. Please contact an admin.</Typography>
            ) : stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      transition: "0.3s",
                      "&:hover": { transform: "translateY(-5px)", boxShadow: 4 }
                    }}
                    onClick={() => navigate(stat.path)}
                  >
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Icon sx={{ fontSize: 40, color: stat.color }} />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {stat.label}
                          </Typography>
                          <Typography variant="h5" sx={{ color: stat.color, fontWeight: "bold" }}>
                            {stat.value}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Branch Info */}
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Branch Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ p: 2, backgroundColor: "#e8f5e9", borderRadius: 3, border: '1px solid #c8e6c9' }}>
                    <Typography variant="body2" color="textSecondary">Active Location</Typography>
                    <Typography variant="h6" sx={{ color: "#2e7d32", fontWeight: "bold" }}>
                      {branch?.location || "N/A"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ p: 2, backgroundColor: "#e8f5e9", borderRadius: 3, border: '1px solid #c8e6c9' }}>
                    <Typography variant="body2" color="textSecondary">Live Revenue</Typography>
                    <Typography variant="h6" sx={{ color: "#2e7d32", fontWeight: "bold" }}>
                      ${statsData.totalRevenue?.toLocaleString()}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ p: 2, backgroundColor: "#e8f5e9", borderRadius: 3, border: '1px solid #c8e6c9' }}>
                    <Typography variant="body2" color="textSecondary">Managed By</Typography>
                    <Typography variant="h6" sx={{ color: "#2e7d32", fontWeight: "bold" }}>
                      {localStorage.getItem("userName")}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}
