import React from "react";
import { Routes, Route } from "react-router-dom";         
import UsersHome from "./screens/UsersHome";
import CreateUser from "./screens/CreateUser";
import EditUser from "./screens/EditUser";

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<UsersHome />} />
      <Route path="/create-user" element={<CreateUser />} />
      <Route path="/edit-user/:id" element={<EditUser />} />
    </Routes>
  );
};

export default App;
