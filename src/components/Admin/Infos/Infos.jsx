import React, { Suspense, lazy, startTransition, useState } from "react";
import ReactDOM from "react-dom";
import Spinner from "../../Spinner/Spinner";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import ProductImage from "./ProductImage";
const ProductInfo = lazy(() => import("./ProductInfo"));
const ShowProductItem = lazy(() => import("./ProductItem"));

export default function Infos({
  setShowInfo,
  isLoading,
  productFile,
  infosId,
  fetchProductList,
}) {
  const [activeTab, setActiveTab] = useState("ProductInfo");
  return ReactDOM.createPortal(
    <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400">
      <div
        className={`dark:bg-black-200 dark:text-white-100 bg-white-100 rounded-xl sm:p-5 px-3 py-2 relative overflow-y-auto ${
          activeTab != "ProductImage" && "w-[94%] h-[91%]"
        }`}
      >
        <FontAwesomeIcon
          icon={faX}
          className="text-red-700 absolute right-2 top-2 text-xl"
          onClick={() => setShowInfo(false)}
        />
        <div className="text-black-900 dark:text-white-100">
          <div className="flex text-sm pb-5 justify-center">
            <Link
              className={` mx-3  ${
                activeTab === "ProductInfo" ? "font-bold text-blue-600" : ""
              }`}
              onClick={() => startTransition(() => setActiveTab("ProductInfo"))}
            >
              Product Info
            </Link>
            <Link
              className={`mx-3 ${
                activeTab === "ProductItem" ? "font-bold text-blue-600" : ""
              }`}
              onClick={() => startTransition(() => setActiveTab("ProductItem"))}
            >
              Product Item
            </Link>
            <Link
              className={`mx-3 ${
                activeTab === "ProductImage" ? "font-bold text-blue-600" : ""
              }`}
              onClick={() =>
                startTransition(() => setActiveTab("ProductImage"))
              }
            >
              Product Image
            </Link>
          </div>
          {activeTab === "ProductInfo" && (
            <Suspense fallback={<Spinner />}>
              <ProductInfo
                setShowInfo={setShowInfo}
                isLoading={isLoading}
                productFile={productFile}
                infosId={infosId}
                fetchProductList={fetchProductList}
              />
            </Suspense>
          )}
          {activeTab === "ProductItem" && (
            <Suspense fallback={<Spinner />}>
              <ShowProductItem
                setShowInfo={setShowInfo}
                isLoading={isLoading}
                productFile={productFile}
                infosId={infosId}
                fetchProductList={fetchProductList}
              />
            </Suspense>
          )}
          {activeTab === "ProductImage" && (
            <ProductImage
              infosId={infosId}
              fetchProductList={fetchProductList}
            />
          )}
        </div>
      </div>
    </section>,
    document.getElementById("portal")
  );
}
