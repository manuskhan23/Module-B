import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Button, 
  Typography, 
  IconButton, 
  Tooltip, 
  Avatar, 
  AppBar, 
  Toolbar, 
  useTheme, 
  useMediaQuery, 
  Container, 
  Divider 
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import RateReviewIcon from "@mui/icons-material/RateReview";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PersonIcon from "@mui/icons-material/Person";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HistoryIcon from "@mui/icons-material/History";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

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

const getMenuItems = (role) => {
  const baseItems = [{ label: "Dashboard", icon: DashboardIcon, path: `/${role}/dashboard` }];
  const menuItems = {
    admin: [
      ...baseItems,
      { label: "Branches", icon: StorefrontIcon, path: "/admin/branches" },
      { label: "Products", icon: LocalShippingIcon, path: "/admin/products" },
      { label: "Inventory", icon: InventoryIcon, path: "/admin/inventory" },
      { label: "Employees", icon: GroupIcon, path: "/admin/employees" },
      { label: "Managers", icon: PersonIcon, path: "/admin/managers" },
      { label: "Offers", icon: LocalOfferIcon, path: "/admin/offers" }
    ],
    branch_manager: [
      ...baseItems,
      { label: "Products", icon: RestaurantMenuIcon, path: "/branch/products" },
      { label: "Inventory", icon: InventoryIcon, path: "/branch/inventory" },
      { label: "Employees", icon: GroupIcon, path: "/branch/employees" },
      { label: "Reviews", icon: RateReviewIcon, path: "/branch/reviews" }
    ],
    user: [
      { label: "Dashboard", icon: DashboardIcon, path: "/user/dashboard" },
      { label: "Menu", icon: RestaurantIcon, path: "/user/products" },
      { label: "My Orders", icon: HistoryIcon, path: "/user/orders" },
      { label: "Offers", icon: LocalOfferIcon, path: "/user/offers" },
      { label: "Reviews", icon: FeedbackIcon, path: "/user/reviews" }
    ]
  };
  return menuItems[role] || baseItems;
};

export default function DashboardNavbar({ role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [user, setUser] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuItems = getMenuItems(role);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const NavContent = () => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 3 }, flexDirection: isMobile ? 'column' : 'row', p: isMobile ? 2 : 0 }}>
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Button
            key={item.label}
            onClick={() => {
                navigate(item.path);
                if (isMobile) setDrawerOpen(false);
            }}
            startIcon={<Icon />}
            sx={{
              color: isActive ? "#fff" : "#999",
              fontWeight: isActive ? "bold" : "500",
              borderBottom: !isMobile && isActive ? "2px solid #667eea" : "none",
              borderRadius: isMobile ? 1 : 0,
              width: isMobile ? "100%" : "auto",
              justifyContent: isMobile ? "flex-start" : "center",
              px: 2,
              py: 1,
              "&:hover": { 
                color: "#667eea",
                backgroundColor: isMobile ? "#f5f5f5" : "transparent"
              }
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          background: "rgba(26, 26, 46, 0.95)", 
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: "space-between", height: 80 }}>
            <Typography
              variant="h5"
              noWrap
              sx={{
                fontWeight: 800,
                letterSpacing: ".1rem",
                color: "#667eea",
                textDecoration: "none",
                cursor: "pointer",
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
              onClick={() => navigate("/")}
            >
              <Box component="span" sx={{ bgcolor: "#2e7d32", color: "#fff", p: 1, borderRadius: 1 }}>F</Box>
              Franchise Management System
            </Typography>

            {!isMobile && <NavContent />}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {!isMobile && (
                <Box sx={{ textAlign: "right", mr: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: "bold", color: "#fff" }}>
                    {user?.displayName || localStorage.getItem("userName") || "Welcome Member"}
                  </Typography>
                </Box>
              )}
              
              <Tooltip title="Account settings">
                <Avatar 
                  src={user?.photoURL} 
                  sx={{ 
                    bgcolor: user?.displayName ? stringToColor(user.displayName) : '#667eea',
                    cursor: "pointer",
                    border: "2px solid #667eea"
                  }}
                >
                  {user?.displayName ? user.displayName[0].toUpperCase() : <PersonIcon />}
                </Avatar>
              </Tooltip>

              {!isMobile && (
                <IconButton onClick={handleLogout} sx={{ color: "#667eea" }}>
                  <LogoutIcon />
                </IconButton>
              )}

              {isMobile && (
                <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "#fff" }}>
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            background: "#fff",
            color: "#333"
          }
        }}
      >
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">Navigation</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}><CloseIcon /></IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: '#f1f8e9', borderRadius: 2 }}>
             <Avatar src={user?.photoURL} sx={{ bgcolor: '#2e7d32' }}>
                {user?.displayName ? user.displayName[0].toUpperCase() : <PersonIcon />}
             </Avatar>
              <Box>
                <Typography variant="body1" fontWeight="bold">
                    {user?.displayName || localStorage.getItem("userName") || "Profile Overview"}
                </Typography>
              </Box>
          </Box>

          <NavContent />

          <Box sx={{ mt: 'auto', pt: 2 }}>
            <Button 
                variant="outlined" 
                fullWidth 
                startIcon={<LogoutIcon />} 
                onClick={handleLogout}
                sx={{ borderColor: '#ff4d4f', color: '#ff4d4f', '&:hover': { bgcolor: '#fff1f0', borderColor: '#ff4d4f' } }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Drawer>
      
      <Toolbar sx={{ height: 80 }} />
    </>
  );
}
