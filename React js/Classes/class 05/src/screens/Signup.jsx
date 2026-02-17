import { useState } from "react";
import Form from "react-bootstrap/Form";

function Signup() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {
    console.log(name);
    console.log(city);
    console.log(email);
    console.log(password);
  };

  return (
    <div
      style={{
        margin: 20,
      }}
    >
      <Form.Label htmlFor="">Full Name</Form.Label>
      <Form.Control
        onChange={(e) => setName(e.target.value)}
        className="w-50 mb-3"
        type="text"
        id=""
      />

      <Form.Label htmlFor="">City</Form.Label>
      <Form.Control
        onChange={(e) => setCity(e.target.value)}
        className="w-50 mb-3"
        type="text"
        id=""
      />

      <Form.Label htmlFor="">Email</Form.Label>
      <Form.Control
        onChange={(e) => setEmail(e.target.value)}
        className="w-50 mb-3"
        type="email"
        id=""
      />

      <Form.Label htmlFor="">Password</Form.Label>
      <Form.Control
        onChange={(e) => setPassword(e.target.value)}
        className="w-50 mb-3"
        type="password"
        id=""
      />

      <button onClick={submitHandler} className="btn btn-info">
        Signup
      </button>
    </div>
  );
}

export default Signup;
