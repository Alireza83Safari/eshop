import React, { Suspense, lazy, useState } from "react";
import userAxios from "../services/Axios/userInterceptors";
import Spinner from "../components/Spinner/Spinner";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import FilterProducts from "../components/Product/FilterProducts";
import Pagination from "../components/getPagination";
import toast from "react-hot-toast";
import { useFetchPagination } from "../hooks/useFetchPagination";
import { usePaginationURL } from "../hooks/usePaginationURL";
import { useMemo } from "react";
const ProductTemplate = lazy(() =>
  import("../components/Product/ProductTemplate")
);

export default function CategoryResult() {
  const [showFilter, setShowFilter] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const limit = searchParams.get("limit");
  const pageSize = limit ? +limit : 12;
  const [currentPage, setCurrentPage] = useState(1);

  const BasketHandler = (cartID) => {
    let userBasketHandler = {
      productItemId: cartID.itemId,
      quantity: 1,
    };

    userAxios.post("/orderItem", userBasketHandler).then((res) => {
      if (res.status === 200) {
        toast.success(`${cartID?.name} added to cart!`, {
          position: "bottom-right",
        });
      }
    });
  };

  const {} = usePaginationURL(currentPage, pageSize);
  let url = `/product`;

  const { isLoading, paginations, total } = useFetchPagination(url, userAxios);
  const pagesCount = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  return (
    <>
      <Header />
      <Sidebar />
      <section className="mx-auto py-4 dark:bg-black-200 xl:container min-h-screen mt-24 relative">
        <div className="col-span-12 flex justify-center">
          <button
            className="text-xl p-2 my-4 bg-gray-100 rounded-lg absolute -top-8"
            onClick={() => setShowFilter(!showFilter)}
          >
            <img src="/images/filter.svg" alt="" />
          </button>
          {showFilter && <FilterProducts setCurrentPage={setCurrentPage} />}
        </div>
        {isLoading ? (
          <Spinner />
        ) : paginations?.length ? (
          <>
            <Suspense fallback={<Spinner />}>
              <ProductTemplate
                mapData={paginations}
                basketHandler={BasketHandler}
              />
            </Suspense>
          </>
        ) : (
          <div className="flex justify-center items-center mt-32">
            <div>
              <img src="/images/not-found-product.svg" alt="" />
              <p className="text-center mt-8 text-lg font-bold dark:text-white-100">
                Product Not Found
              </p>
            </div>
          </div>
        )}

        {paginations?.length && (
          <Pagination
            pagesCount={pagesCount}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        )}
      </section>
      <Footer />
    </>
  );
}
