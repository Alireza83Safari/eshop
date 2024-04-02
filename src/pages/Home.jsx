import React from "react";
import {
  Header,
  Footer,
  ProductSlider,
  Suggestion,
  Promotion,
  Banner,
  PopularBrand,
} from "../components/index";
import useFetch from "../hooks/useFetch";
import userAxios from "../services/Axios/userInterceptors";

export default function Home() {
  const { data: expensiveProducts, isLoading: expensiveLoading } = useFetch(
    "/product?order=expensive&limit=10",
    userAxios,
    "expensiveProducts"
  );

  const { data: cheapProducts, isLoading: cheapLoading } = useFetch(
    "/product?order=cheap&limit=10",
    userAxios,
    "cheapProducts"
  );

  const { data: newestProducts, isLoading: newestLoading } = useFetch(
    "/product?order=newest&limit=8",
    userAxios,
    "newestProducts"
  );

  const { data: topSellProducts, isLoading: topSellLoading } = useFetch(
    "/product?order=topSell&limit=8",
    userAxios,
    "topSellProducts"
  );

  return (
    <>
      <Header />
      <div className="md:mt-8 xl:container max-w-[1200px] min-h-screen mx-auto lg:px-0 sm:px-5">
        <Banner />
        <ProductSlider
          products={expensiveProducts?.data}
          isLoading={expensiveLoading}
          title="expensive eshop Products"
          linkText="show all >"
          to="/products?order=expensive"
        />

        <Suggestion />

        <ProductSlider
          products={newestProducts?.data}
          isLoading={newestLoading}
          title="newest eshop Products"
          linkText="show all >"
          to="/products?order=newest"
        />

        <Promotion />

        <ProductSlider
          products={cheapProducts?.data}
          isLoading={cheapLoading}
          title="eshop cheap products"
          linkText="show all >"
          to="/products?order=cheap"
        />

        <ProductSlider
          products={topSellProducts?.data}
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
