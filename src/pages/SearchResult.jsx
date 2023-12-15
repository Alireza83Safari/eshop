import React, { Suspense, lazy, useMemo, useState } from "react";
import userAxios from "../services/Axios/userInterceptors";
import Spinner from "../components/Spinner/Spinner";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar/Sidebar";
import FilterProducts from "../components/Product/FilterProducts";
import useAddToCart from "../hooks/useAddCart";
import { useLocation } from "react-router-dom";
import Pagination from "../components/getPagination";
import { useFetchPagination } from "../hooks/useFetchPagination";
import { usePaginationURL } from "../hooks/usePaginationURL";
const ProductTemplate = lazy(() =>
  import("../components/Product/ProductTemplate")
);

export default function SearchResults() {
  const [showFilter, setShowFilter] = useState(false);
  const { addToCart } = useAddToCart();
  const BasketHandler = (product) => {
    addToCart(product.itemId, 1, product);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const limit = searchParams.get("limit");
  const pageSize = limit ? +limit : 12;

  const url = "/product";
  const {
    isLoading: productLoading,
    paginations,
    total,
  } = useFetchPagination(url, userAxios);

  const { isLoading: paginationLoading } = usePaginationURL(
    currentPage,
    pageSize
  );
  const pagesCount = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  return (
    <>
      <Header />
      <Sidebar />

      <section className="mx-auto py-4 dark:bg-black-200 xl:container min-h-screen mt-24 relative">
        <div className="col-span-12 flex justify-center ">
          <button
            className="text-xl p-2 bg-gray-100 rounded-lg absolute top-0"
            onClick={() => setShowFilter(!showFilter)}
          >
            <img src="/images/filter.svg" alt="" />
          </button>
          {showFilter && <FilterProducts setCurrentPage={setCurrentPage} />}
        </div>
        {productLoading || paginationLoading ? (
          <Spinner />
        ) : paginations?.length ? (
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
      </section>

      <Footer />
    </>
  );
}
