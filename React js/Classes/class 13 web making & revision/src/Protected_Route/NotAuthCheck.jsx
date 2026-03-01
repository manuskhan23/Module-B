import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function NotAuthCheck() {
    return localStorage.getItem("uid") ? <Navigate to="/home" /> : <Outlet />
}

export default NotAuthCheck