import { useState } from 'react'
import Signup from './components/Signup'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Dashboard from './components/Dashboard';
import Profile from './components/Pofile';
import Setting from './components/Setting';
import Announcement from './components/Announcement';
import MainHomeComponent from './components/MainHomeComponent';
function App() {
  return (
    <>
      
      <Routes>
        <Route path="/dashboard" Component={Dashboard} >
        <Route index Component={MainHomeComponent} />
        <Route path="profile" Component={Profile} />
        <Route path="setting" Component={Setting} />
        <Route path="announcement" Component={Announcement} />
        </Route>
        
        <Route path="/signup" Component={Signup} />
        <Route path="/login" Component={Login} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </>
  )
}

export default App
