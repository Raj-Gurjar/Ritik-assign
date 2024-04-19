import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import toast, { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import GlobalContextProvider from "./Context/GlobalContextProvider";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <GlobalContextProvider>
      <React.StrictMode>
        <App />
        <Toaster />
      </React.StrictMode>
    </GlobalContextProvider>
  </BrowserRouter>
);
