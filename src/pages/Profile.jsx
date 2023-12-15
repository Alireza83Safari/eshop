import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar/Sidebar";
import ProfileMenu from "../components/Profile/ProfileMenu";

export default function Profile() {
  return (
    <>
      <Header />
      <Sidebar />
      <section className="md:px-5 xl:px-8 px-2 xl:container mx-auto min-h-screen grid grid-cols-12 mt-28">
        <div className="md:col-span-3 col-span-12 md:mx-0 md:mb-0 mb-8 mx-4">
          <ProfileMenu />
        </div>
        <div className="md:col-span-9 col-span-12 border mx-4 rounded-xl relative">
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
}
