import "./App.css";
import { Button } from "./components/Button";
import Input from "./components/Input";

let App = () => {
  let name = "faraz";
  // console.log(name);

  let btnStyle1 = {
    backgroundColor: "green",
  };

  let btnStyle2 = {
    backgroundColor: "red",
    color: "white",
  };

  return (
    <>
      <Input label="Enter name" type="text" placeholder="Enter full name" />
      <br />
      <br />
      <Input
        label="Enter email"
        type="email"
        placeholder="Enter email address"
      />
      <br />
      <br />
      <Input
        label="Enter password"
        type="password"
        placeholder="Enter password"
      />
      <br /> <br />
      <Button style={btnStyle1} text="submit" />
      <Button style={btnStyle2} text="cancel" />


      {/* <Button label="login" />
      <Button label="logout" />
      <Button label="submit" />
      <Button label="signup" />

      <Input faraz="Enter full name" />
      <Input faraz="Enter father name" />
      <Input faraz="Enter email" />
      <Input faraz="Enter password" /> */}
      {/* {name}
      <img src="/vite.svg" alt="" />
      <h1 style={{ textAlign: "center" }}>App Component</h1>
      <p className="para">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi, fugit
        quasi officia exercitationem porro accusantium animi odio sunt nobis ab
        nostrum voluptate facilis obcaecati quam qui minima harum error ex.
      </p> */}
    </>
  );
};

// there are 3 ways to apply css on any html element

// 1) inline css

// 2) external css

// 3) modular css

export default App;
