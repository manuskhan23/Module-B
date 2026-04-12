import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { getRoleFromEmail } from "../utils/roleCheck";

export default function PublicRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        fontSize: "18px",
        color: "#2ecc71"
      }}>
        Loading...
      </div>
    );
  }

  if (user) {
    // Try to get role from localStorage first
    let role = localStorage.getItem("userRole");
    
    if (!role) {
      // Fallback to email-based role detection
      role = getRoleFromEmail(user.email);
    }
    
    const dashboardRoute = {
      admin: "/admin/dashboard",
      branch_manager: "/branch/dashboard",
      user: "/user/dashboard"
    }[role] || "/user/dashboard";

    return <Navigate to={dashboardRoute} replace />;
  }

  return children;
}
