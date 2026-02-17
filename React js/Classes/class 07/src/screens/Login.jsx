import React, { useState } from "react";
import Input from "../components/Input";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [gatherData, setGatherData] = useState([]);

  const submitHandler = () => {
    setGatherData([...gatherData, userData]);

    navigate("/dashboard");
  };

  console.log(gatherData);

  return (
    <div className="mt-5 mx-3">
      <h1>Login Component</h1>

      <Input
        ONCHANGE={(e) => {
          setUserData({ ...userData, userName: e.target.value });
        }}
        label="Enter Name"
        type="text"
      />
      <Input
        ONCHANGE={(e) => {
          setUserData({ ...userData, email: e.target.value });
        }}
        label="Enter Email"
        type="email"
      />
      <Input
        ONCHANGE={(e) => {
          setUserData({ ...userData, password: e.target.value });
        }}
        label="Enter password"
        type="password"
      />

      <button onClick={submitHandler} className="mt-4 w-100 btn btn-danger">
        Login
      </button>

      <Table className="mt-5" striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {gatherData &&
            gatherData.map((e, i) => {
              return (
                <tr>
                  <td>{i}</td>
                  <td>{e.userName}</td>
                  <td>{e.email}</td>
                  <td>{e.password}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default Login;
