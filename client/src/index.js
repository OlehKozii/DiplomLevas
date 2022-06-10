import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import styles from "./index.module.scss";
import App from "./App";
import GoodStore from "./store/GoodStore";
import UserStore from "./store/UserStore";
import { ChakraProvider } from "@chakra-ui/react";
import { Theme } from "./styles/theme";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      good: new GoodStore(),
    }}
  >
    <ChakraProvider theme={Theme}>
      <App />
    </ChakraProvider>
  </Context.Provider>
);
