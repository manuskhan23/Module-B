import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";

const TodoApp = () => {
  let [todoItem, setTodoItem] = useState("");
  let [todoArr, setTodoArr] = useState([]);
  let [refresh, setRefresh] = useState(false);

  const getAllData = async () => {
    try {
      let arr = [];
      const getData = await getDocs(collection(db, "todos"));

      getData.forEach((e, i) => {
        arr.push(e.data());
        setTodoArr([...arr]);
      });
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, [refresh]);

  const saveTodo = async () => {
    try {
      let Uid = Math.round(Math.random() * 14515615616).toString();

      let todoObj = {
        todoItem,
        Uid,
      };

      await setDoc(doc(db, "todos", Uid), todoObj);
      console.log("todo added...");
      setRefresh(!refresh);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      await deleteDoc(doc(db, "todos", id));
      console.log("delete todo...");
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async (id) => {
    try {
      let promptData = prompt("Enter updated value..");

      let obj = {
        Uid: id,
        todoItem: promptData,
      };
      await updateDoc(doc(db, "todos", id), obj);
      console.log("update todo...");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Paper sx={{ marginTop: 10, padding: 10 }} elevation={16}>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 5 }}>
        Todo Application
      </Typography>

      <TextField
        onChange={(e) => setTodoItem(e.target.value)}
        fullWidth
        label="Enter items..."
      />

      <Button
        onClick={saveTodo}
        sx={{ mt: 3 }}
        fullWidth
        variant="contained"
        color="success"
      >
        Add Items
      </Button>

      {todoArr &&
        todoArr.map((e, i) => {
          return (
            <div key={i}>
              <li>
                {e.todoItem}

                <Button
                  onClick={() => editData(e.Uid)}
                  sx={{ marginRight: 2, marginLeft: 2 }}
                  variant="contained"
                  color="warning"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteData(e.Uid)}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </li>
            </div>
          );
        })}
    </Paper>
  );
};

export default TodoApp;
