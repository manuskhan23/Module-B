import React from "react";
import Form from "react-bootstrap/Form";

function Input({ labels, type, onChange, placeholder }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{labels}</Form.Label>
      <Form.Control type={type} onChange={onChange} placeholder={placeholder} />
    </Form.Group>
  );
}

export default Input;
