import React, { useState } from "react";


const App = () => { 
  let status = true;

  let cities = [];

  let [value, func] = useState("ahmed");
 
  console.log(value);

  let update_name = () => {
    func("Muhammad Ahmed");
  };

  let [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(++counter);
  };

  const decrement = () => {
    setCounter(counter <= 0 ? 0 : --counter);
  };

  const [isloggedIn, setIsLoggedIn] = useState(false);

  const update = () => {
    setIsLoggedIn(!isloggedIn);
  };
  return (
    <div>
      {isloggedIn ? (
        <>
          <h1>Dashboard</h1>
          <h3>Welcome User!!</h3>
        </>
      ) : (
        <h1>App</h1>
      )}

      <button onClick={update}>{isloggedIn ? "logout" : "login"}</button>

      <h1>Counter: {counter}</h1>

      <button onClick={increment}>Add</button>

      <button onClick={decrement}>Del</button>

      {status === true ? (
        <div>
          <h1>App</h1>
        </div>
      ) : null}

      {cities.length === 0 ? (
        <>
          <h1>No Data Found</h1>
        </>
      ) : (
        cities.map((e, i) => {
          return (
            <>
              <li>{e}</li>
            </>
          );
        })
      )}

      <h1 id="name">{value}</h1>

      <button onClick={update_name}>Update</button>
    </div>
  );
};

export default App;
