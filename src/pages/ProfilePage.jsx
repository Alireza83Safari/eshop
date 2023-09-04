import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import ProfileMenu from "../components/Profile/ProfileMenu";
import Footer from "../pages/Footer";
import Sidebar from "./Sidebar/Sidebar";
export default function ProfilePage() {
  return (
    <>
      <Header />
      <Sidebar />
      <section className="md:px-5 xl:px-16 px-2 xl:container mx-auto min-h-screen grid grid-cols-12 mt-28 pb-80">
        <div className="md:col-span-3 col-span-12 md:mx-0 md:mb-0 mb-8 mx-4">
          <ProfileMenu />
        </div>
        <div className="md:col-span-9 col-span-12 border mx-4 rounded-xl">
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
}
