import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { StateProvider } from "./context/StateContext";
import theme from "./theme";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
const App = lazy(() => import("./App"));

axios.defaults.baseURL = "http://192.168.1.73:8000/api/user/";
// axios.defaults.withCredentials = true;
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
