import React from "react";
import { useSearchParams } from "react-router-dom";

const AllUsers = () => {
  let [query, query_func] = useSearchParams();

  let value = query.get("id");

  console.log(value);

  return (
    <>
      <h1>All Users View</h1>
    </>
  );
};

export default AllUsers;
