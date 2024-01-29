import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Page404() {
  return (
    <>
      <Header />
      <div className="flex justify-center mt-16">
        <Link to="/">
          <img
            src="https://s3-cdn.cmlabs.co/page/2023/01/24/panduan-dan-cara-mengatasi-error-404-dengan-efektif-205111.png"
            alt=""
          />
        </Link>
      </div>
      <Footer />
    </>
  );
}
