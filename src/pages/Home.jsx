import React from "react";
import useFetch from "../hooks/useFetch";
import userAxios from "../services/Axios/userInterceptors";
import {
  Header,
  Footer,
  ProductSlider,
  Suggestion,
  Promotion,
  Banner,
  PopularBrand,
} from "../components/index";

export default function Home() {
  const { datas: expensive, isLoading: expensiveLoading } = useFetch(
    "/product?order=expensive&limit=8",
    userAxios
  );
  const { datas: cheap, isLoading: cheapsLoading } = useFetch(
    "/product?order=cheap&limit=8",
    userAxios
  );
  const { datas: newest, isLoading: newestLoading } = useFetch(
    "/product?order=newest&limit=8",
    userAxios
  );
  const { datas: topSell, isLoading: topSellLoading } = useFetch(
    "/product?order=topSell&limit=8",
    userAxios
  );
  return (
    <>
      <Header />
      <div className="md:mt-8 xl:container max-w-[1200px] min-h-screen mx-auto lg:px-0 sm:px-5">
        <Banner />
        <ProductSlider
          products={expensive?.data}
          isLoading={expensiveLoading}
          title="expensive eshop Products"
          linkText="show all >"
          to="/products?order=expensive"
        />

        <Suggestion />

        <ProductSlider
          products={newest?.data}
          isLoading={newestLoading}
          title="newest eshop Products"
          linkText="show all >"
          to="/products?order=newest"
        />

        <Promotion />

        <ProductSlider
          products={cheap?.data}
          isLoading={cheapsLoading}
          title="eshop cheap products"
          linkText="show all >"
          to="/products?order=cheap"
        />

        <ProductSlider
          products={topSell?.data}
          isLoading={topSellLoading}
          title="eshop have top sell Products"
          linkText="show all >"
          to="/products?order=topSell"
        />

        <PopularBrand />
      </div>
      <Footer />
    </>
  );
}
