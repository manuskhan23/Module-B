import { Route, Routes } from "react-router-dom";
import About from "./screens/About";                  
import Home from "./screens/Home";
import Contact from "./screens/Contact";
import Profile from "./screens/Profile"; 
import AllUsers from "./screens/AllUsers";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./screens/Signup";
import Products from "./screens/Products";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import Dashboard from "./screens/Dashboard";
import Announcement from "./screens/Announcement";
import Settings from "./screens/Settings";
import MainHomeComponent from "./screens/MainHomeComponent";

function App() {
  return ( 
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<MainHomeComponent />} />
        <Route path="announcement" element={<Announcement />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
