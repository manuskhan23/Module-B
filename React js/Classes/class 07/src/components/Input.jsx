import React from "react";
import { Form } from "react-bootstrap";

const Input = ({ label, type, ONCHANGE }) => {
  return (
    <>
      <Form.Label 
      htmlFor="inputPassword5">{label}
      </Form.Label>

      <Form.Control 
      onChange={ONCHANGE} 
      type={type} />
    </>
  );
};

export default Input;
