import React from "react";
import Navbaar from "./components/Navbaar";                      
import "bootstrap/dist/css/bootstrap.min.css";
import { todosData } from "./Data";
import Cards from "./components/Cards/Cards"; 
import Input from "./components/Input/Input";
import Input2 from "./components/Input2/Input2";
import Heading from "./components/Heading/Heading";
import Heading2 from "./components/Heading2/Heading2";

function App() {
  let arr = ["faraz", "hamza", "ali", "ahmed", "usman"];

  console.log(todosData);

  return (
    <>
      <h1>App</h1>
      
      {/* <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div> */}

      
      <div style={{ margin: 20 }}>
        {arr.map((element, index) => {
          return <li key={index}>{element}</li>; 
        })}
      </div>
      

      {todosData.map((e, i) => {
        return (
          <div key={i}>
            <h1>{e.title}</h1>
            <h4>{e.completed}</h4>
          </div>
        );
      })}
    </>
  );
}

export default App;
