import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Button, Typography, Divider, ListItemButton } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GroupIcon from "@mui/icons-material/Group";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import RateReviewIcon from "@mui/icons-material/RateReview";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

const DRAWER_WIDTH = 250;

const getMenuItems = (role) => {
  const baseItems = [{ label: "Dashboard", icon: DashboardIcon, path: `/${role}/dashboard` }];

  const menuItems = {
    admin: [
      ...baseItems,
      { label: "Branches", icon: StorefrontIcon, path: "/admin/branches" },
      { label: "Products", icon: LocalShippingIcon, path: "/admin/products" },
      { label: "Inventory", icon: InventoryIcon, path: "/admin/inventory" },
      { label: "Employees", icon: GroupIcon, path: "/admin/employees" },
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
      ...baseItems,
      { label: "Products", icon: RestaurantMenuIcon, path: "/user/products" },
      { label: "Place Order", icon: LocalShippingIcon, path: "/user/order" },
      { label: "Order History", icon: InventoryIcon, path: "/user/orders" },
      { label: "Submit Review", icon: RateReviewIcon, path: "/user/reviews" }
    ]
  };

  return menuItems[role] || baseItems;
};

export default function Navbar({ role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = getMenuItems(role);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          backgroundColor: "#1a1a2e",
          color: "#fff",
          overflowX: "hidden"
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#667eea" }}>
          Franchise Manager
        </Typography>
        <Typography variant="caption" sx={{ color: "#999", textTransform: "capitalize" }}>
          {role === "branch_manager" ? "Branch Manager" : role.charAt(0).toUpperCase() + role.slice(1)}
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: "#333" }} />

      <List sx={{ flex: 1, pt: 2 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <ListItemButton
              key={item.label}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                mx: 2,
                px: 1,
                borderRadius: 1,
                width: "calc(100% - 32px)",
                backgroundColor: isActive ? "#667eea" : "transparent",
                "&:hover": { backgroundColor: isActive ? "#667eea" : "#333" },
                transition: "all 0.3s ease"
              }}
            >
              <ListItemIcon sx={{ color: isActive ? "#fff" : "#999", minWidth: 40, display: "flex", justifyContent: "center" }}>
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  "& .MuiTypography-root": {
                    fontSize: "14px",
                    fontWeight: isActive ? "500" : "400"
                  }
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ backgroundColor: "#333" }} />

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
          sx={{
            color: "#999",
            borderColor: "#333",
            "&:hover": { borderColor: "#667eea", color: "#667eea" }
          }}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
}
