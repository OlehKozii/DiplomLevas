import axios from "axios";
import { observer } from "mobx-react-lite";
import React, { Suspense, useEffect, useContext, useState } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import AppRouter from "./components/appRouter";
import NavBar from "./components/NavBar/NavBar";
import jwt_decode from "jwt-decode";
import { Context } from ".";


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
        <AppRouter />
      </Suspense>
    </BrowserRouter>
  );
})

export default App;
