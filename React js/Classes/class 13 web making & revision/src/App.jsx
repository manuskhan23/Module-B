import Home from './Screens/Home'
import { Route, Routes } from 'react-router-dom'
import Product from './Screens/Product'
import Login from './Screens/Login'
import Signup from './Screens/Signup'
import AuthCheck from './Protected_Route/AuthCheck'
import NotAuthCheck from './Protected_Route/NotAuthCheck'
import './app.css'
import Cart from './Screens/Cart'
import Checkout from './Screens/Checkout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<AuthCheck />}>
          <Route path="/home" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route element={<NotAuthCheck />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
