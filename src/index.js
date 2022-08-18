import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { StateProvider } from "./context/StateContext";
import theme from "./theme";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";
axios.defaults.baseURL = "http://192.168.1.78:8000/api/user/";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <StateProvider>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </StateProvider>
    </AuthProvider>
  </React.StrictMode>
);
