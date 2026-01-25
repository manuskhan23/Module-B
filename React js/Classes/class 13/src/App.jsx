import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import CreateUser from './screens/CreateUser'
import { useState } from 'react'
import Create from './screens/Create'
import EditUser from './screens/EditUser'

function App() {
  return(
      <Routes>
        <Route path="/user" element={<CreateUser />} />
        <Route path="/createUser" element={<Create />} />
        <Route path="/editUser/:id" element={<EditUser />} />
      </Routes>
  )
}

export default App
