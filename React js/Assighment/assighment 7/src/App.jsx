import { Routes, Route } from 'react-router-dom'
import Home from './Pagess/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
