import React from 'react';
import './SignUp.css';
import LOGO_IMG from './dd.png';
import PRIVACY_ICON from './we.png'; 
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="apple-signup-page">
      <header className="icloud-header">
        <i className="fa-brands fa-apple"></i>
        <span>iCloud</span>
      </header>

      <main className="signup-content">
        <div className="signup-card">
          <div className="signup-inner">
            {/* Round Logo at the top */}
            <div className="signup-logo-container">
               <img src={LOGO_IMG} alt="" className="signup-main-logo" />
            </div>

            <h1 className="signup-title">Create Your Apple Account</h1>
            <p className="signup-subtitle">One account is all you need to access all Apple services.</p>
            <div className="signup-form-grid">
              <div className="input-row">
                <input type="text" placeholder="First Name" className="signup-input" />
                <input type="text" placeholder="Last Name" className="signup-input" />
              </div>

              <div className="section-label">COUNTRY / REGION</div>
              <select className="signup-select">
                <option>United States</option>
                <option>Pakistan</option>
                <option>United Kingdom</option>
              </select>

              <input type="date" className="signup-input full-width" />
              
              <div className="separator"></div>

              <input type="email" placeholder="name@example.com" className="signup-input full-width" />
              
              <div className="input-row">
                <input type="password" placeholder="Password" className="signup-input" />
                <input type="password" placeholder="Confirm Password" className="signup-input" />
              </div>
            </div>

            <div className="signup-privacy">
              <img src={PRIVACY_ICON} alt="" className="privacy-icon-small" />
              <p>
                Your Apple Account information is used to allow you to sign in securely and access your data. 
                <a href="#" className="apple-link"> See how your data is managed...</a>
              </p>
            </div>

            <div className="signup-actions">
              <button className="btn-signup-continue">Continue</button>
            </div>

            {/* Link for users who already have an account */}
            <div className="existing-account-link">
              <span>Already have an Apple Account? </span>
              <Link to="/Login" className="apple-link">Sign in here</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;