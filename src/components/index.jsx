import React from "react";
import Header from "../pages/Header/Header";
import Sidebar from "../pages/Sidebar/Sidebar";
import Footer from "../pages/Footer";
import Home from "../pages/Home";

export default function Index() {
  return (
    <div className="relative">
      <Header />
      <Home />
      <Sidebar />
      <Footer />
    </div>
  );
}
