import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import api from './array/arr.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar3 from './components/Navbaar.jsx'
// import Cards from './components/Cards.jsx';
// import Inpuut2 from './components/Input2/Input2.jsx';
// import Inpuut from './components/Input/Input.jsx'

function App() {
  let array=["anus","huzaifa","nawab","faraz","bilal","sarfaraz"]
  return(
    <div>
    {/* <Navbar3 />
    <Cards /> */}
    {/* <Inpuut />
    <Inpuut2 /> */}
    {
      array.map((e,i)=>{
        return(
          <ul key={i}>
            <li>{e}</li>
          </ul>
        )
      })}
      {
        api.map((e,i)=>{
          <div key={`api${i}`}>
            <h1>{e.title}</h1>
            <h4>{e.completed}</h4>
          </div>
        })
      }
  </div>
  )
}

export default App
