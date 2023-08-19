// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <ChakraProvider>
    <App />
    <ToastContainer />
  </ChakraProvider>,
  document.getElementById("root")
);
