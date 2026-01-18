import React from "react";
import styles from "../styles/Login-Signup.module.css";

function Input({ labels, type, onChange, placeholder, value }) {
  return (
    <div className={styles.formGroup}>
      <label>{labels}</label>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
}

export default Input;
