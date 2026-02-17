import { useState } from "react";
import Input from "./Input";

const Login = ({ switchMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form className="p-4" onSubmit={submitHandler}>
      <h2 className="text-center mb-2">Welcome Back</h2>
      <p className="text-center text-muted mb-4">Login to continue</p>

      <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />

      <button className="btn btn-primary w-100">Login</button>

      <p className="text-center mt-3">
        No account?{" "}
        <span className="text-primary" style={{ cursor: "pointer" }} onClick={switchMode}>
          Create one
        </span>
      </p>
    </form>
  );
};

export default Login;