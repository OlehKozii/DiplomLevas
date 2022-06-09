import React, { Suspense } from "react";
import { BrowserRouter, Link } from "react-router-dom";
import AppRouter from "./components/appRouter";
import NavBar from "./components/NavBar/NavBar";

function App() {
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
}

export default App;
