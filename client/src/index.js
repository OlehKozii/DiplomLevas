import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import styles from "./index.module.scss";
import App from "./App";
import GoodStore from "./store/GoodStore";
import UserStore from "./store/UserStore";
import { ChakraProvider } from "@chakra-ui/react";
import { Theme } from "./styles/theme";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


export const Context = createContext(null);

const stripePromise = loadStripe("pk_test_51LB0ueEuGflpE1o2iqiMWps3vw1ZNMVTvNwNmfF0mYiiiz9jWXftAHbj9n6Ukzhv9o7IT6AQ5Fmv0yzwSbdYR2Xf00bL2HuqKX");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      good: new GoodStore(),
    }}
  >
    <ChakraProvider theme={Theme}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </ChakraProvider>
  </Context.Provider>
);
