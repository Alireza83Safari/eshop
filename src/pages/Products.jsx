import React, { useEffect, useState, lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import Spinner from "../components/Spinner/Spinner";
import useFetch from "../hooks/useFetch";
import Header from "./Header/Header";
import Footer from "./Footer";
import userAxios from "./../services/Axios/userInterceptors";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import FilterProducts from "../components/Product/FilterProducts";

const ProductTemplate = lazy(() =>
  import("../components/Product/ProductTemplate")
);

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();
  const pageSize = 6;

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);

  // State for filtering
  const [showFilter, setShowFilter] = useState(false);

  const currentPageIndex = currentPage - 1;

  // Fetch product data
  const { datas: productsData } = useFetch("/product", userAxios);
  const pagesCount = Math.ceil(
    filterProduct > 1
      ? filterProduct / pageSize
      : productsData?.data?.length / pageSize
  );

  const searchParams = new URLSearchParams(location.search);
  const categoryId = searchParams.get("categoryId");
  const brandId = searchParams.get("brandId");
  const order = searchParams.get("order");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  useEffect(() => {
    // Update the URL query parameters when the page or filters change
    const fetchSearchResults = () => {
      searchParams.set("page", currentPage.toString());
      searchParams.set("limit", pageSize.toString());

      navigate(`?${searchParams.toString()}`);
    };
    fetchSearchResults();
  }, [currentPage, categoryId, brandId]);

  const [paginatedProducts, setPaginatedProducts] = useState([]);

  useEffect(() => {
    // Fetch paginated products based on filters and page number
    let url = `/product?page=${currentPage}&limit=${pageSize}`;
    if (categoryId) url += `&categoryId=${categoryId}`;
    if (brandId) url += `&brandId=${brandId}`;
    if (order) url += `&order=${order}`;
    if (minPrice) url += `&minPrice=${minPrice}`;
    if (maxPrice) url += `&maxPrice=${maxPrice}`;

    setIsLoading(true);

    // Simulate a delay for loading (remove this in production)
    setTimeout(() => {
      userAxios
        .get(url)
        .then((res) => {
          setIsLoading(false);
          setPaginatedProducts(res?.data?.data);
          if (url !== `/product?page=${currentPage}&limit=${pageSize}`) {
            setFilterProduct(res?.data?.total);
          }
        })
        .catch((err) => setIsLoading(err));
    }, 1000);
  }, [location.search]);

  return (
    <>
      <Header />
      <Sidebar />
      <section className="mx-auto py-4 dark:bg-black-200 xl:container min-h-screen mt-24 relative">
        <div className="grid grid-cols-12 xl:px-20 px-5">
          <div className="col-span-12 flex justify-center ">
            <button
              className="text-xl p-2 bg-gray-100 rounded-lg absolute top-0"
              onClick={() => setShowFilter(!showFilter)}
            >
              <img src="/images/filter.svg" alt="" />
            </button>
            {showFilter && <FilterProducts setCurrentPage={setCurrentPage} />}
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <div className="relative grid lg:grid-cols-3 sm:grid-cols-2 col-span-12 mt-5 pb-14">
              <Suspense>
                {paginatedProducts?.map((product) => (
                  <ProductTemplate key={product.id} product={product} />
                ))}
              </Suspense>
            </div>
          )}
        </div>

        <nav className="flex justify-center">
          <ul className="flex absolute bottom-0" aria-current="page">
            {currentPageIndex > 0 && (
              <li
                style={{ cursor: "pointer" }}
                onClick={() => setCurrentPage(currentPageIndex)}
                className="flex items-center justify-center"
              >
                <span className="text-xs">Previous</span>
              </li>
            )}
            {Array.from({ length: pagesCount }, (_, i) => (
              <li
                className={`flex items-center justify-center rounded-md font-bold w-10 h-10 m-2 p-3 ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white-100  mx-3"
                    : "bg-white-200 text-black-600 mx-3"
                }`}
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                <span className="page-link">{i + 1}</span>
              </li>
            ))}
            {currentPageIndex < pagesCount - 1 && (
              <li
                className="flex items-center justify-center"
                onClick={() => setCurrentPage(currentPageIndex + 2)}
              >
                <span className="text-xs">Next</span>
              </li>
            )}
          </ul>
        </nav>
        <ToastContainer />
      </section>
      <Footer />
    </>
  );
}
