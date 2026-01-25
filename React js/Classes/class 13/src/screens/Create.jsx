import { Paper, Typography , TextField, Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
function Create() {
  let navigate=useNavigate()
  let [userData, setUserData] = useState({
    username: '',
    email: '',
    name: '',
    website: '',
    phone: ''
  })
  const HandleSubmit=()=>{
    try{
      axios.post('http://localhost:3000/users', userData)
      .then((res)=>{
        alert('User Created Successfully')
        navigate('/user')
      })
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <div><br /><br /><br />
      <Paper sx={{ padding: '20px', margin: '20px' }}>
        <Typography sx={{mb:3}} variant='h3'>Create User</Typography>
        <br />
        <TextField onChange={(e) => setUserData({...userData, username: e.target.value})} id="outlined-basic" fullWidth label="Username" variant="outlined" />
        <br /><br />
        <TextField onChange={(e) => setUserData({...userData, email: e.target.value})} id="outlined-basic" fullWidth label="Email" variant="outlined" />
        <br /><br />
        <TextField onChange={(e) => setUserData({...userData, name: e.target.value})} id="outlined-basic" fullWidth label="Name" variant="outlined" />
        <br /><br />
        <TextField onChange={(e) => setUserData({...userData, website: e.target.value})} id="outlined-basic" fullWidth label="Website" variant="outlined" />
        <br /><br />
        <TextField onChange={(e) => setUserData({...userData, phone: e.target.value})} id="outlined-basic" fullWidth label="Phone" variant="outlined" />
        <br /><br />
        <Button onClick={HandleSubmit} variant="contained" color='error' sx={{textDecoration:'none',color:'white'}}>Create</Button>
      </Paper>
    </div>
  )
}

export default Create
