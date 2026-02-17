import { Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const EditUser = (props) => {
  const [singleUser, setSingleUser] = useState({});

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/" + id)
      .then((res) => {
        setSingleUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdate = () => {
    try {
      axios
        .put(`http://localhost:3000/users/${id}`, singleUser)
        .then((res) => {
          alert("user updated successfully");
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Paper sx={{ margin: 5, padding: 5 }} elevation={10}>
      <Typography sx={{ mb: 3 }} variant="h3">
        Edit User
      </Typography>

      <TextField
        onChange={(e) => setSingleUser({ ...singleUser, name: e.target.value })}
        value={singleUser.name}
        fullWidth
      />

      <br />
      <br />

      <TextField
        onChange={(e) =>
          setSingleUser({ ...singleUser, username: e.target.value })
        }
        value={singleUser.username}
        fullWidth
      />
      <br />
      <br />
      <TextField
        onChange={(e) =>
          setSingleUser({ ...singleUser, email: e.target.value })
        }
        value={singleUser.email}
        fullWidth
      />
      <br />
      <br />
      <TextField
        onChange={(e) =>
          setSingleUser({ ...singleUser, phone: e.target.value })
        }
        value={singleUser.phone}
        fullWidth
      />
      <br />
      <br />
      <TextField
        onChange={(e) =>
          setSingleUser({ ...singleUser, website: e.target.value })
        }
        value={singleUser.website}
        fullWidth
      />
      <Button onClick={handleUpdate} sx={{ mt: 3 }} variant="contained">
        Edit
      </Button>
    </Paper>
  );
};

export default EditUser;
