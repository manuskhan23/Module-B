// Service to manage inventory using Firebase Realtime Database
import { database } from "../config/firebase";
import { ref, get, set, update, remove } from "firebase/database";

export const inventoryService = {
  // Get all inventory items
  async getAllInventory() {
    try {
      const dbRef = ref(database, "inventory");
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
      console.error("Error fetching inventory:", error);
      return [];
    }
  },

  // Add new inventory item
  async addInventory(inventoryData) {
    try {
      const itemId = Date.now().toString();
      const newItemRef = ref(database, `inventory/${itemId}`);
      const newItem = {
        branchId: inventoryData.branchId,
        product: inventoryData.product,
        quantity: inventoryData.quantity,
        unit: inventoryData.unit,
        createdAt: new Date().toISOString(),
      };

      await set(newItemRef, newItem);
      return { id: itemId, ...newItem };
    } catch (error) {
      console.error("Error adding inventory:", error);
      throw error;
    }
  },

  // Update inventory item
  async updateInventory(itemId, inventoryData) {
    try {
      const itemRef = ref(database, `inventory/${itemId}`);
      await update(itemRef, inventoryData);
      return { id: itemId, ...inventoryData };
    } catch (error) {
      console.error("Error updating inventory:", error);
      throw error;
    }
  },

  // Delete inventory item
  async deleteInventory(itemId) {
    try {
      const itemRef = ref(database, `inventory/${itemId}`);
      await remove(itemRef);
      return true;
    } catch (error) {
      console.error("Error deleting inventory:", error);
      throw error;
    }
  },
};
