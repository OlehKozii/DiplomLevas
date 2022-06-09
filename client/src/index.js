import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import styles from "./index.module.scss";
import App from "./App";
import GoodStore from "./store/GoodStore";
import UserStore from "./store/UserStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      good: new GoodStore(),
    }}
  >
    <App />
  </Context.Provider>
);
