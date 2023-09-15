import React, { useEffect, useState, lazy, Suspense, useMemo } from "react";
import Spinner from "../Spinner/Spinner";
import useFetch from "../../hooks/useFetch";
import userAxios from "../../services/Axios/userInterceptors";
import { useLocation, useNavigate } from "react-router-dom";
import GetPagination from "../getPagination";
const ProductTemplate = lazy(() => import("../Product/ProductTemplate"));
const FilterProducts = lazy(() => import("./FilterProducts"));

export default function Product() {
  const location = useLocation();
  const navigate = useNavigate();
  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filterProduct, setFilterProduct] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  const { datas: productsData, isLoading: productLoading } = useFetch(
    "/product",
    userAxios
  );

  const pagesCount = Math.ceil(
    filterProduct > 1
      ? filterProduct / pageSize
      : !productLoading && productsData?.total / pageSize
  );

  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("categoryId");
  const brandId = searchParams.get("brandId");
  const order = searchParams.get("order");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  useEffect(() => {
    const fetchSearchResults = () => {
      searchParams.set("page", currentPage.toString());
      searchParams.set("limit", pageSize.toString());

      navigate(`?${searchParams.toString()}`);
    };
    fetchSearchResults();
  }, [currentPage, categoryId, brandId, filterProduct]);

  const [paginatedProducts, setPaginatedProducts] = useState([]);

  useEffect(() => {
    let url = `/product?page=${currentPage}&limit=${pageSize}`;
    if (categoryId) url += `&categoryId=${categoryId}`;
    if (brandId) url += `&brandId=${brandId}`;
    if (order) url += `&order=${order}`;
    if (minPrice) url += `&minPrice=${minPrice}`;
    if (maxPrice) url += `&maxPrice=${maxPrice}`;

    setIsLoading(true);

    setTimeout(() => {
      userAxios
        .get(url)
        .then((res) => {
          setIsLoading(false);
          setPaginatedProducts(res?.data?.data);
          url != `/product?page=${currentPage}&limit=${pageSize}`
            ? setFilterProduct(res?.data?.total)
            : setFilterProduct(0);
        })
        .catch((err) => setIsLoading(err));
    }, 1000);
  }, [location.search, categoryId, brandId, order, minPrice, maxPrice]);

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
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <Suspense>
            <ProductTemplate mapData={paginatedProducts} />
          </Suspense>
        )}
      </div>

      <GetPagination
        pagesCount={pagesCount}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </>
  );
}
