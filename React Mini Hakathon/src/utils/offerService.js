// Service to manage offers using Firebase Realtime Database
import { database } from "../config/firebase";
import { ref, get, set, update, remove } from "firebase/database";

export const offerService = {
  // Get all offers
  async getAllOffers() {
    try {
      const dbRef = ref(database, "offers");
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
      console.error("Error fetching offers:", error);
      return [];
    }
  },

  // Add new offer
  async addOffer(offerData) {
    try {
      const offerId = Date.now().toString();
      const newOfferRef = ref(database, `offers/${offerId}`);
      const newOffer = {
        title: offerData.title,
        discount: offerData.discount,
        description: offerData.description,
        createdAt: new Date().toISOString(),
      };

      await set(newOfferRef, newOffer);
      return { id: offerId, ...newOffer };
    } catch (error) {
      console.error("Error adding offer:", error);
      throw error;
    }
  },

  // Update offer
  async updateOffer(offerId, offerData) {
    try {
      const offerRef = ref(database, `offers/${offerId}`);
      await update(offerRef, offerData);
      return { id: offerId, ...offerData };
    } catch (error) {
      console.error("Error updating offer:", error);
      throw error;
    }
  },

  // Delete offer
  async deleteOffer(offerId) {
    try {
      const offerRef = ref(database, `offers/${offerId}`);
      await remove(offerRef);
      return true;
    } catch (error) {
      console.error("Error deleting offer:", error);
      throw error;
    }
  },
};
