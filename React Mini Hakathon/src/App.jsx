import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import ProtectedRoute from "./protected-route/ProtectedRoute";
import PublicRoute from "./protected-route/PublicRoute";
import RoleBasedRoute from "./protected-route/RoleBasedRoute";
import { ROLES } from "./utils/roleCheck";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
// User pages
import UserDashboard from "./pages/user/UserDashboard";
import Products from "./pages/user/Products";
import PlaceOrder from "./pages/user/PlaceOrder";
import UserReviews from "./pages/user/UserReviews";
import SubmitReview from "./pages/user/SubmitReview";
import OrderHistory from "./pages/user/OrderHistory";
import UserOffers from "./pages/user/UserOffers";
// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import BranchManagement from "./pages/admin/BranchManagement";
import ProductManagement from "./pages/admin/ProductManagement";
import InventoryManagement from "./pages/admin/InventoryManagement";
import OfferManagement from "./pages/admin/OfferManagement";
import BranchManagersManagement from "./pages/admin/BranchManagersManagement";
// Branch Manager pages
import BranchDashboard from "./pages/branch/BranchDashboard";
import BranchInventory from "./pages/branch/BranchInventory";
import BranchEmployees from "./pages/branch/BranchEmployees";
import BranchReviews from "./pages/branch/BranchReviews";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* Public Routes (only accessible if not logged in) */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* User Routes */}
        <Route path="/user/dashboard" element={<RoleBasedRoute requiredRoles={ROLES.USER}><UserDashboard /></RoleBasedRoute>} />
        <Route path="/user/products" element={<RoleBasedRoute requiredRoles={ROLES.USER}><Products /></RoleBasedRoute>} />
        <Route path="/user/order" element={<RoleBasedRoute requiredRoles={ROLES.USER}><PlaceOrder /></RoleBasedRoute>} />
        <Route path="/user/reviews" element={<RoleBasedRoute requiredRoles={ROLES.USER}><UserReviews /></RoleBasedRoute>} />
        <Route path="/user/submit-review" element={<RoleBasedRoute requiredRoles={ROLES.USER}><SubmitReview /></RoleBasedRoute>} />
        <Route path="/user/orders" element={<RoleBasedRoute requiredRoles={ROLES.USER}><OrderHistory /></RoleBasedRoute>} />
        <Route path="/user/offers" element={<RoleBasedRoute requiredRoles={ROLES.USER}><UserOffers /></RoleBasedRoute>} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<RoleBasedRoute requiredRoles={ROLES.ADMIN}><AdminDashboard /></RoleBasedRoute>} />
        <Route path="/admin/branches" element={<RoleBasedRoute requiredRoles={ROLES.ADMIN}><BranchManagement /></RoleBasedRoute>} />
        <Route path="/admin/products" element={<RoleBasedRoute requiredRoles={ROLES.ADMIN}><ProductManagement /></RoleBasedRoute>} />
        <Route path="/admin/inventory" element={<RoleBasedRoute requiredRoles={ROLES.ADMIN}><InventoryManagement /></RoleBasedRoute>} />
        <Route path="/admin/employees" element={<RoleBasedRoute requiredRoles={ROLES.ADMIN}><BranchEmployees /></RoleBasedRoute>} />
        <Route path="/admin/offers" element={<RoleBasedRoute requiredRoles={ROLES.ADMIN}><OfferManagement /></RoleBasedRoute>} />
        <Route path="/admin/managers" element={<RoleBasedRoute requiredRoles={ROLES.ADMIN}><BranchManagersManagement /></RoleBasedRoute>} />

        {/* Branch Manager Routes */}
        <Route path="/branch/dashboard" element={<RoleBasedRoute requiredRoles={ROLES.BRANCH_MANAGER}><BranchDashboard /></RoleBasedRoute>} />
        <Route path="/branch/products" element={<RoleBasedRoute requiredRoles={[ROLES.BRANCH_MANAGER, ROLES.ADMIN]}><ProductManagement /></RoleBasedRoute>} />
        <Route path="/branch/inventory" element={<RoleBasedRoute requiredRoles={[ROLES.BRANCH_MANAGER, ROLES.ADMIN]}><BranchInventory /></RoleBasedRoute>} />
        <Route path="/branch/employees" element={<RoleBasedRoute requiredRoles={[ROLES.BRANCH_MANAGER, ROLES.ADMIN]}><BranchEmployees /></RoleBasedRoute>} />
        <Route path="/branch/reviews" element={<RoleBasedRoute requiredRoles={ROLES.BRANCH_MANAGER}><BranchReviews /></RoleBasedRoute>} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Catch all - 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Router>
    </Provider>
  );
}

export default App;
