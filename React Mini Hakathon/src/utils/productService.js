// Service to manage products using Firebase Realtime Database
import { database } from "../config/firebase";
import { ref, get, set, update, remove } from "firebase/database";

export const productService = {
  // Get all products
  async getAllProducts() {
    try {
      const dbRef = ref(database, "products");
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
      console.error("Error fetching products:", error);
      return [];
    }
  },

  // Add new product
  async addProduct(productData) {
    try {
      const productId = Date.now().toString();
      const newProductRef = ref(database, `products/${productId}`);
      const newProduct = {
        name: productData.name,
        price: productData.price,
        category: productData.category,
        imageUrl: productData.imageUrl || "",
        createdAt: new Date().toISOString(),
      };

      await set(newProductRef, newProduct);
      return { id: productId, ...newProduct };
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  },

  // Update product
  async updateProduct(productId, productData) {
    try {
      const productRef = ref(database, `products/${productId}`);
      await update(productRef, productData);
      return { id: productId, ...productData };
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  },

  // Delete product
  async deleteProduct(productId) {
    try {
      const productRef = ref(database, `products/${productId}`);
      await remove(productRef);
      return true;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  },
};
