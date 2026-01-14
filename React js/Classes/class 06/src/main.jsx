import { createRoot } from "react-dom/client";
import React from "react"; 

let div = document.getElementById("root");

// components

let Header = () => { 
  return (
    <div>
      <h1>Header Component</h1>
    </div>
  );
};

let Footer = () => {
  return (
    <div>
      <h1>Footer Component</h1>
    </div>
  );
};

createRoot(div).render(
  <div>
    <Header />
    <h1>Hello React</h1>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
      voluptatum minus atque deserunt placeat illum dolorem. Et voluptatem quo
      provident sequi veritatis esse, rem unde enim. Aliquam unde autem
      repudiandae!
    </p>
    <Footer />
  </div>
);
