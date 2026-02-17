import React from "react";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const params = useParams();
  console.log(params);

  return (
    <div>
      <h1>Single Product PAge</h1>

      {params.id}
    </div>
  );
};

export default SingleProduct;
