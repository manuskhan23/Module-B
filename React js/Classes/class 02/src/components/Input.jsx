import React from "react";

const Input = ({ type, placeholder, label }) => {
  console.log(type, placeholder);

  return (
    <>
      <label htmlFor="">{label}</label>

      <input placeholder={placeholder} type={type} />
    </>
  );
};

export default Input;
