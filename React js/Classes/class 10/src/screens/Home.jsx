import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Home page</h1>
      <ul>
        <li>
          <Link to="/about">about page</Link>
        </li>
        <li>
          <Link to="/contact">contact page</Link>
        </li>
        <li>
          <Link to="/profile">profile page</Link>
        </li>
      </ul>
    </>
  );
};

export default Home;
