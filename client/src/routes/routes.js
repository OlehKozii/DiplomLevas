import React from "react";
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  BASKET_ROUTE,
  GOOD_ROUTE,
  MAIN_ROUTE,
  NEWS_ROUTE,
  SIGN_UP,
  SIGN_IN
} from "./const";

const Admin = React.lazy(() => import("../pages/admin"));
const Basket = React.lazy(() => import("../pages/basket"));
const Good = React.lazy(() => import("../pages/goodsPage"));
const Shop = React.lazy(() => import("../pages/shop/shop"));
const Main = React.lazy(() => import("../pages/Main"));
const News = React.lazy(() => import("../pages/news"));
const SignUp = React.lazy(() => import("../pages/auth/SignUp"));
const SignIn = React.lazy(() => import("../pages/auth/SignIn"));

// import Admin  from "../pages/admin"
// import Shop from "../pages/shop"
// import Basket from "../pages/basket"
// import Good from "../pages/goodsPage"
// import Auth from "../pages/auth"

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    element: <Admin />,
  },
  // {
  //   path: BASKET_ROUTE,
  //   element: <Basket />,
  // },
];

export const publicRoutes = [
  {
    path: BASKET_ROUTE,
    element: <Basket />,
  },
  {
    path: MAIN_ROUTE,
    element: <Main />,
  },
  {
    path: NEWS_ROUTE,
    element: <News />,
  },
  {
    path: SHOP_ROUTE,
    element: <Shop />,
  },
  {
    path: GOOD_ROUTE + "/:name",
    element: <Good />,
  },
  {
    path: SIGN_UP,
    element: <SignUp />,
  },
  {
    path: SIGN_IN,
    element: <SignIn />,
  }
];
