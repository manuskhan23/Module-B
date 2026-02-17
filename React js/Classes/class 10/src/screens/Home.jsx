import Button from "@mui/material/Button";
import { Header } from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import Section from "../Components/Section";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const Home = () => {
  let [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const saveData = async () => {
    try {
      console.log(userData);

      let uid = Math.round(Math.random() * 415454151515).toString();

      // await setDoc(doc(db, "register", uid), userData);

      await addDoc(collection(db, "register"), userData);

      alert("register user successfully...");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ margin: 10 }}>
      <Paper sx={{ padding: 5 }} elevation={16}>
        <Typography sx={{ mb: 3, textAlign: "center" }} variant="h4">
          Create User
        </Typography>
        <TextField
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
          fullWidth
          label="Username"
        />
        <br />
        <br />
        <TextField
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          fullWidth
          label="Email"
        />
        <br />
        <br />
        <TextField
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          fullWidth
          label="Password"
        />
        <br />
        <br />
        <Button onClick={saveData} variant="outlined" color="warning">
          Signup
        </Button>
      </Paper>

      {/* <Header />

      <HeroSection />

      <Section /> */}
    </div>
  );
};

export default Home;
