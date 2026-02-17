import { useState } from "react";
import Form from "react-bootstrap/Form";
import auth from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

function Signup() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res);
          toast.success("👍 signup Successfully!", {
            position: "bottom-left",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message, {
            position: "bottom-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        margin: 20,
      }}
    >
      <Form.Label htmlFor="">Full Name</Form.Label>
      <Form.Control
        onChange={(e) => setName(e.target.value)}
        className="w-50 mb-3"
        type="text"
        id=""
      />
      <br />
      <br />
      <Form.Label htmlFor="">City</Form.Label>
      <Form.Control
        onChange={(e) => setCity(e.target.value)}
        className="w-50 mb-3"
        type="text"
        id=""
      />
      <br />
      <br />
      <Form.Label htmlFor="">Email</Form.Label>
      <Form.Control
        onChange={(e) => setEmail(e.target.value)}
        className="w-50 mb-3"
        type="email"
        id=""
      />
      <br />
      <br />
      <Form.Label htmlFor="">Password</Form.Label>
      <Form.Control
        onChange={(e) => setPassword(e.target.value)}
        className="w-50 mb-3"
        type="password"
        id=""
      />
      <br />
      <br />
      <button onClick={submitHandler} className="btn btn-info">
        Signup
      </button>
    </div>
  );
}

export default Signup;
