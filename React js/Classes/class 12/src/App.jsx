import React, { useEffect, useState } from "react";
import NAppBar from "./components/AppBar.jsx" ;                    
import "./App.css";
import Cards from "./components/Cards.jsx";
import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import axios from "axios";


const App = () => {
let [popup, setPopup] = useState(false);

let [counter, setCounter] = useState(0);

let popupHandler = () => {
  setPopup(!popup);
};

useEffect(() => {
fetch("https://jsonplaceholder.typicode.com/todos")
.then((res) => res.json())
.then((data) => console.log(data));
}, []);

////////////////////////////////////

useEffect(() => {
console.log("useEffect");
}, [counter]);


// axios methods

// get() ---> data get

// post() ---> create data

// put() ----> update data

// delete() -> delete data


let [productData, setProductData] = useState([]);

useEffect(() => {
try {
axios
.get("https://fakestoreapi.com/products")
.then((response) => setProductData(response.data));
} catch (error) {
console.log(error);
}
}, []);

console.log(productData);

return (
<div
style={{
display: "flex",
justifyContent: "center",
flexWrap: "wrap",
gap: 15,
}}
>
{productData &&
productData.map((e, i) => {
return (
<Cards
key={i}
imgSrc={e.image}
cardtitle={e.title}
cardDesc={e.description}
/>
);
})}

<h3>{counter}</h3>

<button onClick={
() => setCounter(++counter)}>
Add</button> 

<NAppBar />

<Cards /> 

{/* <br /> */}

<TextField variant="filled" label="Enter Name" sx={{ margin: 10 }} />

<Button endIcon={<HomeIcon />} color="secondary" variant="contained">
Home
</Button>

{popup == true ? (
<>
<Alert severity="success">This is a success Alert.</Alert>{" "}
</>
) : null}

<button onClick={popupHandler}>Login</button> 

<Paper elevation={8} sx={{ margin: 10, padding: 15, borderRadius: 5 }}>
<Typography variant="h4">SignUp</Typography>

<TextField fullWidth label="Enter Name" />
<br />
<br />
<TextField fullWidth label="Enter Email" />
<br />
<br />
<TextField fullWidth label="Enter Password" />
</Paper> 

{/* useEffect hook */}

</div>
);
};

export default App;