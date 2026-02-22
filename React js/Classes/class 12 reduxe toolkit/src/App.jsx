
import Home from './Screens/Home'
import { Route, Routes } from 'react-router-dom'
import Product from './Screens/Product'
function App() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </>
  )
}

export default App
