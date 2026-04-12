import { Box, Container, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Typography, Select, MenuItem, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DashboardNavbar from "../../components/DashboardNavbar";
import { branchManagerService } from "../../utils/branchManagerService";
import { branchService } from "../../utils/branchService";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function BranchManagement() {
  const [branches, setBranches] = useState([]);
  const [managers, setManagers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", location: "", managerId: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [branchesData, managersData] = await Promise.all([
        branchService.getAllBranches(),
        branchManagerService.getAllManagers(),
      ]);
      setBranches(branchesData);
      setManagers(managersData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (branch = null) => {
    if (branch) {
      setFormData({ name: branch.name, location: branch.location, managerId: branch.managerId });
      setEditingId(branch.id);
    } else {
      setFormData({ name: "", location: "", managerId: "" });
      setEditingId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ name: "", location: "", managerId: "" });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Get available managers (not assigned to any branch, or currently assigned to this branch being edited)
  const getAvailableManagers = () => {
    return managers.filter((manager) => {
      const isAssignedToAnotherBranch = branches.some(
        (b) => b.managerId === manager.id && b.id !== editingId
      );
      return !isAssignedToAnotherBranch;
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.location || !formData.managerId) {
      toast.error("Please fill in all fields including selecting a manager");
      return;
    }

    if (managers.length === 0) {
      toast.error("No branch managers available. Please add managers first");
      return;
    }

    // Check if manager is already assigned to another branch (for new branches or when changing manager)
    const isManagerAssigned = branches.some(
      (b) => b.managerId === formData.managerId && b.id !== editingId
    );

    if (isManagerAssigned) {
      toast.error("This manager is already assigned to another branch. Each manager can only manage one branch.");
      return;
    }

    setLoading(true);
    try {
      if (editingId) {
        await branchService.updateBranch(editingId, formData);
        toast.success("Branch updated successfully!");
      } else {
        await branchService.addBranch({
          ...formData,
          employees: 0,
          revenue: 0,
        });
        toast.success("Branch created successfully!");
      }
      await fetchData();
      handleCloseDialog();
    } catch (error) {
      toast.error(error.message || "Failed to save branch");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      setLoading(true);
      try {
        await branchService.deleteBranch(id);
        toast.success("Branch deleted successfully!");
        await fetchData();
      } catch (error) {
        toast.error("Failed to delete branch");
      } finally {
        setLoading(false);
      }
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
                Branch Network
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Architect, monitor, and scale your franchise locations.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              disabled={managers.length === 0 || loading}
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
              Add Branch
            </Button>
          </Box>

          {managers.length === 0 && (
            <Alert severity="warning" sx={{ mb: 3 }}>
              No branch managers available. Please add branch managers first before creating branches.
            </Alert>
          )}

          <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <Box sx={{ p: 3, background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)", color: "#fff" }}>
               <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Active Franchise Locations
              </Typography>
            </Box>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f1f8e9" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Branch Identity</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Lead Manager</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Email Connection</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Team Size</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Live Revenue</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {branches.map((branch) => {
                    const manager = managers.find((m) => m.id === branch.managerId);
                    return (
                    <TableRow key={branch.id}>
                      <TableCell sx={{ fontWeight: "500" }}>{branch.name}</TableCell>
                      <TableCell>{branch.location}</TableCell>
                      <TableCell>{manager ? manager.name : "N/A"}</TableCell>
                      <TableCell>{manager ? manager.email : "N/A"}</TableCell>
                      <TableCell>{branch.employees}</TableCell>
                      <TableCell sx={{ color: "#1b5e20", fontWeight: "900", fontSize: '1.1rem' }}>${branch.revenue}</TableCell>
                      <TableCell>
                         <Button
                           size="small"
                           startIcon={<EditIcon />}
                           onClick={() => handleOpenDialog(branch)}
                           sx={{ mr: 1, color: "#1b5e20", fontWeight: '800' }}
                         >
                           Edit
                         </Button>
                         <Button
                           size="small"
                           startIcon={<DeleteIcon />}
                           onClick={() => handleDelete(branch.id)}
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
            <DialogTitle>{editingId ? "Edit Branch" : "Add New Branch"}</DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Branch Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Select
                    fullWidth
                    name="managerId"
                    value={formData.managerId}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="">
                      <em>Select Branch Manager</em>
                    </MenuItem>
                    {getAvailableManagers().map((manager) => (
                      <MenuItem key={manager.id} value={manager.id}>
                        {manager.name} ({manager.email})
                      </MenuItem>
                    ))}
                  </Select>
                  {managers.length > 0 && getAvailableManagers().length === 0 && !editingId && (
                    <Typography variant="caption" sx={{ color: "#ff6b6b", mt: 1, display: "block" }}>
                      All managers are already assigned to branches
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3, bgcolor: '#f1f8e9' }}>
              <Button onClick={handleCloseDialog} disabled={loading} sx={{ color: 'text.secondary' }}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#2e7d32", '&:hover': { bgcolor: '#1b5e20' }, borderRadius: 2, px: 4 }} disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : editingId ? "Update Location" : "Launch Branch"}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
}
