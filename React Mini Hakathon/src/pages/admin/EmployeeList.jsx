import { Box, Container, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DashboardNavbar from "../../components/DashboardNavbar";
import { branchService } from "../../utils/branchService";
import { employeeService } from "../../utils/employeeService";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", position: "", branchId: "", salary: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [employeesData, branchesData] = await Promise.all([
        employeeService.getAllEmployees(),
        branchService.getAllBranches(),
      ]);
      setEmployees(employeesData);
      setBranches(branchesData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  const handleOpenDialog = (employee = null) => {
    if (employee) {
      setFormData({ name: employee.name, position: employee.position, branchId: employee.branchId, salary: employee.salary });
      setEditingId(employee.id);
    } else {
      setFormData({ name: "", position: "", branchId: "", salary: "" });
      setEditingId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ name: "", position: "", branchId: "", salary: "" });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.position || !formData.branchId || !formData.salary) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (editingId) {
        await employeeService.updateEmployee(editingId, {
          name: formData.name,
          position: formData.position,
          branchId: formData.branchId,
          salary: parseInt(formData.salary)
        });
        toast.success("Employee updated successfully!");
      } else {
        await employeeService.addEmployee({
          name: formData.name,
          position: formData.position,
          branchId: formData.branchId,
          salary: parseInt(formData.salary)
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
    try {
      await employeeService.deleteEmployee(id);
      toast.success("Employee deleted successfully!");
      await fetchData();
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <DashboardNavbar role="admin" />
      <Box sx={{ flex: 1, ml: { xs: 0, sm: 30 }, pt: 3, pb: 3 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
                Employee Management
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Manage employees across all branches.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ backgroundColor: "#667eea" }}
            >
              Add Employee
            </Button>
          </Box>

          <Card>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Employee Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Position</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Branch</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Salary</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => {
                    const branch = branches.find((b) => b.id === employee.branchId);
                    return (
                      <TableRow key={employee.id}>
                        <TableCell sx={{ fontWeight: "500" }}>{employee.name}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>{branch?.name || "N/A"}</TableCell>
                        <TableCell sx={{ color: "#43e97b", fontWeight: "bold" }}>${employee.salary}</TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            startIcon={<EditIcon />}
                            onClick={() => handleOpenDialog(employee)}
                            sx={{ mr: 1, color: "#667eea" }}
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
                    );
                  })}
                </TableBody>
              </Table>
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
                    label="Salary"
                    name="salary"
                    type="number"
                    value={formData.salary}
                    onChange={handleChange}
                    inputProps={{ min: 0 }}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#667eea" }}>
                {editingId ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
}
