// Service to manage user profiles and manager assignments
import { database } from "../config/firebase";
import { ref, get, set, update, remove } from "firebase/database";

export const userProfileService = {
  // Get user profile by Firebase UID
  async getUserProfile(uid) {
    try {
      const dbRef = ref(database, `userProfiles/${uid}`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  },

  // Create or update user profile with manager info
  async createManagerProfile(uid, managerData) {
    try {
      const profileRef = ref(database, `userProfiles/${uid}`);
      const userProfile = {
        uid,
        email: managerData.email,
        name: managerData.name,
        role: "branch_manager",
        managerId: managerData.managerId, // ID from branchManagers collection
        branchId: managerData.branchId || null, // Assigned branch
        createdAt: new Date().toISOString(),
      };

      await set(profileRef, userProfile);
      console.log("Manager profile created for uid:", uid);
      return userProfile;
    } catch (error) {
      console.error("Error creating manager profile:", error);
      throw error;
    }
  },

  // Update user profile
  async updateUserProfile(uid, profileData) {
    try {
      const profileRef = ref(database, `userProfiles/${uid}`);
      await update(profileRef, profileData);
      return true;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },

  // Delete user profile
  async deleteUserProfile(uid) {
    try {
      const profileRef = ref(database, `userProfiles/${uid}`);
      await remove(profileRef);
      return true;
    } catch (error) {
      console.error("Error deleting user profile:", error);
      throw error;
    }
  },
};
