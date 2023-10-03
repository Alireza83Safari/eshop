import React, { Suspense, lazy, useState } from "react";
import userAxios from "../services/Axios/userInterceptors";
import Spinner from "../components/Spinner/Spinner";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "./Sidebar/Sidebar";
import FilterProducts from "../components/Product/FilterProducts";
import Pagination from "../components/getPagination";
import { usePaginationURL } from "../hooks/usePaginationURL";
import { useFetchPagination } from "../hooks/useFetchPagination";
const ProductTemplate = lazy(() =>
  import("../components/Product/ProductTemplate")
);

export default function BrandResult() {
  const [isLoading, setLoading] = useState(false);
  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const BasketHandler = (cartID) => {
    let userBasketHandler = {
      productItemId: cartID.itemId,
      quantity: 1,
    };
    setLoading(true);
    userAxios.post("/orderItem", userBasketHandler).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        toast.success(`${cartID.name} added to cart!`, {
          position: "bottom-right",
        });
      }
    });
  };
  let url = "/product";
  const {
    isLoading: productLoading,
    paginations,
    total,
  } = useFetchPagination(url, userAxios);
  const pagesCount = Math.ceil(total / pageSize);

  const { isLoading: paginationLoading } = usePaginationURL(
    currentPage,
    pageSize
  );

  return (
    <>
      <Header />
      <Sidebar />
      <section className="min-h-screen mt-28 relative xl:px-20 px-5">
        <div className="col-span-12 flex justify-center ">
          <button
            className="text-xl p-2 bg-gray-100 rounded-lg absolute -top-7"
            onClick={() => setShowFilter(!showFilter)}
          >
            <img src="/images/filter.svg" />
          </button>
          {showFilter && (
            <Suspense fallback={<Spinner />}>
              <FilterProducts setCurrentPage={setCurrentPage} />
            </Suspense>
          )}
        </div>
        {isLoading || paginationLoading || productLoading ? (
          <Spinner />
        ) : paginations.length ? (
          <Suspense fallback={<Spinner />}>
            <ProductTemplate
              mapData={paginations}
              basketHandler={BasketHandler}
            />
          </Suspense>
        ) : (
          <div className="flex justify-center items-center mt-32">
            <div>
              <img src="https://www.digikala.com/statics/img/svg/plp/not-found.svg" />
              <p className="text-center mt-8 text-lg font-bold dark:text-white-100">
                Product Not Found
              </p>
            </div>
          </div>
        )}
        <Pagination
          pagesCount={pagesCount}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
        />

        <ToastContainer />
      </section>
      <Footer />
    </>
  );
}
