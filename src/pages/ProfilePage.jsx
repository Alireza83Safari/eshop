import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import ProfileMenu from "../components/Profile/ProfileMenu";
import Footer from "../pages/Footer";
export default function ProfilePage() {
  return (
    <>
      <Header />
      <section className="md:px-5 xl:px-16 px-2 xl:container mx-auto min-h-screen mt-12 grid grid-cols-12">
        <div className="col-span-3">
          <ProfileMenu />
        </div>
        <div className="col-span-9 border px-4 mx-4 rounded-xl">
          <Outlet />
        </div>
      </section>
      <Footer />
    </>
  );
}
