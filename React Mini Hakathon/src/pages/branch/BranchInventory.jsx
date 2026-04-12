import {
  Box,
  Container,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Typography,
  MenuItem,
  Chip,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DashboardNavbar from "../../components/DashboardNavbar";
import { inventoryService } from "../../utils/inventoryService";
import { userProfileService } from "../../utils/userProfileService";
import { branchService } from "../../utils/branchService";
import {
  getRoleFromEmailAsync,
  inventoryPermissions,
  ROLES,
} from "../../utils/roleCheck";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";

export default function BranchInventory() {
  const [inventory, setInventory] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [managerBranchId, setManagerBranchId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    unit: "kg",
  });
  const [editingItem, setEditingItem] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const uid = localStorage.getItem("userUID");
      let email = localStorage.getItem("userEmail");

      if (!email) {
        const userProfile = await userProfileService.getUserProfile(uid);
        email = userProfile?.email || "";
      }

      const role = await getRoleFromEmailAsync(email);
      setUserRole(role);
      setUserEmail(email);

      const [allBranches, allInventory] = await Promise.all([
        branchService.getAllBranches(),
        inventoryService.getAllInventory(),
      ]);
      setBranches(allBranches);

      if (role === ROLES.ADMIN) {
        setInventory(allInventory);
        setManagerBranchId(null);
      } else {
        const userProfile = await userProfileService.getUserProfile(uid);
        let assignedBranch = null;

        // Primary: match via managerId
        if (userProfile?.managerId) {
          assignedBranch = allBranches.find(
            (b) => String(b.managerId) === String(userProfile.managerId),
          );
        }
        // Fallback: match via branchId
        if (!assignedBranch && userProfile?.branchId) {
          assignedBranch = allBranches.find(
            (b) => String(b.id) === String(userProfile.branchId),
          );
        }

        if (assignedBranch) {
          const branchIdStr = String(assignedBranch.id);
          setManagerBranchId(assignedBranch.id);
          const filtered = allInventory.filter(
            (item) => String(item.branchId) === branchIdStr,
          );
          setInventory(filtered);
        } else {
          setManagerBranchId(null);
          setInventory([]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setFormData({ product: "", quantity: "", unit: "kg" });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenEditDialog = (item) => {
    setEditingItem(item);
    setFormData({
      product: item.product,
      quantity: item.quantity,
      unit: item.unit,
      isLowStock: item.isLowStock || false,
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.product || !formData.quantity) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const uid = localStorage.getItem("userUID");
      const userProfile = await userProfileService.getUserProfile(uid);
      const branchId = userProfile?.branchId || managerBranchId;

      if (!branchId) {
        toast.error("Branch not assigned to your profile");
        return;
      }

      await inventoryService.addInventory({
        branchId: branchId,
        product: formData.product,
        quantity: parseInt(formData.quantity),
        unit: formData.unit,
      });

      toast.success("Inventory item added successfully!");
      await fetchData();
      handleCloseDialog();
    } catch (error) {
      toast.error(error.message || "Failed to add inventory");
    }
  };

  const handleEditSubmit = async () => {
    if (!formData.product || !formData.quantity) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const updateData = {
        product: formData.product,
        quantity: parseInt(formData.quantity),
        unit: formData.unit,
        isLowStock: formData.isLowStock === true ? true : false,
        updatedAt: new Date().toISOString(),
      };
      console.log("Updating inventory with:", updateData);

      await inventoryService.updateInventory(editingItem.id, updateData);

      toast.success("Inventory item updated successfully!");
      await fetchData();
      handleCloseEditDialog();
    } catch (error) {
      toast.error(error.message || "Failed to update inventory");
    }
  };

  const getBranchName = () => {
    const branch = branches.find((b) => b.id === managerBranchId);
    return branch?.name || "Your Branch";
  };

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await inventoryService.deleteInventory(itemId);
        toast.success("Inventory item deleted successfully!");
        await fetchData();
      } catch (error) {
        toast.error("Failed to delete item");
      }
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f4f0" }}>
      <DashboardNavbar role="branch_manager" />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box>
              <Typography
                variant="h3"
                component="h1"
                sx={{ fontWeight: "900", mb: 1, color: "#1b5e20" }}
              >
                Branch Inventory Hub
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Manage and monitor stock levels for **{getBranchName()}**.
              </Typography>
            </Box>
            {inventoryPermissions.canAddInventory(userRole) && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
                sx={{
                  backgroundColor: "#2e7d32",
                  "&:hover": { backgroundColor: "#1b5e20" },
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  fontWeight: "bold",
                  boxShadow: "0 8px 16px rgba(46, 125, 50, 0.2)",
                }}
              >
                Add Item
              </Button>
            )}
          </Box>

          <Card
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <Box
              sx={{
                p: 3,
                background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
                color: "#fff",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Active Stock Ledger
              </Typography>
            </Box>
            <CardContent>
              {loading ? (
                <Typography>Loading inventory...</Typography>
              ) : inventory.length === 0 ? (
                <Typography color="textSecondary">
                  No inventory items for your branch yet.
                </Typography>
              ) : (
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f1f8e6" }}>
                      <TableCell sx={{ fontWeight: "bold" }}>Product</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Quantity
                      </TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Unit</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>
                        Added Date
                      </TableCell>
                      {inventoryPermissions.canEditInventory(userRole) && (
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Actions
                        </TableCell>
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inventory.map((item) => (
                      <TableRow
                        key={item.id}
                        sx={{
                          backgroundColor: item.isLowStock
                            ? "#fff3cd"
                            : "transparent",
                        }}
                      >
                        <TableCell sx={{ fontWeight: "500" }}>
                          {item.product}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.unit}</TableCell>
                        <TableCell>
                          {item.isLowStock && (
                            <Chip
                              icon={<WarningIcon />}
                              label="Low Stock"
                              color="warning"
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </TableCell>
                        <TableCell>
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString()
                            : "N/A"}
                        </TableCell>
                        {inventoryPermissions.canEditInventory(userRole) && (
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => handleOpenEditDialog(item)}
                              title="Edit item"
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDelete(item.id)}
                              title="Delete item"
                              color="error"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {/* Add Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Add Inventory Item</DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    placeholder="e.g., Beef, Chicken"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                  >
                    <MenuItem value="g">Gram (g)</MenuItem>
                    <MenuItem value="kg">Kilogram (kg)</MenuItem>
                    <MenuItem value="tonne">Tonne (t)</MenuItem>
                    <MenuItem value="mg">Milligram (mg)</MenuItem>
                    <MenuItem value="oz">Ounce (oz)</MenuItem>
                    <MenuItem value="lb">Pound (lb)</MenuItem>
                    <MenuItem value="ml">Milliliter (ml)</MenuItem>
                    <MenuItem value="l">Liter (l)</MenuItem>
                    <MenuItem value="piece">Piece</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                sx={{ backgroundColor: "#667eea" }}
              >
                Add
              </Button>
            </DialogActions>
          </Dialog>

          {/* Edit Dialog */}
          <Dialog
            open={openEditDialog}
            onClose={handleCloseEditDialog}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Edit Inventory Item</DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    placeholder="e.g., Beef, Chicken"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    select
                    label="Unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                  >
                    <MenuItem value="g">Gram (g)</MenuItem>
                    <MenuItem value="kg">Kilogram (kg)</MenuItem>
                    <MenuItem value="tonne">Tonne (t)</MenuItem>
                    <MenuItem value="mg">Milligram (mg)</MenuItem>
                    <MenuItem value="oz">Ounce (oz)</MenuItem>
                    <MenuItem value="lb">Pound (lb)</MenuItem>
                    <MenuItem value="ml">Milliliter (ml)</MenuItem>
                    <MenuItem value="l">Liter (l)</MenuItem>
                    <MenuItem value="piece">Piece</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{ p: 2, backgroundColor: "#f5f5f5", borderRadius: 1 }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ mb: 1, fontWeight: "bold" }}
                    >
                      Mark as Low Stock?
                    </Typography>
                    <Button
                      variant={formData.isLowStock ? "contained" : "outlined"}
                      color={formData.isLowStock ? "warning" : "inherit"}
                      startIcon={<WarningIcon />}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          isLowStock: !formData.isLowStock,
                        })
                      }
                      fullWidth
                    >
                      {formData.isLowStock
                        ? "Marked as Low Stock"
                        : "Mark as Low Stock"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3, bgcolor: "#f1f8e6" }}>
              <Button
                onClick={handleCloseEditDialog}
                sx={{ color: "text.secondary" }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleEditSubmit}
                variant="contained"
                sx={{
                  backgroundColor: "#2e7d32",
                  "&:hover": { bgcolor: "#1b5e20" },
                  borderRadius: 2,
                  px: 4,
                }}
              >
                Update Stock
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
}
