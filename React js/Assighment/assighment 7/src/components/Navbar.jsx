// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="apple-navbar">
      <div className="nav-container">
        
        {/* Apple Icon */}
        <Link to="/" className="nav-icon">
          <i className="fab fa-apple"></i>
        </Link>

        {/* Nav Links */}
        <ul className="nav-links">
          <li><a className="auth-link" href="#">Store</a></li>
          <li><a className="auth-link" href="#">Mac</a></li>
          <li><a className="auth-link" href="#">iPad</a></li>
          <li><a className="auth-link" href="#">iPhone</a></li>
          <li><a className="auth-link" href="#">Watch</a></li>
          <li><a className="auth-link" href="#">Vision</a></li>
          <li><a className="auth-link" href="#">AirPods</a></li>
          <li><a className="auth-link" href="#">TV & Home</a></li>
          <li><a className="auth-link" href="#">Entertainment</a></li>
          <li><a className="auth-link" href="#">Accessories</a></li>
          <li><a className="auth-link" href="#">Support</a></li>
        </ul>

        {/* Right Icons */}
        <div className="nav-actions">
          <a href="#">
            <i className="fas fa-search"></i>
          </a>
          <a href="#">
            <i className="fas fa-shopping-bag"></i>
          </a>
          <Link to="/signup" className="auth-link">Signup</Link>
          <Link to="/login" className="auth-link">Login</Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
