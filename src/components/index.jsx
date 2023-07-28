import React from "react";
import Header from "../pages/Header/Header";
import route from "../routes/routes";

import { Outlet, useRoutes } from "react-router-dom";
import Sidebar from "../pages/Sidebar/Sidebar";
import Footer from "../pages/Footer";

export default function Index() {
  const routes = useRoutes(route);

  return (
    <div >
      <Header />
      {routes}
      <Outlet />
      <Sidebar />
      <Footer />
    </div>
  );
}
