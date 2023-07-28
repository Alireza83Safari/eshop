import React from "react";
import PopularBrand from "../components/PopularBrand";
import OffPage from "../components/OffPage";
import Banner from "../components/Banner";
import Offer from "../components/Offer";
import Suggestion from "../components/Suggestion";

export default function Home() {
  return (
    <div className="md:my-36 sm:mt-20 mt-16 container mx-auto">
      <Banner />
      <Offer />
      <OffPage />
      <Suggestion />
      <PopularBrand />
    </div>
  );
}
