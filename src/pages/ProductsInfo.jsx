import React, { useState, Suspense, lazy, startTransition } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "./Header/Header";
import Footer from "./Footer";
import useFetch from "../hooks/useFetch";
import instance from "../api/userInterceptors";
import ProductFeature from "../components/ProductInfo/ProductFeature";
import ProductContent from "../components/ProductInfo/ProductContent";
import Breadcrumb from "../components/Breadcrumb";
import Description from "../components/ProductInfo/Description";
import Comments from "../components/ProductInfo/Comments";

export default function ProductsInfo() {
  const { productID } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const { datas: productsData } = useFetch("/product", instance);
  const findProduct = productsData?.data.find(
    (product) => product.id == productID
  );
  const { datas: productItem } = useFetch(
    `/productItem/${findProduct?.itemId}`,
    instance
  );
  return (
    <>
      <Header />
      <section className="md:px-5 xl:px-16 px-2 xl:container mx-auto">
        <div className="grid grid-cols-12">
          <div className="lg:col-span-4 md:col-span-5 col-span-12">
            <div className="md:block flex justify-center md:w-80 w-full md:px-4 lg:py-10 md:py-20">
              <img
                src={`http://127.0.0.1:6060/${findProduct?.fileUrl}`}
                alt=""
                className="md:w-full w-7/12 object-contain md:py-0 py-5"
              />
            </div>
          </div>
          <div className="lg:col-span-6 md:col-span-7 col-span-12 md:px-0 px-8">
            <Breadcrumb
              links={[
                { id: 1, title: "Home", to: "products" },
                {
                  id: 2,
                  title: "product Info",
                  to: "checkout",
                },
              ]}
            />

            <ProductContent
              findProduct={findProduct}
              getProducts={productsData?.data}
              productItem={productItem}
            />
          </div>

          <div className="lg:col-span-2 col-span-12 lg:block sm:flex justify-between block lg:my-0 my-16 lg:px-0 px-12 text-black-900 dark:text-white-100">
            <ProductFeature />
          </div>
        </div>
        <div className="px-8 lg:mt-16 md:mt-12 mt-4 text-black-900 dark:text-white-100">
          <div className="flex text-sm pb-5">
            <Link
              className={`mx-2 ${
                activeTab === "description" ? "font-bold" : ""
              }`}
              onClick={() => startTransition(() => setActiveTab("description"))}
            >
              DESCRIPTION
            </Link>
            <Link
              className={`mx-2 ${activeTab === "reviews" ? "font-bold" : ""}`}
              onClick={() => startTransition(() => setActiveTab("reviews"))}
            >
              REVIEWS
            </Link>
          </div>
          {activeTab === "description" && (
            <Description productItem={productItem} />
          )}
          {activeTab === "reviews" && <Comments />}
        </div>
        <ToastContainer />
      </section>

      <Footer />
    </>
  );
}
