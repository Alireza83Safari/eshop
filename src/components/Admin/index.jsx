import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../pages/Admin/Sidebar/Sidebar";
import Header from "../../pages/Admin/Header";
import AuthContext from "../../Context/AuthContext";
import ThemeContext from "../../Context/ThemeContext";

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
