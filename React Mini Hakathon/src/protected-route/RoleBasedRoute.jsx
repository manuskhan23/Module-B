import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { getRoleFromEmail, canAccessRoute } from "../utils/roleCheck";

export default function RoleBasedRoute({ children, requiredRoles }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Try to get role from localStorage first
        let role = localStorage.getItem("userRole");
        
        if (!role) {
          // Fallback to email-based role detection
          role = getRoleFromEmail(currentUser.email);
        }
        
        console.log("User email:", currentUser.email);
        console.log("Detected role:", role);
        console.log("Required roles:", requiredRoles);
        setUser(currentUser);
        setUserRole(role);
      } else {
        setUser(null);
        setUserRole(null);
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [requiredRoles]);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontSize: "18px",
        color: "#667eea"
      }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!canAccessRoute(userRole, requiredRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
