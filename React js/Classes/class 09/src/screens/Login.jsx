import { useState } from "react";
import Form from "react-bootstrap/Form";
import auth from "../config/firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGithub = () => {
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        margin: 20,
      }}
    >
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
        Login
      </button>

      <button onClick={handleGoogle}>Login Google</button>

      <button onClick={handleGithub}>Login Github</button>
    </div>
  );
}

export default Login;
