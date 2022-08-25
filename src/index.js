import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { StateProvider } from "./context/StateContext";
import theme from "./theme";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
// import { store } from "./app/store";
// api/user/token/refresh
import "./services/api";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    {/* <Provider store={store}> */}
    <StateProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </StateProvider>
    {/* </Provider> */}
  </AuthProvider>
);
