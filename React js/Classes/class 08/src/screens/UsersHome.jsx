import axios from "axios";
import { useEffect, useState } from "react";
import Tables from "../components/Table";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

const UsersHome = () => {
  let [userData, setUserData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/users")
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Button
        onClick={() => navigate("/create-user")}
        sx={{ float: "right", my: 2 }}
        variant="contained"
      >
        Create User
      </Button>
      <Tables userData={userData} />;
    </div>
  );
};

export default UsersHome;
