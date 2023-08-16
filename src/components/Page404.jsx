import React from "react";
import Header from "../pages/Header/Header";
import Footer from "../pages/Footer";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <>
      <Header />
      <div className="relative flex justify-center">
        <img
          src="https://s3-cdn.cmlabs.co/page/2023/01/24/panduan-dan-cara-mengatasi-error-404-dengan-efektif-205111.png"
          alt=""
        />
        <Link to="/" className="absolute top-96 bg-red-300 px-4 py-2 rounded-lg text-white-100 font-bold">
          Navigate to Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
