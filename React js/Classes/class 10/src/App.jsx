import { Route, Routes } from "react-router-dom";
import About from "./screens/About";
import Home from "./screens/Home";
// import SingleUser from "./screens/SingleUser";
import Contact from "./screens/Contact";
import Profile from "./screens/Profile";
import AllUsers from "./screens/AllUsers";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./screens/Signup";

function App() {
  // basic routing
  // dynamic routing
  // nested routing
  // protected routing (firebase auth complete)

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/allusers" element={<AllUsers />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
