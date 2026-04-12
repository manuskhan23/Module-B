import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DashboardNavbar from "../../components/DashboardNavbar";
import { branchManagerService } from "../../utils/branchManagerService";
import { branchService } from "../../utils/branchService";
import { toast } from "react-toastify";

export default function BranchManagersManagement() {
  const [managers, setManagers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    branchId: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await Promise.all([fetchManagers(), fetchBranches()]);
  };

  const fetchBranches = async () => {
    try {
      const data = await branchService.getAllBranches();
      setBranches(data);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };

  const fetchManagers = async () => {
    try {
      const data = await branchManagerService.getAllManagers();
      setManagers(data);
    } catch (error) {
      toast.error("Failed to fetch managers");
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Check for duplicate email (only if adding new manager)
    if (!editingId && managers.some((m) => m.email === formData.email)) {
      newErrors.email = "Email already registered";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenDialog = (manager = null) => {
    if (manager) {
      setEditingId(manager.id);
      setFormData({
        email: manager.email,
        password: manager.password,
        name: manager.name,
        branchId: manager.branchId || "",
      });
    } else {
      setFormData({ email: "", password: "", name: "", branchId: "" });
      setEditingId(null);
    }
    setErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ email: "", password: "", name: "" });
    setEditingId(null);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (editingId) {
        await branchManagerService.updateManager(editingId, formData);
        toast.success("Manager updated successfully!");
      } else {
        await branchManagerService.addManager(formData);
        toast.success("Manager added successfully!");
      }
      await fetchManagers();
      handleCloseDialog();
    } catch (error) {
      toast.error(error.message || "Failed to save manager");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (managerId) => {
    if (window.confirm("Are you sure you want to delete this manager?")) {
      try {
        await branchManagerService.deleteManager(managerId);
        toast.success("Manager deleted successfully!");
        await fetchManagers();
      } catch (error) {
        toast.error("Failed to delete manager");
      }
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f4f0" }}>
      <DashboardNavbar role="admin" />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
              <Typography variant="h3" component="h1" sx={{ fontWeight: "900", mb: 1, color: '#1b5e20' }}>
                Leadership Network
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Appoint and coordinate your elite branch managers.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ 
                backgroundColor: "#2e7d32",
                '&:hover': { backgroundColor: '#1b5e20' },
                borderRadius: 3,
                px: 3,
                py: 1,
                fontWeight: 'bold',
                boxShadow: '0 8px 16px rgba(46, 125, 50, 0.2)',
                textTransform: "none"
              }}
            >
              Add Manager
            </Button>
          </Box>

          <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <Box sx={{ p: 3, background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)", color: "#fff" }}>
               <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Verified Team Leaders
              </Typography>
            </Box>
            <CardContent>
              {managers.length === 0 ? (
                <Alert severity="info">No branch managers registered yet. Click "Add Manager" to create one.</Alert>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead sx={{ backgroundColor: "#f1f8e6" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Email Connection</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Security Key</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Joined</TableCell>
                        <TableCell align="center" sx={{ fontWeight: "bold" }}>
                          Control
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {managers.map((manager) => (
                        <TableRow key={manager.id} hover>
                          <TableCell>{manager.name}</TableCell>
                          <TableCell>{manager.email}</TableCell>
                          <TableCell>
                            <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#666" }}>
                              {manager.password}
                            </span>
                          </TableCell>
                          <TableCell>{manager.createdAt}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              size="small"
                              onClick={() => handleOpenDialog(manager)}
                              sx={{ color: '#1b5e20' }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(manager.id)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", backgroundColor: "#1b5e20", color: "white" }}>
          {editingId ? "Update Professional Profile" : "Register New Manager"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
            placeholder="John Manager"
          />
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            placeholder="manager@example.com"
            disabled={editingId ? true : false}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            error={!!errors.password}
            helperText={errors.password || "Minimum 6 characters"}
            margin="normal"
            placeholder="••••••••"
          />
          <TextField
            fullWidth
            select
            label="Assign Branch"
            name="branchId"
            value={formData.branchId}
            onChange={handleInputChange}
            margin="normal"
          >
            <MenuItem value="">None - Will select first branch</MenuItem>
            {branches.map((branch) => (
              <MenuItem key={branch.id} value={branch.id}>
                {branch.name}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: '#f1f8e9' }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{ backgroundColor: "#2e7d32", '&:hover': { bgcolor: '#1b5e20' }, borderRadius: 2, px: 4 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : editingId ? "Save Changes" : "Create Account"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
