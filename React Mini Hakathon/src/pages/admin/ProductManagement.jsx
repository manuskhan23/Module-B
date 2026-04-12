import { Box, Container, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DashboardNavbar from "../../components/DashboardNavbar";
import { productService } from "../../utils/productService";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", price: "", category: "", imageUrl: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  const handleOpenDialog = (product = null) => {
    if (product) {
      setFormData({ name: product.name, price: product.price, category: product.category, imageUrl: product.imageUrl || "" });
      setEditingId(product.id);
    } else {
      setFormData({ name: "", price: "", category: "", imageUrl: "" });
      setEditingId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ name: "", price: "", category: "", imageUrl: "" });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.category) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (editingId) {
        await productService.updateProduct(editingId, {
          name: formData.name,
          price: parseFloat(formData.price),
          category: formData.category,
          imageUrl: formData.imageUrl
        });
        toast.success("Product updated successfully!");
      } else {
        await productService.addProduct({
          name: formData.name,
          price: parseFloat(formData.price),
          category: formData.category,
          imageUrl: formData.imageUrl
        });
        toast.success("Product created successfully!");
      }
      await fetchProducts();
      handleCloseDialog();
    } catch (error) {
      toast.error(error.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await productService.deleteProduct(id);
      toast.success("Product deleted successfully!");
      await fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f4f0" }}>
      <DashboardNavbar role={localStorage.getItem("userRole") || "admin"} />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Box>
              <Typography variant="h3" component="h1" sx={{ fontWeight: "900", mb: 1, color: '#1b5e20' }}>
                Inventory Master
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Create, refine, and harmonize your product catalog.
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
              Add Product
            </Button>
          </Box>

          <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
            <Box sx={{ p: 3, background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)", color: "#fff" }}>
               <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Global Product Catalog
              </Typography>
            </Box>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f1f8e9" }}>
                    <TableCell sx={{ fontWeight: "bold", width: "60px" }}>Preview</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Current Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        {product.imageUrl ? (
                          <Box component="img" src={product.imageUrl} sx={{ width: 40, height: 40, borderRadius: 1, objectFit: "cover", boxShadow: 1 }} />
                        ) : (
                          <Box sx={{ width: 40, height: 40, backgroundColor: "#ddd", borderRadius: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Typography variant="caption" color="textSecondary">No Img</Typography>
                          </Box>
                        )}
                      </TableCell>
                      <TableCell sx={{ fontWeight: "500" }}>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell sx={{ color: "#2e7d32", fontWeight: "900", fontSize: '1.1rem' }}>${product.price}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleOpenDialog(product)}
                          sx={{ mr: 1, color: "#2e7d32", fontWeight: 'bold' }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(product.id)}
                          color="error"
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Add/Edit Dialog */}
          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>{editingId ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    inputProps={{ step: "0.01", min: 0 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="imageUrl"
                    placeholder="https://example.com/image.png"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    helperText="Direct link to a product image"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 3, bgcolor: '#f1f8e9' }}>
              <Button onClick={handleCloseDialog} sx={{ color: 'text.secondary' }}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#2e7d32", '&:hover': { bgcolor: '#1b5e20' }, borderRadius: 2, px: 4 }}>
                {editingId ? "Update Product" : "Launch Product"}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
}
