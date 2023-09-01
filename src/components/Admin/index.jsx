import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../pages/Admin/Sidebar/Sidebar";
import Header from "../../pages/Admin/Header";
import AuthContext from "../../Context/AuthContext";

export default function Index() {
  const { adminIsLogin } = useContext(AuthContext);

  return (
    <>
      {adminIsLogin && (
        <>
          <Header />
          <Outlet />
          <Sidebar />
        </>
      )}
    </>
  );
}
