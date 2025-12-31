import React from 'react'
import {useState} from 'react'

let App=() => {
  // react hooks
  // useState
  let [value,func]=useState('Anus')
  console.log(value)
  let update_name=()=>{
    func('Anus Khan')
  }
  let cities_arr=['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']
  return (
    <div>
      {/* {cities_arr.length===0 ? <h1>No cities found</h1> :
      cities_arr.map((city, index) => {
        return <p key={index}>{city}</p>
      })} */}
      <h1 id='dd'>{value}</h1>
      <button onClick={update_name}>Update</button>
    </div>
  )
}

export default App
