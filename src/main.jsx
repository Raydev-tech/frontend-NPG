import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import App from "./App";
import "./index.css";
import StoreContextProvider from "./components/context/StoreContext";

AOS.init({
  duration: 800,
  once: true,
  easing: "ease-out-cubic",
  offset: 60,
});

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
     <StoreContextProvider>
      <App />
     </StoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);