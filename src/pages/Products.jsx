import React, { useEffect, useState, lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import Spinner from "../components/Spinner/Spinner";
import useFetch from "../hooks/useFetch";
import Header from "./Header/Header";
import Footer from "./Footer";
import Pagination from "../components/Paganation";
import instance from "../api/userInterceptors";
import { useLocation } from "react-router-dom";
const ProductsTemplate = lazy(() => import("../components/ProductsTemplate"));
const FilterProducts = lazy(() => import("../components/FilterProducts"));

export default function Products() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [showFilterInSm, setShowFilterInSm] = useState(false);
  const [getProducts, setProducts] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);

  let pageSize = 9;
  let pageNumber;
  let totalPage = Math.ceil(getProducts?.length / pageSize || 1);
  pageNumber = Array.from(Array(totalPage).keys());

  const { datas: productsData, isLoading } = useFetch("/product",instance);

  const fetchSearchResults = async () => {
    try {
      const response = await instance.get(
        `/product?page=${currentPage}&limit=${pageSize}`
      );
    } catch (error) {
      console.log("Error fetching search results:", error);
    }
  };

  const filterProductHandler = () => {
    let url = location.search;
    instance
      .get(`/product${url}`)
      .then((res) => setFilterProduct(res?.data));
  };

  useEffect(() => {
    fetchSearchResults();
  }, [currentPage]);

  useEffect(() => {
    filterProductHandler();
  }, [location.search]);

  useEffect(() => {
    setProducts(
      filterProduct?.data?.length >= 1
        ? filterProduct?.data
        : productsData?.data
    );
  }, [filterProduct, productsData]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    setPaginatedProducts(
      getProducts?.length ? getProducts?.slice(startIndex, endIndex) : []
    );
  }, [currentPage, getProducts]);

  return (
    <>
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="relative mx-auto py-4 dark:bg-black-200 xl:container min-h-screen mt-24">
          <div className="grid grid-cols-12 xl:px-20 px-5">
            <div className="col-span-12 flex justify-center">
              <button
                className="text-xl p-2 bg-gray-100 rounded-lg absolute top-0"
                onClick={() => setShowFilterInSm(!showFilterInSm)}
              >
                <img src="/images/filter.svg" alt="" />
              </button>
              <Suspense fallback={<Spinner />}>
                <FilterProducts
                  showFilterInSm={showFilterInSm}
                  setCurrentPage={setCurrentPage}
                />
              </Suspense>
            </div>

            <div className="relative grid lg:grid-cols-3 sm:grid-cols-2 col-span-12 mt-5 pb-14">
              <Suspense fallback={<Spinner />}>
                <>
                  {paginatedProducts?.map((product) => (
                    <ProductsTemplate product={product} />
                  ))}
                </>
              </Suspense>
            </div>
          </div>

          <div className="flex justify-center">
            <Pagination
              pageNumber={pageNumber}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
          <ToastContainer />
        </section>
      )}
      <Footer />
    </>
  );
}
