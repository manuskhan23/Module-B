import { Box, Container, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid, Typography, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import DashboardNavbar from "../../components/DashboardNavbar";
import { offerService } from "../../utils/offerService";
import { productService } from "../../utils/productService";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function OfferManagement() {
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ productIds: [], discount: "", description: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [offersData, productsData] = await Promise.all([
        offerService.getAllOffers(),
        productService.getAllProducts()
      ]);
      setOffers(offersData);
      setProducts(productsData);
    } catch (error) {
       console.error("Error fetching data:", error);
       toast.error("Failed to load management data");
    } finally {
       setLoading(false);
    }
  };

  const handleOpenDialog = (offer = null) => {
    if (offer) {
      setFormData({ 
        productIds: offer.productIds || (offer.productId ? [offer.productId] : []), 
        discount: offer.discount || "", 
        description: offer.description || "" 
      });
      setEditingId(offer.id);
    } else {
      setFormData({ productIds: [], discount: "", description: "" });
      setEditingId(null);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({ productIds: [], discount: "", description: "" });
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.productIds || formData.productIds.length === 0 || !formData.discount) {
      toast.error("Please select at least one product and set a discount");
      return;
    }

    const selectedProductsText = products
      .filter(p => formData.productIds.includes(p.id))
      .map(p => p.name)
      .join(", ");

    const offerPayload = {
        productIds: formData.productIds,
        productName: selectedProductsText,
        discount: parseInt(formData.discount),
        description: formData.description || `Special discount on ${selectedProductsText}`
    };

    try {
      if (editingId) {
        await offerService.updateOffer(editingId, offerPayload);
        toast.success("Offer updated successfully!");
      } else {
        await offerService.addOffer(offerPayload);
        toast.success("Offer created successfully!");
      }
      await fetchData();
      handleCloseDialog();
    } catch (error) {
      toast.error(error.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this offer?")) {
        try {
            await offerService.deleteOffer(id);
            toast.success("Offer deleted successfully!");
            await fetchData();
        } catch (error) {
            toast.error("Failed to delete offer");
        }
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8faff" }}>
      <DashboardNavbar role="admin" />
      <Box sx={{ pt: 14, pb: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
                Offers & Discounts Management
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Create and manage promotional offers linked to high-demand products.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ backgroundColor: "#2e7d32", '&:hover': { bgcolor: '#1b5e20' } }}
            >
              Add Offer
            </Button>
          </Box>

          <Card>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: "bold" }}>Product On Sale</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Original Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Discount</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Sale Price</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {offers.map((offer) => {
                    return (
                      <TableRow key={offer.id}>
                        <TableCell sx={{ fontWeight: "500", maxWidth: 300 }}>{offer.productName || "Multiple Items"}</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell sx={{ color: "#2e7d32", fontWeight: "bold" }}>{offer.discount}%</TableCell>
                        <TableCell sx={{ color: "#2e7d32", fontWeight: "800", fontSize: '1.1rem' }}>ON ALL</TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            onClick={() => handleOpenDialog(offer)}
                            sx={{ mr: 1, color: "#2e7d32" }}
                            startIcon={<EditIcon />}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDelete(offer.id)}
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
            <DialogTitle>{editingId ? "Edit Offer" : "Add New Offer"}</DialogTitle>
            <DialogContent sx={{ pt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Select Products"
                    name="productIds"
                    value={formData.productIds}
                    onChange={handleChange}
                    SelectProps={{ multiple: true }}
                    helperText="Select one or more products for this discount"
                  >
                    {products.map((p) => (
                        <MenuItem key={p.id} value={p.id}>
                            {p.name} - ${Number(p.price).toFixed(2)}
                        </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Discount Percentage (%)"
                    name="discount"
                    type="number"
                    value={formData.discount}
                    onChange={handleChange}
                    inputProps={{ min: 0, max: 100 }}
                    helperText="Enter value from 0-100"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description (Optional)"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    placeholder={`e.g., Get this limited time deal on our best seller!`}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained" sx={{ backgroundColor: "#2e7d32", '&:hover': { bgcolor: '#1b5e20' } }}>
                {editingId ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
      </Box>
    </Box>
  );
}
