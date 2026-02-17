import React from 'react';
import './Login.css';
import logo from './dd.png'
import fjj from './we.png'
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="apple-login-container">
      {/* Top Left Branding */}
      <header className="icloud-branding">
        <i className="fa-brands fa-apple"></i>
        <span>iCloud</span>
      </header>

      <main className="login-content">
        <div className="login-card-bg">
          <div className="login-card-inner">
            {/* Round Gradient Logo */}
            <div className="logo-box">
              <img src={logo} alt="Apple Account" className="apple-acc-logo" />
            </div>

            <h1 className="login-heading">Sign in with Apple Account</h1>

            <div className="login-form">
              <input 
                type="text" 
                placeholder="Email or Phone Number" 
                className="apple-input-field" 
              />
              <Link to="/SignUp" className="apple-blue-link">Create Your Apple Account</Link>
            </div>

            {/* Privacy Section */}
            <div className="privacy-block">
              <img src={fjj} alt="Privacy" className="privacy-symbol" />
              <p className="privacy-text">
                Your Apple Account information is used to allow you to sign in securely and access your data. 
                <a href="#"> See how your data is managed...</a>
              </p>
            </div>

            {/* Buttons */}
            <div className="action-row">
              <button className="btn-apple-continue">Continue</button>
              <button className="btn-apple-iphone">
                <i className="fa-solid fa-user-group"></i>
                Sign in with iPhone
              </button>
            </div>

            <p className="os-requirement">Requires a device with iOS 17 or later.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;