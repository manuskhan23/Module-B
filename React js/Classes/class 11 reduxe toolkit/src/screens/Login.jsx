import Button from "@mui/material/Button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleAuth = () => {
    try {
      const provider = new GoogleAuthProvider();

      signInWithPopup(auth, provider)
        .then((res) => {
          const Uid = res.user.uid;

          localStorage.setItem("Auth_id", Uid);

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
    <div>
      <Button onClick={handleAuth} sx={{ margin: 15 }} variant="contained">
        Login Google
      </Button>
    </div>
  );
};

export default Login;
