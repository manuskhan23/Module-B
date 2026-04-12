// Role-based access control utilities
import { branchManagerService } from "./branchManagerService";

export const ROLES = {
  ADMIN: "admin",
  BRANCH_MANAGER: "branch_manager",
  USER: "user"
};

export const getRoleFromEmail = (email) => {
  if (email?.includes("admin@")) return ROLES.ADMIN;
  if (email?.includes("manager@")) return ROLES.BRANCH_MANAGER;
  return ROLES.USER;
};

// Check if email is a registered branch manager
export const getRoleFromEmailAsync = async (email) => {
  if (email?.includes("admin@")) return ROLES.ADMIN;
  if (email?.includes("manager@")) return ROLES.BRANCH_MANAGER;
  
  // Check if email is in branchManagers database
  try {
    const managers = await branchManagerService.getAllManagers();
    console.log("All managers in database:", managers);
    const foundManager = managers.find((m) => m.email === email);
    console.log("Found manager for email", email, ":", foundManager);
    if (foundManager) {
      return ROLES.BRANCH_MANAGER;
    }
  } catch (error) {
    console.error("Error checking manager status:", error);
  }
  
  return ROLES.USER;
};

export const canAccessRoute = (userRole, requiredRole) => {
  if (typeof requiredRole === "string") {
    return userRole === requiredRole;
  }
  return requiredRole.includes(userRole);
};

// Inventory Management Permissions
export const inventoryPermissions = {
  // Only ADMIN can add inventory
  canAddInventory: (userRole) => userRole && userRole === ROLES.ADMIN,
  
  // Only ADMIN can delete inventory
  canDeleteInventory: (userRole) => userRole && userRole === ROLES.ADMIN,
  
  // BRANCH_MANAGER and ADMIN can view and edit
  canViewInventory: (userRole) => 
    userRole && [ROLES.BRANCH_MANAGER, ROLES.ADMIN].includes(userRole),
  
  // BRANCH_MANAGER and ADMIN can edit inventory (update quantity, mark as low stock)
  canEditInventory: (userRole) => 
    userRole && [ROLES.BRANCH_MANAGER, ROLES.ADMIN].includes(userRole),
  
  // BRANCH_MANAGER and ADMIN can mark/highlight low stock products
  canMarkLowStock: (userRole) => 
    userRole && [ROLES.BRANCH_MANAGER, ROLES.ADMIN].includes(userRole)
};
