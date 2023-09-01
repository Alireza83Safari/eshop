import React from "react";
import { Outlet, useRoutes } from "react-router-dom";
import Sidebar from "../../pages/Admin/Sidebar/Sidebar";
import route from "../../routes/routes";
import Header from "../../pages/Admin/Header";

export default function Index() {
  const routes = useRoutes(route);

  return (
    <>
      <Header />

      <Outlet />
      <Sidebar />
    </>
  );
}
