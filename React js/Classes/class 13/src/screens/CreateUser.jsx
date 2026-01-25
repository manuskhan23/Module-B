import axios from 'axios'
import CustomizedTables from '../components/Table.jsx'
import React, { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { Navigate } from 'react-router-dom'

function CreateUser() {
  const [navigate, setNavigate] = useState(false)
  const [UserData, setUserData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then(res => setUserData(res.data))
      .catch(err => console.log(err))
  }, [])
  return (
    <div>
      {navigate && <Navigate to="/createUser" />}
      <Button onClick={() => setNavigate(true)} variant="contained" sx={{ float: 'right', margin: '5', color: 'white', textDecoration: 'none' }} color="success">Create User</Button>
      <CustomizedTables data={UserData} />
    </div>
  )
}

export default CreateUser
