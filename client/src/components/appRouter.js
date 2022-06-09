import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "..";
import NotFound from "../pages/notFound";
import { authRoutes, publicRoutes } from "../routes/routes";

const AppRouter = () => {
  const { user } = useContext(Context);
  console.log(user);
  return (
    <Routes>
      {user.isAuth === true &&
        authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
