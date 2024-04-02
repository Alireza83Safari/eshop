import React, { useState, lazy, Suspense, useRef, useCallback } from "react";
import Spinner from "../Spinner/Spinner";
import ProductTemplate from "./ProductTemplate";
import useProducts from "../../api/product/user/useProducts";
const FilterProducts = lazy(() => import("./FilterProducts"));

export default function Products() {
  const [showFilter, setShowFilter] = useState(false);
  const observer = useRef(null);

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useProducts();

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isLoading, isLoading]
  );

  return (
    <div className="grid grid-cols-12 xl:px-8 px-5">
      <div className="col-span-12 flex justify-center ">
        <button
          className="text-xl p-2 bg-gray-100 rounded-lg absolute top-0"
          onClick={() => setShowFilter(!showFilter)}
        >
          <img src="/images/filter.svg" alt="filter icon" />
        </button>
        {showFilter && (
          <Suspense>
            <FilterProducts />
          </Suspense>
        )}
      </div>

      <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 col-span-12 mt-8 pb-14">
        {products?.map((product) => (
          <ProductTemplate product={product} key={product.id} />
        ))}
        <div ref={lastElementRef}></div>
        {isLoading || isFetchingNextPage ? <Spinner /> : ""}
      </div>
    </div>
  );
}
