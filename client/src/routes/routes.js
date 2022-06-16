import React from "react";
import {
  ADMIN_ROUTE,
  SHOP_ROUTE,
  BASKET_ROUTE,
  ORDERS,
  GOOD_ROUTE,
  MAIN_ROUTE,
  NEWS_ROUTE,
  SIGN_UP,
  SIGN_IN
} from "./const";

const Admin = React.lazy(() => import("../pages/admin"));
const Basket = React.lazy(() => import("../pages/basket"));
const Orders = React.lazy(() => import('../pages/orders'));
const Good = React.lazy(() => import("../pages/goodsPage"));
const Shop = React.lazy(() => import("../pages/shop"));
const Main = React.lazy(() => import("../pages/Main"));
const News = React.lazy(() => import("../pages/news"));
const SignUp = React.lazy(() => import("../pages/auth/SignUp"));
const SignIn = React.lazy(() => import("../pages/auth/SignIn"));

// import Admin  from "../pages/admin"
// import Shop from "../pages/shop"
// import Basket from "../pages/basket"
// import Good from "../pages/goodsPage"
// import Auth from "../pages/auth"

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    element: <Admin />,
  },

];

export const authRoutes = [
  {
    path: ORDERS,
    element: <Orders />
  },
  {
    path: BASKET_ROUTE,
    element: <Basket />,
  },
];

export const publicRoutes = [

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
