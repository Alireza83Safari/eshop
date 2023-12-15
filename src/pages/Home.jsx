import React from "react";
import PopularBrand from "../components/PopularBrand";
import Banner from "../components/Banner";
import TopSaleSlider from "../components/TopSaleSlider";
import Suggestion from "../components/Suggestion";
import Promotion from "../components/Promotion";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar/Sidebar";
import NewestSlider from "../components/NewestSlider";
import DiscountSlider from "../components/DiscountSlider";
import ExpensiveSlider from "../components/ExpensiveSlider";

export default function Home() {
  return (
    <>
      <Header />
      <div className="md:mt-8 xl:container max-w-[1200px] min-h-screen mx-auto lg:px-0 sm:px-5">
        <Sidebar />
        <Banner />
        <ExpensiveSlider />
        <DiscountSlider />
        <Suggestion />
        <NewestSlider />
        <Promotion />
        <TopSaleSlider />
        <PopularBrand />
      </div>
      <Footer />
    </>
  );
}
