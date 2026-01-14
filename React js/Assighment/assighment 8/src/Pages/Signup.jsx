import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import styles from '../styles/Login-Signup.module.css'


function Signup() {
        const navigate=useNavigate()
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [gatherData, setGatherData] = useState([])
    const store=()=>{
        setGatherData([...gatherData, userData])
        navigate('/login')
    }
  return (
    <div className={styles.login}>
      <div>
        <h1>Signup</h1>
        <p>Welcome back</p>
        <Input onChange={(e) => setUserData({...userData, name: e.target.value })} labels="Name" type="text" placeholder="Enter your name" />
        <Input onChange={(e) => setUserData({...userData, email: e.target.value })} labels="Email" type="email" placeholder="Enter your email" />
        <Input onChange={(e) => setUserData({...userData, password: e.target.value })} labels="Password" type="password" placeholder="Enter your password" />
        <button onClick={store}>Signup</button>
      </div>
    </div>
  )
}

export default Signup
