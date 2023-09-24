import React from "react";
import Header from "../pages/Header/Header";
import Footer from "../pages/Footer";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <>
      <Header />
      <div className="relative flex justify-center">
        <img src="/images/Page404.jsx" alt="" />
        <Link
          to="/"
          className="absolute top-96 bg-blue-600 px-4 py-2 rounded-lg text-white-100 font-bold"
        >
          Navigate to Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
