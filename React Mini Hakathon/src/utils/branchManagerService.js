// Service to manage branch manager credentials using Firebase Realtime Database
import { database } from "../config/firebase";
import { ref, get, set, update, remove, child } from "firebase/database";

export const branchManagerService = {
  // Get all branch managers
  async getAllManagers() {
    try {
      const dbRef = ref(database, "branchManagers");
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
      console.error("Error fetching managers:", error);
      return [];
    }
  },

  // Add new branch manager
  async addManager(managerData) {
    try {
      const newManagerRef = ref(database, `branchManagers/${Date.now()}`);
      const newManager = {
        email: managerData.email,
        password: managerData.password,
        name: managerData.name,
        createdAt: new Date().toISOString().split("T")[0],
      };

      await set(newManagerRef, newManager);
      return { id: Date.now(), ...newManager };
    } catch (error) {
      console.error("Error adding manager:", error);
      throw error;
    }
  },

  // Verify manager credentials
  async verifyManagerCredentials(email, password) {
    try {
      const managers = await this.getAllManagers();
      console.log("Verifying manager credentials for email:", email);
      console.log("Managers in database:", managers);
      
      const manager = managers.find((m) => m.email === email);
      console.log("Found manager:", manager);

      if (!manager) {
        console.log("Email not found in managers database");
        return { success: false, error: "Email not registered as a branch manager" };
      }

      if (manager.password !== password) {
        console.log("Password mismatch. Expected:", manager.password, "Got:", password);
        return { success: false, error: "Incorrect password for this email" };
      }

      console.log("Manager verification successful!");
      return { success: true, manager };
    } catch (error) {
      console.error("Error verifying credentials:", error);
      return { success: false, error: "Verification failed" };
    }
  },

  // Delete manager
  async deleteManager(managerId) {
    try {
      const managerRef = ref(database, `branchManagers/${managerId}`);
      await remove(managerRef);
      return true;
    } catch (error) {
      console.error("Error deleting manager:", error);
      throw error;
    }
  },

  // Update manager
  async updateManager(managerId, managerData) {
    try {
      const managerRef = ref(database, `branchManagers/${managerId}`);
      await update(managerRef, managerData);
      return { id: managerId, ...managerData };
    } catch (error) {
      console.error("Error updating manager:", error);
      throw error;
    }
  },
};
