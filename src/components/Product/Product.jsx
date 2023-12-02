import React, { useState, lazy, Suspense } from "react";
import Spinner from "../Spinner/Spinner";
import useFetch from "../../hooks/useFetch";
import userAxios from "../../services/Axios/userInterceptors";
import GetPagination from "../getPagination";
import { usePaginationURL } from "../../hooks/usePaginationURL";
import { useFetchPagination } from "../../hooks/useFetchPagination";
import { useLocation } from "react-router-dom";
const ProductTemplate = lazy(() => import("../Product/ProductTemplate"));
const FilterProducts = lazy(() => import("./FilterProducts"));

export default function Product() {
  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const { datas: productsData } = useFetch("/product", userAxios);

  const pagesCount = Math.ceil(productsData?.data?.length / pageSize);

  const { isLoading: paginationLoading } = usePaginationURL(
    currentPage,
    pageSize
  );

  const location = useLocation();
  let url = `/product`;

  const { isLoading, paginations, total, fetchData } = useFetchPagination(
    url,
    userAxios
  );

  return (
    <>
      <div className="grid grid-cols-12 xl:px-20 px-5">
        <div className="col-span-12 flex justify-center ">
          <button
            className="text-xl p-2 bg-gray-100 rounded-lg absolute top-0"
            onClick={() => setShowFilter(!showFilter)}
          >
            <img src="/images/filter.svg" alt="" />
          </button>
          {showFilter && (
            <Suspense fallback={<Spinner />}>
              <FilterProducts setCurrentPage={setCurrentPage} />
            </Suspense>
          )}
        </div>
        {isLoading || paginationLoading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <Suspense fallback={<Spinner />}>
            <ProductTemplate mapData={paginations} />
          </Suspense>
        )}
      </div>

      {paginations?.length >= 1 && (
        <GetPagination
          pagesCount={pagesCount}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      )}
    </>
  );
}
