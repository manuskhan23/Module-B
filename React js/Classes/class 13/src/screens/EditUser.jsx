import { Paper, Typography , TextField, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
function EditUser(prop) {
  let navigate=useNavigate()
  let {id}=useParams()
  const [singleUser,setSingleUser]=useState({})
  console.log(id);
  useEffect(() => {
    axios.get(`http://localhost:3000/users/${id}`)
    .then((res) => {
      setSingleUser(res.data)
    })
  }, [])
  const handleEdit=()=>{
    try{
      axios.put(`http://localhost:3000/users/${id}`, singleUser)
      .then((res)=>{
        alert('User Updated Successfully')
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
        <Typography sx={{mb:3}} variant='h3'>Edit User</Typography>
        <br />
        <TextField onChange={(e)=>setSingleUser({...singleUser,username:e.target.value})} value={singleUser.username} id="outlined-basic" fullWidth variant="outlined" />
        <br /><br />
        <TextField onChange={(e)=>setSingleUser({...singleUser,name:e.target.value})} value={singleUser.name} id="outlined-basic" fullWidth variant="outlined" />
        <br /><br />
        <TextField onChange={(e)=>setSingleUser({...singleUser,email:e.target.value})} value={singleUser.email} id="outlined-basic" fullWidth variant="outlined" />
        <br /><br />
        <TextField onChange={(e)=>setSingleUser({...singleUser,website:e.target.value})} value={singleUser.website} id="outlined-basic" fullWidth variant="outlined" />
        <br /><br />
        <TextField onChange={(e)=>setSingleUser({...singleUser,phone:e.target.value})} value={singleUser.phone} id="outlined-basic" fullWidth  variant="outlined" />
        <br /><br />
        <Button onClick={handleEdit} variant="contained" color='primary' sx={{textDecoration:'none',color:'white'}}>Edit</Button>
      </Paper>
    </div>
  )
}
export default EditUser
