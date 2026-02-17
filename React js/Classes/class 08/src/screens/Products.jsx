import React from "react";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [query, queryFun] = useSearchParams();

  const id = query.get("key");

  return (
    <div>
      <h1>All Products Page</h1>

      <h1>{id}</h1>
    </div>
  );
};

export default Products;
