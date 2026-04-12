import { Box, Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BarChartIcon from "@mui/icons-material/BarChart";
import PersonIcon from "@mui/icons-material/Person";
import DashboardNavbar from "../../components/DashboardNavbar";
import { branchManagerService } from "../../utils/branchManagerService";
import { branchService } from "../../utils/branchService";
import { productService } from "../../utils/productService";
import { employeeService } from "../../utils/employeeService";
import { inventoryService } from "../../utils/inventoryService";
import { offerService } from "../../utils/offerService";
import { reviewService } from "../../utils/reviewService";
import { orderService } from "../../utils/orderService";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [managersCount, setManagersCount] = useState(0);
  const [branchesCount, setBranchesCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [employeesCount, setEmployeesCount] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);

  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [activeOffers, setActiveOffers] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const [managers, branches, products, employees, inventory, offers, reviews, orders] = await Promise.all([
        branchManagerService.getAllManagers(),
        branchService.getAllBranches(),
        productService.getAllProducts(),
        employeeService.getAllEmployees(),
        inventoryService.getAllInventory(),
        offerService?.getAllOffers ? offerService.getAllOffers() : [],
        reviewService.getAllReviews(),
        orderService.getAllOrders()
      ]);
      
      setManagersCount(managers.length);
      setBranchesCount(branches.length);
      setProductsCount(products.length);
      setEmployeesCount(employees.length);
      setInventoryCount(inventory.length);
      setActiveOffers(offers.length || 0);
      setTotalOrders(orders.length);

      // Aggregate global profit from all branches
      const totalProfitCalc = branches.reduce((sum, b) => sum + (Number(b.totalProfit || 0)), 0);
      setTotalRevenue(totalProfitCalc);

      // Aggregate Reviews
      if (reviews.length > 0) {
        const ratingCalc = reviews.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / reviews.length;
        setAvgRating(ratingCalc.toFixed(1));
      } else {
        setAvgRating(0);
      }
    } catch (error) {
      console.error("Error fetching admin counts:", error);
    }
  };

  const stats = [
    { icon: BarChartIcon, label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, color: "#2e7d32", path: "/admin/dashboard" },
    { icon: StorefrontIcon, label: "Total Branches", value: branchesCount, color: "#1b5e20", path: "/admin/branches" },
    { icon: LocalShippingIcon, label: "Active Products", value: productsCount, color: "#43a047", path: "/admin/products" },
    { icon: GroupIcon, label: "Employees", value: employeesCount, color: "#2e7d32", path: "/admin/employees" },
    { icon: PersonIcon, label: "Branch Managers", value: managersCount, color: "#1b5e20", path: "/admin/managers" },
    { icon: InventoryIcon, label: "Inventory Items", value: inventoryCount, color: "#43a047", path: "/admin/inventory" },
    { icon: LocalOfferIcon, label: "Active Offers", value: activeOffers, color: "#2e7d32", path: "/admin/offers" }
  ];

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f4f0" }}>
      <DashboardNavbar role="admin" />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: "900", mb: 1, color: '#1b5e20' }}>
              Network Intelligence
            </Typography>
            <Typography variant="h6" color="textSecondary">
              Real-time synchronization across your entire franchise empire.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {stats.map((stat, idx) => {
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
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box>
                          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                            {stat.label}
                          </Typography>
                          <Typography variant="h4" sx={{ color: stat.color, fontWeight: "bold" }}>
                            {stat.value}
                          </Typography>
                        </Box>
                        <Icon sx={{ fontSize: 40, color: stat.color, opacity: 0.7 }} />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Quick Actions */}
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                Quick Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ p: 2, backgroundColor: "#e8f5e9", borderRadius: 3, border: '1px solid #c8e6c9' }}>
                    <Typography variant="body2" color="textSecondary">Global Revenue</Typography>
                    <Typography variant="h5" sx={{ color: "#2e7d32", fontWeight: "bold" }}>${totalRevenue.toLocaleString()}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ p: 2, backgroundColor: "#e8f5e9", borderRadius: 3, border: '1px solid #c8e6c9' }}>
                    <Typography variant="body2" color="textSecondary">Network Orders</Typography>
                    <Typography variant="h5" sx={{ color: "#2e7d32", fontWeight: "bold" }}>{totalOrders}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Box sx={{ p: 2, backgroundColor: "#e8f5e9", borderRadius: 3, border: '1px solid #c8e6c9' }}>
                    <Typography variant="body2" color="textSecondary">Community Rating</Typography>
                    <Typography variant="h5" sx={{ color: "#2e7d32", fontWeight: "bold" }}>{avgRating} / 5.0</Typography>
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
