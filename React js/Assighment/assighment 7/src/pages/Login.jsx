import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/Input";
import styles from "../styles/Login-Signup.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className={styles.login}>
      <div>
        <h1>Welcome Back</h1>
        <p>Sign in to your Apple account</p>

        <form onSubmit={handleLogin}>
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

          <button type="submit">Sign In</button>
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#64748b", fontSize: "14px" }}>
          Don't have an account?{" "}
          <Link to="/signup" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: "600" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
