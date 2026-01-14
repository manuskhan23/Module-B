import { useState } from "react";
import Input from "./Input";

const Signup = ({ switchMode }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    birthday: ""
  });

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form className="p-4" onSubmit={submitHandler}>
      <h2 className="text-center mb-2">Create Account</h2>
      <p className="text-center text-muted mb-4">Join the platform</p>

      <Input label="Full Name" type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <Input label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <Input label="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <Input label="Mobile Number" type="tel" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} />
      <Input label="Birthday" type="date" value={form.birthday} onChange={e => setForm({ ...form, birthday: e.target.value })} />

      <button className="btn btn-success w-100">Sign Up</button>

      <p className="text-center mt-3">
        Already have an account?{" "}
        <span className="text-primary" style={{ cursor: "pointer" }} onClick={switchMode}>
          Login
        </span>
      </p>
    </form>
  );
};

export default Signup;