import { Box, Container, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, MenuItem, Typography, Chip } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DashboardNavbar from "../../components/DashboardNavbar";
import { branchService } from "../../utils/branchService";
import { inventoryService } from "../../utils/inventoryService";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import WarningIcon from "@mui/icons-material/Warning";

export default function InventoryManagement() {
  const [inventory, setInventory] = useState([]);
  const [branches, setBranches] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ branchId: "", product: "", quantity: "", unit: "kg" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [inventoryData, branchesData] = await Promise.all([
        inventoryService.getAllInventory(),
        branchService.getAllBranches(),
      ]);
      setInventory(inventoryData);
      setBranches(branchesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ branchId: item.branchId, product: item.product, quantity: item.quantity, unit: item.unit });
    } else {
      setEditingId(null);
      setFormData({ branchId: "", product: "", quantity: "", unit: "kg" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.branchId || !formData.product || !formData.quantity) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (editingId) {
        // Update existing item
        await inventoryService.updateInventory(editingId, {
          branchId: formData.branchId,
          product: formData.product,
          quantity: parseInt(formData.quantity),
          unit: formData.unit
        });
        toast.success("Inventory item updated successfully!");
      } else {
        // Add new item
        await inventoryService.addInventory({
          branchId: formData.branchId,
          product: formData.product,
          quantity: parseInt(formData.quantity),
          unit: formData.unit
        });
        toast.success("Inventory item added successfully!");
      }
      await fetchData();
      handleCloseDialog();
    } catch (error) {
      toast.error(error.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await inventoryService.deleteInventory(id);
      toast.success("Inventory item deleted successfully!");
      await fetchData();
    } catch (error) {
      toast.error("Failed to delete item");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f4f0" }}>
      <DashboardNavbar role="admin" />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Box>
              <Typography variant="h3" component="h1" sx={{ fontWeight: "900", mb: 1, color: '#1b5e20' }}>
                Supply Chain Hub
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Orchestrate and optimize stock distribution across all locations.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenDialog}
              sx={{ 
                backgroundColor: "#2e7d32",
                '&:hover': { backgroundColor: '#1b5e20' },
                borderRadius: 3,
                px: 3,
                py: 1,
                fontWeight: 'bold',
                boxShadow: '0 8px 16px rgba(46, 125, 50, 0.2)'
              }}
            >
              Add Item
            </Button>
          </Box>

          <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <Box sx={{ p: 3, background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)", color: "#fff" }}>
               <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Global Stock Overview
              </Typography>
            </Box>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f1f8e6" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Branch Identity</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Material/Product</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Quantity</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Unit</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {inventory.map((item) => {
                    const branch = branches.find((b) => b.id === item.branchId);
                    return (
                      <TableRow key={item.id} sx={{ backgroundColor: item.isLowStock ? "#fff3cd" : "transparent" }}>
                        <TableCell>{branch?.name || "N/A"}</TableCell>
                        <TableCell sx={{ fontWeight: "500" }}>{item.product}</TableCell>
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
                          <Button
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => handleOpenDialog(item)}
                            sx={{ marginRight: 1, color: '#1b5e20', fontWeight: 'bold' }}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(item.id)}
                            color="error"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Add/Edit Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>{editingId ? "Edit Inventory Item" : "Add Inventory Item"}</DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Branch"
                    name="branchId"
                    value={formData.branchId}
                    onChange={handleChange}
                  >
                    {branches.map((branch) => (
                       <MenuItem key={branch.id} value={branch.id}>
                         {branch.name}
                       </MenuItem>
                     ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product"
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
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
            <DialogActions sx={{ p: 3, bgcolor: '#f1f8e9' }}>
              <Button onClick={handleCloseDialog} sx={{ color: 'text.secondary' }}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#2e7d32", '&:hover': { bgcolor: '#1b5e20' }, borderRadius: 2, px: 4 }}>
                {editingId ? "Update Item" : "Register Item"}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
}
