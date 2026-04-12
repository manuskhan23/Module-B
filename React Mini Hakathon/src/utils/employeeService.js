// Service to manage employees using Firebase Realtime Database
import { database } from "../config/firebase";
import { ref, get, set, update, remove } from "firebase/database";

export const employeeService = {
  // Get all employees
  async getAllEmployees() {
    try {
      const dbRef = ref(database, "employees");
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
      console.error("Error fetching employees:", error);
      return [];
    }
  },

  // Add new employee
  async addEmployee(employeeData) {
    try {
      const employeeId = Date.now().toString();
      const newEmployeeRef = ref(database, `employees/${employeeId}`);
      const newEmployee = {
        name: employeeData.name,
        position: employeeData.position,
        branchId: employeeData.branchId,
        salary: employeeData.salary,
        createdAt: new Date().toISOString(),
      };

      await set(newEmployeeRef, newEmployee);
      return { id: employeeId, ...newEmployee };
    } catch (error) {
      console.error("Error adding employee:", error);
      throw error;
    }
  },

  // Update employee
  async updateEmployee(employeeId, employeeData) {
    try {
      const employeeRef = ref(database, `employees/${employeeId}`);
      await update(employeeRef, employeeData);
      return { id: employeeId, ...employeeData };
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  },

  // Delete employee
  async deleteEmployee(employeeId) {
    try {
      const employeeRef = ref(database, `employees/${employeeId}`);
      await remove(employeeRef);
      return true;
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  },
};
