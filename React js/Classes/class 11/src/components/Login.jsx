import React, { useState } from 'react'
import Input from './Input'
import Table from 'react-bootstrap/Table';
import './table.css'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate=useNavigate()
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const [gatherData, setGatherData] = useState([])

    const lelo = () => {
        setGatherData([...gatherData, userData])
        navigate('/dashboard')
    }

    console.log(gatherData)

    return (
        <>
        <div className="form-container">
            <h1>Login</h1>
            <div className="input-field">
                <Input onChange={(e) => setUserData({ username: e.target.value, email: userData.email, password: userData.password })} type="text" labels="Username" />
            </div>
            <div className="input-field">
                <Input onChange={(e) => setUserData({ username: userData.username, email: e.target.value, password: userData.password })} type="email" labels="Email" />
            </div>
            <div className="input-field">
                <Input onChange={(e) => setUserData({ username: userData.username, email: userData.email, password: e.target.value })} type="password" labels="Password" />
            </div>
            <button className="btn btn-danger btn-custom" onClick={lelo} >Login</button>
        </div>

        <div className="table-container">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {gatherData.map((data, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.username}</td>
                            <td>{data.email}</td>
                            <td>{data.password}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    </>
    )
}


export default Login