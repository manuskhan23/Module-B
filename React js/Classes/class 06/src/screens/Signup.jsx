import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Input from "../components/Input";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  const submit = (event) => {
    event.preventDefault();
    console.log(name);
    console.log(email);
    console.log(city);
    console.log(password);
  };

  return (
    <Form onSubmit={submit}>
      <Input
        ONCHANGE={(e) => setName(e.target.value)}
        label="Enter Name"
        type="text"
      />
      <Input
        ONCHANGE={(e) => setCity(e.target.value)}
        label="Enter city"
        type="text"
      />
      <Input
        ONCHANGE={(e) => setEmail(e.target.value)}
        label="Enter Email"
        type="email"
      />
      <Input
        ONCHANGE={(e) => setPassword(e.target.value)}
        label="Enter Password"
        type="password"
      />

      <button className="mt-4  w-100 btn btn-warning">Signup</button>
    </Form>
  );
};

export default Signup;
