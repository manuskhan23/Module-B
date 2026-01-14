import React from "react";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  let navigate = useNavigate();

  return (
    <>
      <h1>Contact Page</h1>

      <br />

      <button onClick={() => navigate("/about")}>About page</button>
      <br />
      <br />
      <button onClick={() => navigate("/")}>Home page</button>
      <br />
      <br />
      <button onClick={() => navigate("/profile")}>Profile page</button>
    </>
  );
};

export default Contact;
