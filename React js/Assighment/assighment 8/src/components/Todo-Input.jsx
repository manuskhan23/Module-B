import React from 'react'
import Form from 'react-bootstrap/Form'

function TodoInput({ onChange, value, onKeyPress }) {
  return (
    <Form.Group className="mb-3">
      <Form.Control 
        onChange={onChange} 
        value={value} 
        onKeyPress={onKeyPress}
        placeholder="Enter your task" 
      />
    </Form.Group>
  )
}

export default TodoInput
