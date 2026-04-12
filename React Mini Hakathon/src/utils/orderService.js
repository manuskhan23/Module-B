// Service to manage orders using Firebase Realtime Database
import { database } from "../config/firebase";
import { ref, get, set, remove, push } from "firebase/database";

export const orderService = {
  // Get all orders
  async getAllOrders() {
    try {
      const dbRef = ref(database, "orders");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
      }
      return [];
    } catch (error) {
      console.error("Error fetching orders:", error);
      return [];
    }
  },

  // Place a new order (supports single product or whole cart)
  async placeOrder(orderData) {
    try {
      const dbRef = ref(database, "orders");
      const newOrderRef = push(dbRef);
      const orderId = newOrderRef.key;
      
      const newOrder = {
        name: orderData.name,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address || "",
        items: orderData.items || [], // Array of products { id, name, price, quantity, branchId }
        totalAmount: orderData.totalAmount || 0,
        status: "pending",
        userId: orderData.userId || "guest",
        createdAt: new Date().toISOString(),
      };
      
      // Legacy support for older structure while transitioning
      if (orderData.productId) {
        newOrder.productId = orderData.productId;
        newOrder.productName = orderData.productName || "";
        newOrder.quantity = orderData.quantity || 1;
        newOrder.branchId = orderData.branchId || "";
        newOrder.totalAmount = orderData.totalAmount || (Number(orderData.price || 0) * Number(orderData.quantity || 1));
      }
      
      await set(newOrderRef, newOrder);
      return { id: orderId, ...newOrder };
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  },

  // Update an order's status
  async updateOrderStatus(orderId, newStatus) {
    try {
      const orderRef = ref(database, `orders/${orderId}/status`);
      await set(orderRef, newStatus);
      return true;
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  },

  // Cancel an order (shorthand for updateOrderStatus)
  async cancelOrder(orderId) {
    return this.updateOrderStatus(orderId, "cancelled");
  },

  // Delete an order
  async deleteOrder(orderId) {
    try {
      const orderRef = ref(database, `orders/${orderId}`);
      await remove(orderRef);
      return true;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  },
};
