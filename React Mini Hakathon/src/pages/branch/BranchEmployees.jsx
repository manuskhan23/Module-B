import { Box, Container, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Typography, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DashboardNavbar from "../../components/DashboardNavbar";
import { employeeService } from "../../utils/employeeService";
import { branchService } from "../../utils/branchService";
import { userProfileService } from "../../utils/userProfileService";
import { getRoleFromEmailAsync, ROLES } from "../../utils/roleCheck";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function BranchEmployees() {
  const [employees, setEmployees] = useState([]);
  const [branches, setBranches] = useState([]);
  const [branchId, setBranchId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", position: "", salary: "", branchId: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const uid = localStorage.getItem("userUID");
      let email = localStorage.getItem("userEmail");
      const userProfile = await userProfileService.getUserProfile(uid);
      
      // Get email if not in localStorage
      if (!email) {
        email = userProfile?.email || "";
      }
      
      // Get user role
      const role = await getRoleFromEmailAsync(email);
      setUserRole(role);
      
      if (userProfile?.branchId) {
        setBranchId(userProfile.branchId);
      } else {
        setBranchId(1); // Default to branch 1 for testing
      }

      const allEmployees = await employeeService.getAllEmployees();
      const allBranches = await branchService.getAllBranches();
      setBranches(allBranches);
      
      // Determine the exact branch the manager is assigned to
      let actualBranchId = userProfile?.branchId || 1;
      if (role === ROLES.BRANCH_MANAGER && userProfile?.managerId) {
        const assignedBranch = allBranches.find(b => String(b.managerId) === String(userProfile.managerId));
        if (assignedBranch) {
          actualBranchId = assignedBranch.id;
        }
      }
      setBranchId(actualBranchId);
      
      // Admin sees all employees, each manager sees only their specific branch
      if (role === ROLES.ADMIN) {
        setEmployees(allEmployees);
      } else {
        const filtered = allEmployees.filter(e => String(e.branchId) === String(actualBranchId));
        setEmployees(filtered);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (employee = null) => {
    if (employee) {
      setFormData({ name: employee.name, position: employee.position, salary: employee.salary, branchId: employee.branchId });
      setEditingId(employee.id);
    } else {
      setFormData({ name: "", position: "", salary: "", branchId: "" });
      setEditingId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ name: "", position: "", salary: "", branchId: "" });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.position || !formData.salary) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (editingId) {
        await employeeService.updateEmployee(editingId, {
          name: formData.name,
          position: formData.position,
          salary: parseInt(formData.salary),
          branchId: userRole === ROLES.ADMIN ? formData.branchId : branchId
        });
        toast.success("Employee updated successfully!");
      } else {
        await employeeService.addEmployee({
          name: formData.name,
          position: formData.position,
          salary: parseInt(formData.salary),
          branchId: userRole === ROLES.ADMIN ? formData.branchId : branchId
        });
        toast.success("Employee added successfully!");
      }
      await fetchData();
      handleCloseDialog();
    } catch (error) {
      toast.error(error.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await employeeService.deleteEmployee(id);
        toast.success("Employee deleted successfully!");
        await fetchData();
      } catch (error) {
        toast.error("Failed to delete employee");
      }
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f4f0" }}>
      <DashboardNavbar role={userRole === ROLES.ADMIN ? "admin" : "branch_manager"} />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Box>
              <Typography variant="h3" component="h1" sx={{ fontWeight: "900", mb: 1, color: '#1b5e20' }}>
                Personnel Network
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Empower and manage your dedicated branch team.
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
                boxShadow: '0 8px 16px rgba(46, 125, 50, 0.2)'
              }}
            >
              Add Employee
            </Button>
          </Box>

          <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <Box sx={{ p: 3, background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)", color: "#fff" }}>
               <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Active Staff Roster
              </Typography>
            </Box>
            <CardContent>
              {loading ? (
                <Typography>Loading employees...</Typography>
              ) : employees.length === 0 ? (
                <Typography color="textSecondary">No employees for your branch yet.</Typography>
              ) : (
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f1f8e9" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Team Member</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Position</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Branch Hub</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Earnings</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => {
                    const branch = branches.find((b) => String(b.id) === String(employee.branchId));
                    return (
                    <TableRow key={employee.id}>
                      <TableCell sx={{ fontWeight: "500" }}>{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{branch?.name || "N/A"}</TableCell>
                      <TableCell sx={{ color: "#1b5e20", fontWeight: "900", fontSize: '1.1rem' }}>${employee.salary}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleOpenDialog(employee)}
                          sx={{ mr: 1, color: "#1b5e20", fontWeight: 'bold' }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(employee.id)}
                          color="error"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  )})}
                </TableBody>
              </Table>
              )}
            </CardContent>
          </Card>

          {/* Add/Edit Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>{editingId ? "Edit Employee" : "Add New Employee"}</DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Salary"
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleChange}
                    inputProps={{ min: 0 }}
                  />
                </Grid>
                {userRole === ROLES.ADMIN && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      select
                      label="Branch"
                      name="branchId"
                      value={formData.branchId || ""}
                      onChange={handleChange}
                    >
                      {branches.map((branch) => (
                        <MenuItem key={branch.id} value={branch.id}>
                          {branch.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3, bgcolor: '#f1f8e9' }}>
              <Button onClick={handleCloseDialog} sx={{ color: 'text.secondary' }}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#2e7d32", '&:hover': { bgcolor: '#1b5e20' }, borderRadius: 2, px: 4 }}>
                {editingId ? "Update Member" : "Enlist Employee"}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
}
