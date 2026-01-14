import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import ToDo from './Pages/ToDo';
import Signup from './Pages/Signup';

function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/todo" element={<ToDo />} />
      <Route path="/" element={<Signup />} />
    </Routes>
  )
}

export default App
