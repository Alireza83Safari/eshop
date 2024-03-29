import React, { useState, lazy, Suspense, useMemo } from "react";
import Spinner from "../Spinner/Spinner";
import userAxios from "../../services/Axios/userInterceptors";
import GetPagination from "../getPagination";
import { useLocation } from "react-router-dom";
import { usePaginationURL } from "../../hooks/usePaginationURL";
import { useFetchPagination } from "../../hooks/useFetchPagination";
import ProductTemplate from "./ProductTemplate";
const FilterProducts = lazy(() => import("./FilterProducts"));

export default function Products() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const limitUrl = searchParams.get("limit");
  const pageSize = limitUrl ? +limitUrl : 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  const { isLoading: paginationLoading } = usePaginationURL(
    currentPage,
    pageSize
  );

  let url = `product`;

  const { isLoading, paginations, total } = useFetchPagination(url, userAxios);
  const pagesCount = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  return (
    <>
      <div className="grid grid-cols-12 xl:px-8 px-5">
        <div className="col-span-12 flex justify-center ">
          <button
            className="text-xl p-2 bg-gray-100 rounded-lg absolute top-0"
            onClick={() => setShowFilter(!showFilter)}
          >
            <img src="/images/filter.svg" alt="" />
          </button>
          {showFilter && (
            <Suspense>
              <FilterProducts setCurrentPage={setCurrentPage} />
            </Suspense>
          )}
        </div>
        {isLoading || paginationLoading ? (
          <div className="pt-32 col-span-12">
            <Spinner />
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 col-span-12 mt-8 pb-14">
            {!!paginations?.length ? (
              paginations?.map((product) => (
                <ProductTemplate product={product} />
              ))
            ) : (
              <div className="flex justify-center items-center mt-32 lg:col-span-4 sm:col-span-3 col-span-2">
                {/*    <div>
                  <img src="/images/not-found-product.svg" alt="" />
                  <p className="text-center mt-8 text-lg font-bold dark:text-white-100">
                    Product Not Found
                  </p>
                </div> */}
              </div>
            )}
          </div>
        )}
      </div>

      {!!paginations?.length && (
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
