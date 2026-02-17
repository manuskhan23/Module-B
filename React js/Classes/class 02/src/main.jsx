import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";

let divElement = document.getElementById("root");

createRoot(divElement).render(<App />);
