import "./App.css";
import Button from "./components/Button";
import Input from "./components/input";

let App = () => {
  let name = "anus";

  return (
    <>
      {/* <img src="/vite.svg" alt="" />
      {name}
      <h1 style={{textAlign:"center"}}>app</h1>
      <p className="dd">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci,
        ipsum tempora sunt quae quisquam iste? Modi, laudantium possimus.
        Tempore quod quisquam dolorum dolorem similique velit quaerat animi
        dolore, unde architecto doloremque maxime sunt, esse consequatur hic
        repellat! Harum nemo suscipit pariatur nesciunt asperiores voluptate
        nulla, eaque quia illo atque doloremque.
      </p> */}
      {/* <Button label="login" />
      <Button label="signup" />
      <Button label="logout" /> */}
      <Input anus="Enter your name:"/>
      <Input anus="Enter your father's name:"/>
      <Input anus="Enter your class:"/>
      <Input anus="Enter your section:"/>
      </>
  );
};

export default App;
