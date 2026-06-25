// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/Buswale">
      <App />
    </BrowserRouter>
  </StrictMode>
);