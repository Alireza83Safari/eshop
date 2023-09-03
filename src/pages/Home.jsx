import React from "react";
import PopularBrand from "../components/PopularBrand";
import Banner from "../components/Banner";
import Offer from "../components/Offer";
import Suggestion from "../components/Suggestion";
import Promotion from "../components/Promotion";
import Header from "./Header/Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="md:my-8 lg:container mx-auto lg:px-0 px-5">
      <Header />
      <Sidebar />
      <Banner />
      <Suggestion />
      <Promotion />
      <Offer />
      <PopularBrand />
      <Footer />
    </div>
  );
}
