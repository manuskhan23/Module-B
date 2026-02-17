import { Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const CreateUser = () => {
  const navigate = useNavigate();

  let [userObj, setUserObj] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  const handleSubmit = () => {
    try {
      axios
        .post(`http://localhost:3000/users`, userObj)
        .then((res) => {
          alert("user created successfully");
          navigate("/home");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper sx={{ margin: 5, padding: 5 }} elevation={10}>
      <Typography sx={{ mb: 3 }} variant="h3">
        Create User
      </Typography>

      <TextField
        onChange={(e) => 
            setUserObj(
                { ...userObj, 
                name: e.target.value })}
        fullWidth
        label="Enter name"
      />

      <br />
      <br />

      <TextField
        onChange={(e) => setUserObj({ ...userObj, username: e.target.value })}
        fullWidth
        label="Enter username"
      />
      <br />
      <br />
      <TextField
        onChange={(e) => setUserObj({ ...userObj, email: e.target.value })}
        fullWidth
        label="Enter email"
      />
      <br />
      <br />
      <TextField
        onChange={(e) => setUserObj({ ...userObj, phone: e.target.value })}
        fullWidth
        label="Enter phone"
      />
      <br />
      <br />
      <TextField
        onChange={(e) => setUserObj({ ...userObj, website: e.target.value })}
        fullWidth
        label="Enter website"
      />

      <Button
        onClick={handleSubmit}
        sx={{ mt: 3 }}
        color="success"
        variant="contained"
      >
        Create
      </Button>
    </Paper>
  );
};

export default CreateUser;
