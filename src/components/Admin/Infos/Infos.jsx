import React, { Suspense, lazy, useState } from "react";
import ReactDOM from "react-dom";
import Spinner from "../../Spinner/Spinner";
const ProductInfo = lazy(() => import("./ProductInfo"));
const ShowProductItem = lazy(() => import("./ProductItem"));

export default function Infos({
  setShowInfo,
  isLoading,
  productFile,
  infosId,
}) {
  const [showProduct, setShowProduct] = useState(true);
  const [showItem, setShowItem] = useState(false);
  return ReactDOM.createPortal(
    <section className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400">
      <div className="lg:w-10/12 w-11/12 sm:h-[29rem] dark:bg-black-200 dark:text-white-100 bg-white-100 rounded-xl sm:p-5 px-3 py-2 relative">
        <Suspense fallback={<Spinner />}>
          {showProduct && (
            <ProductInfo
              setShowInfo={setShowInfo}
              isLoading={isLoading}
              productFile={productFile}
              infosId={infosId}
              setShowProduct={setShowProduct}
              setShowItem={setShowItem}
            />
          )}
        </Suspense>

        <Suspense fallback={<Spinner />}>
          {showItem && (
            <ShowProductItem
              setShowInfo={setShowInfo}
              isLoading={isLoading}
              productFile={productFile}
              infosId={infosId}
              setShowProduct={setShowProduct}
              setShowItem={setShowItem}
            />
          )}
        </Suspense>
      </div>
    </section>,
    document.getElementById("portal")
  );
}
