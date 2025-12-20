import { createRoot } from "react-dom/client";
import React from "react";
import img from "./assets/react.svg";

let divElement = document.getElementById("root");

// component

let Header=() => {
  return(
    <div>
      <h1>This is header component</h1>
    </div>
  )
}
let Footer=() => {
  return(
    <div>
      <h1>This is footer component</h1>
    </div>
  )
}
createRoot(divElement).render(
  <div  className="card">
    <Header />
    <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit repudiandae
    aperiam laboriosam quaerat a assumenda possimus dolores, iusto cumque omnis
    accusantium fugit, vel aliquam quis veniam velit eaque debitis ipsam!
    Dolores, nisi? Dicta ex tempore voluptatem culpa, veritatis quaerat eos
    tenetur animi deserunt et aspernatur esse, quo quos minima natus dolore
    rerum fuga dolores delectus. Quisquam et sint assumenda vel. Possimus
    architecto saepe ipsa nihil, voluptas voluptate id quasi praesentium eius
    sapiente magni reprehenderit inventore quidem magnam accusantium nam, quia
    assumenda iusto illum autem quam animi tenetur? Placeat consequatur aliquam
    at nobis minima, architecto repellendus doloribus blanditiis error ea
    repudiandae molestiae unde nam rem incidunt esse porro ipsum quasi deleniti
    minus. Et minima debitis praesentium consectetur, ad vel sequi esse animi
    vitae sapiente in quos autem temporibus officiis nobis quia. Cum excepturi
    consequatur distinctio quaerat expedita voluptatem eius molestiae, quas illo
    qui laboriosam neque eveniet libero ipsa aspernatur obcaecati nisi,
    voluptate rem velit fugiat alias aliquid praesentium? Soluta quo at tenetur.
    Ullam est impedit, unde nemo atque fuga provident perspiciatis labore
    nesciunt voluptates ipsum sit, fugit error expedita quod dolorem reiciendis
    eum? Laudantium deleniti dolor culpa possimus sequi eius minus dicta
    aspernatur repellat enim. Cum dolor illum sint repellat quam.
  </p>
  <h1>hello</h1>
  <img src={img} alt="react logo" />
  <Footer />
  </div>
  );