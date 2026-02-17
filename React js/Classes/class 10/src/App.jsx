import { Route, Routes } from "react-router-dom";
import Signup from "./screens/Signup";               
import Login from "./screens/Login";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Home from "./screens/Home";
import Auth_Route from "./protected_routes/Auth_Route";
import Auth_Route2 from "./protected_routes/Auth_Route2";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Auth_Route />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<Auth_Route2 />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
