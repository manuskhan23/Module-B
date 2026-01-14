import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Input from "./Input";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const val = (e) => {
    e.preventDefault();
    const data = {
      name: username,
      email: email,
      password: password,
    };
    console.log(data);
  };

  return (
    <>
      <Form onSubmit={val}>
        <Input
          labels="Username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          labels="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          labels="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <br /><br /><br />

      <div>
        <p>
          Name <b>{username}</b>
        </p>
        <p>
          Email <b>{email}</b>
        </p>
        <p>
          Password <b>{password}</b>
        </p>
      </div>
    </>
  );
}

export default Signup;
