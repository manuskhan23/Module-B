import React from "react";
import { useParams } from "react-router-dom";

const SingleUser = () => {
  let { id } = useParams();

  console.log(id);

  return (
    <>
      <h1>Single User View</h1>

      <p>
        Dynamic Params get: <strong>{id}</strong>
      </p>
    </>
  );
};

export default SingleUser;
