import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import styles from "../styles/Login-Signup.module.css";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (firstName && lastName && email && password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert("Account created successfully!");
      navigate("/login");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className={styles.login}>
      <div>
        <h1>Create Account</h1>
        <p>Join Apple and explore amazing products</p>

        <form onSubmit={handleSignup}>
          <Input
            labels="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
          />

          <Input
            labels="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
          />

          <Input
            labels="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <Input
            labels="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <Input
            labels="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
          />

          <button type="submit">Create Account</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#64748b", fontSize: "14px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: "600" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
