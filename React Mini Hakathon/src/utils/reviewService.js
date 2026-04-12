// Service to manage branch reviews using Firebase Realtime Database
import { database } from "../config/firebase";
import { ref, get, set, remove } from "firebase/database";

export const reviewService = {
  // Get all reviews
  async getAllReviews() {
    try {
      const dbRef = ref(database, "reviews");
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
      console.error("Error fetching reviews:", error);
      return [];
    }
  },

  // Add new review
  async addReview(reviewData) {
    try {
      const reviewId = Date.now().toString();
      const newReviewRef = ref(database, `reviews/${reviewId}`);
      const newReview = {
        branchId: reviewData.branchId,
        branchName: reviewData.branchName || "Branch Store",
        rating: reviewData.rating,
        comment: reviewData.comment,
        userId: reviewData.userId || "anonymous",
        userName: reviewData.userName || "Guest",
        userPhoto: reviewData.userPhoto || "",
        date: new Date().toISOString().split("T")[0],
        createdAt: new Date().toISOString()
      };

      await set(newReviewRef, newReview);
      return { id: reviewId, ...newReview };
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  },

  // Delete review
  async deleteReview(reviewId) {
    try {
      const reviewRef = ref(database, `reviews/${reviewId}`);
      await remove(reviewRef);
      return true;
    } catch (error) {
      console.error("Error deleting review:", error);
      throw error;
    }
  },
};
