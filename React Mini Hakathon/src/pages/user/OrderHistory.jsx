import { Box, Container, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Typography, CircularProgress, Chip, Collapse, IconButton, Button, Tooltip } from "@mui/material";
import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import DashboardNavbar from "../../components/DashboardNavbar";
import { orderService } from "../../utils/orderService";
import { toast } from "react-toastify";

function OrderRow({ order, idx, onStatusUpdate }) {
  const [open, setOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "success";
      case "on the way": return "info";
      case "working": return "primary";
      case "cancelled": return "error";
      default: return "warning";
    }
  };

  const calculateStatus = (createdAt) => {
    if (order.status === "cancelled" || order.status === "completed") return order.status;
    
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMinutes = Math.floor((now - created) / 60000);

    if (diffInMinutes >= 30) return "completed";
    if (diffInMinutes >= 20) return "on the way";
    if (diffInMinutes >= 5) return "working";
    return "pending";
  };

  const currentStatus = calculateStatus(order.createdAt);

  useEffect(() => {
    if (currentStatus !== order.status && order.status !== "cancelled") {
      updateStatusInDb(currentStatus);
    }
  }, [currentStatus]);

  const updateStatusInDb = async (newStatus) => {
    try {
      await orderService.updateOrderStatus(order.id, newStatus);
      onStatusUpdate();
    } catch (error) {
      console.error("Auto status update failed:", error);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;
    
    try {
      setCancelling(true);
      await orderService.cancelOrder(order.id);
      toast.success("Order cancelled successfully");
      onStatusUpdate();
    } catch (error) {
      toast.error("Failed to cancel order");
    } finally {
      setCancelling(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this order from your history?")) return;
    
    try {
      await orderService.deleteOrder(order.id);
      toast.success("Order deleted from history");
      onStatusUpdate();
    } catch (error) {
      toast.error("Failed to delete order");
    }
  };

  const productDisplayText = order.items ? `${order.items[0]?.name}${order.items.length > 1 ? ` + ${order.items.length - 1} more` : ""}` : (order.productName || "Unknown");
  const quantityDisplayText = order.items ? order.items.reduce((sum, i) => sum + i.quantity, 0) : order.quantity;

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
            <IconButton size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        </TableCell>
        <TableCell sx={{ color: "#2e7d32", fontWeight: "bold" }}>#{idx + 1}</TableCell>
        <TableCell sx={{ fontWeight: "500" }}>{productDisplayText}</TableCell>
        <TableCell sx={{ fontWeight: "bold", color: "#2e7d32" }}>${(order.totalAmount || 0).toFixed(2)}</TableCell>
        <TableCell>{quantityDisplayText}</TableCell>
        <TableCell>
          <Chip
            label={currentStatus}
            color={getStatusColor(currentStatus)}
            size="small"
            sx={{ textTransform: "capitalize" }}
          />
        </TableCell>
        <TableCell>
          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "–"}
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {(currentStatus === "pending" || currentStatus === "working" || currentStatus === "on the way") && (
                <Tooltip title="Cancel Order">
                  <IconButton color="error" size="small" onClick={handleCancel} disabled={cancelling}>
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
            )}
            <Tooltip title="Delete from History">
              <IconButton color="default" size="small" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, backgroundColor: "#fcfcfc", p: 2, borderRadius: 1, border: "1px solid #eee" }}>
              <Typography variant="h6" gutterBottom component="div" sx={{ fontSize: "1rem", fontWeight: "bold" }}>
                Order Details
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Item</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Qty</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items ? order.items.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category || "Food"}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell>{order.productName}</TableCell>
                      <TableCell>Food</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell align="right">${(order.totalAmount || 0).toFixed(2)}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <Box sx={{ mt: 2 }}>
                  <Typography variant="body2"><strong>Delivery Address:</strong> {order.address}</Typography>
                  <Typography variant="body2"><strong>Payment Method:</strong> {order.paymentMethod || "Cash on Delivery"}</Typography>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const uid = localStorage.getItem("userUID");
      const allOrders = await orderService.getAllOrders();
      const myOrders = allOrders.filter(o => String(o.userId) === String(uid));
      myOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setOrders(myOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load order history");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f8faff" }}>
      <DashboardNavbar role="user" />
      <Box sx={{ pt: 6, pb: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", mb: 1 }}>
              Order History
            </Typography>
            <Typography variant="body2" color="textSecondary">
              View all your past orders and their detailed multi-item contents.
            </Typography>
          </Box>

          <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
             <Box sx={{ p: 3, background: "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)", color: "#fff" }}>
               <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Your Order Records
              </Typography>
            </Box>
            <CardContent>
              {loading ? (
                <Box sx={{ textAlign: "center", py: 5 }}>
                  <CircularProgress />
                  <Typography color="textSecondary" sx={{ mt: 2 }}>Loading your orders...</Typography>
                </Box>
              ) : orders.length === 0 ? (
                <Typography variant="body2" color="textSecondary" sx={{ py: 3, textAlign: "center" }}>
                  You haven't placed any orders yet.
                </Typography>
              ) : (
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                      <TableCell />
                      <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Items Summary</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Total Amount</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Total Qty</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order, index) => (
                      <OrderRow key={order.id} order={order} idx={index} onStatusUpdate={fetchOrders} />
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}
