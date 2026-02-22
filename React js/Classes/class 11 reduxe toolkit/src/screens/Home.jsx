import Button from "@mui/material/Button";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const Home = () => {
  let [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const getAllData = async () => {
    try {
      const getData = await getDocs(collection(db, "register_users"));

      getData.forEach((e, i) => {
        console.log(e.data());
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const saveData = async () => {
    try {
      // setDoc()

      const Uid = Math.round(Math.random() * 14515615616).toString();

      delete userData.password;

      await setDoc(doc(db, "register_users", Uid), userData);

      console.log("data create successfully..");

      // addDoc()
    } catch (err) {
      console.log(err);
    }
  };

  const getSingleData = async () => {
    try {
      const getData = await getDoc(doc(db, "register_users", "13638082519"));

      console.log(getData.data());
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    try {
      await updateDoc(doc(db, "register_users", "2679302427"), {
        email: "ali55@gmail.com",
        username: "ali555 update",
      });

      console.log("data updated...");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async () => {
    try {
      await deleteDoc(doc(db, "register_users", "2679302427"));

      console.log("data deleted...");
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
          Create
        </Button>
        <br />
        <br />
        <Button onClick={getSingleData} variant="outlined" color="success">
          Get Single Data
        </Button>
        <br />
        <br />
        <Button onClick={updateData} variant="outlined" color="secondary">
          Update Data
        </Button>
        <br />
        <br />
        <Button onClick={deleteData} variant="outlined" color="error">
          Delete Data
        </Button>
      </Paper>

      {/* <Header />

      <HeroSection />

      <Section /> */}
    </div>
  );
};

export default Home;
