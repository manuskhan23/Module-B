import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function AuthCheck() {
    return localStorage.getItem("uid") ? <Outlet /> : <Navigate to="/login" />
}

export default AuthCheck