import axios from "axios";
import { observer } from "mobx-react-lite";
import React, { Suspense, useEffect, useContext, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import AppRouter from "./components/appRouter";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar/NavBar";
import { Box } from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { Context } from ".";

// import 'swiper/swiper-bundle.css
// import SwiperCore, { Autoplay } from 'swiper';

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)

  const check = async () => {
    const token = localStorage.getItem('Token')
    if (token) return jwt_decode(token);
    return undefined
  }

  useEffect(() => {
    check().then(data => {
      if (data) {
        user.setUser(data)
        user.setIsAuth(true)
        if (user.user.role === "admin") {
          user.setIsAdmin(true)
        }
      }
    }).finally(() => setLoading(false))
  }, [user])


  return (
    <BrowserRouter>
      <Suspense>
        <div style={{ color: "#ffffff", backgroundColor: "#000000" }}>
          <Link style={{ color: "#ffffff", textDecoration: "none" }} to="/admin">Click here if you are admin</Link>
        </div>
        <NavBar />
        <Box minHeight="calc(100vh - 84px)">
          <AppRouter />
        </Box>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
})

export default App;
