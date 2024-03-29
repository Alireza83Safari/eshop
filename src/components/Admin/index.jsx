import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../pages/Admin/Header";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "./Sidebar/Sidebar";

export default function Index() {
  const { userInfos } = useContext(AuthContext);
  const { mode, setMode } = useContext(ThemeContext);
  return (
    <>
      {userInfos?.role?.name === "admin" || userInfos?.role?.name === "root" ? (
        <>
          <Header mode={mode} setMode={setMode} />
          <Outlet />
          <Sidebar />
        </>
      ) : (
        <div className="flex justify-center items-center dark:text-white-100 text-5xl min-h-screen">
          You Havent Access here
        </div>
      )}
    </>
  );
}
