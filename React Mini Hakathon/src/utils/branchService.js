// Service to manage branches using Firebase Realtime Database
import { database } from "../config/firebase";
import { ref, get, set, update, remove } from "firebase/database";

export const branchService = {
  // Get all branches
  async getAllBranches() {
    try {
      const dbRef = ref(database, "branches");
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Convert object to array
        return Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
      }
      return [];
    } catch (error) {
      console.error("Error fetching branches:", error);
      return [];
    }
  },

  // Add new branch
  async addBranch(branchData) {
    try {
      const branchId = Date.now().toString();
      const newBranchRef = ref(database, `branches/${branchId}`);
      const newBranch = {
        name: branchData.name,
        location: branchData.location,
        managerId: branchData.managerId,
        employees: branchData.employees || 0,
        revenue: branchData.revenue || 0,
        createdAt: new Date().toISOString().split("T")[0],
      };

      await set(newBranchRef, newBranch);
      return { id: branchId, ...newBranch };
    } catch (error) {
      console.error("Error adding branch:", error);
      throw error;
    }
  },

  // Delete branch
  async deleteBranch(branchId) {
    try {
      const branchRef = ref(database, `branches/${branchId}`);
      await remove(branchRef);
      return true;
    } catch (error) {
      console.error("Error deleting branch:", error);
      throw error;
    }
  },

  // Update branch
  async updateBranch(branchId, branchData) {
    try {
      const branchRef = ref(database, `branches/${branchId}`);
      await update(branchRef, branchData);
      return { id: branchId, ...branchData };
    } catch (error) {
      console.error("Error updating branch:", error);
      throw error;
    }
  },

  // Add profit to branch (for orders)
  async addProfitToBranch(branchId, amount) {
    try {
      const branchRef = ref(database, `branches/${branchId}`);
      const snapshot = await get(branchRef);
      
      if (snapshot.exists()) {
        const branch = snapshot.val();
        const currentProfit = Number(branch.totalProfit || 0);
        const currentOrders = Number(branch.totalOrders || 0);
        
        await update(branchRef, {
          totalProfit: currentProfit + Number(amount),
          totalOrders: currentOrders + 1
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error adding profit to branch:", error);
      throw error;
    }
  },

  // Get branch profit
  async getBranchProfit(branchId) {
    try {
      const branchRef = ref(database, `branches/${branchId}`);
      const snapshot = await get(branchRef);
      
      if (snapshot.exists()) {
        const branch = snapshot.val();
        return {
          totalProfit: Number(branch.totalProfit || 0),
          totalOrders: Number(branch.totalOrders || 0)
        };
      }
      return { totalProfit: 0, totalOrders: 0 };
    } catch (error) {
      console.error("Error getting branch profit:", error);
      return { totalProfit: 0, totalOrders: 0 };
    }
  }
};
