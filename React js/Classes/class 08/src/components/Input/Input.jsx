import React from "react";
import style from "../Input/Input.module.css";

const Input = () => {
  return (
    <div>
      <input
        placeholder="Enter name"
        className={style.inputField}
        type="text"
      />
    </div>
  );
};

export default Input;
