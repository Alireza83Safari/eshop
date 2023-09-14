import React, { Suspense, lazy, useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userAxios from "../services/Axios/userInterceptors";
import Spinner from "../components/Spinner/Spinner";
import Header from "./Header/Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar/Sidebar";
import FilterProducts from "../components/Product/FilterProducts";
import useAddToCart from "../hooks/useAddCart";
const ProductTemplate = lazy(() =>
  import("../components/Product/ProductTemplate")
);

export default function SearchResults() {
  const [showFilter, setShowFilter] = useState(false);

  const { addToCart } = useAddToCart();

  const BasketHandler = (product) => {
    addToCart(product.itemId, 1, product);
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const pageSize = 12;
  const maxPage = 3;
  const [endPageIndex, setEndPageIndex] = useState(null);
  const currentPageIndex = currentPage - 1;

  const pagesCount = Math.ceil(filterProduct / pageSize);

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
  }, [currentPage, categoryId, brandId]);

  const [paginatedProducts, setPaginatedProducts] = useState([]);
  useEffect(() => {
    let searchParam = searchParams.get("searchTerm");
    let url = `product?page=${currentPage}&limit=${pageSize}&searchTerm=${searchParam}`;

    if (categoryId) {
      url += `&categoryId=${categoryId}`;
    }
    if (brandId) {
      url += `&brandId=${brandId}`;
    }
    if (order) {
      url += `&order=${order}`;
    }
    if (minPrice) {
      url += `&minPrice=${minPrice}`;
    }
    if (maxPrice) {
      url += `&maxPrice=${maxPrice}`;
    }
    setIsLoading(true);
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
    }, 800);
  }, [location.search]);

  useEffect(() => {
    setEndPageIndex(currentPage + maxPage);
  }, [currentPage]);
  let arrayPage = Array.from(Array(pagesCount).keys());
  const showPage = useMemo(() => {
    return arrayPage?.slice(currentPage - 1, endPageIndex);
  }, [arrayPage]);
  return (
    <>
      <Header />
      <Sidebar />
      <section className="min-h-screen mt-28 relative lg:container mx-auto">
        <div className="col-span-12 flex justify-center ">
          <button
            className="text-xl p-2 bg-gray-100 rounded-lg absolute top-0"
            onClick={() => setShowFilter(!showFilter)}
          >
            <img src="/images/filter.svg" alt="" />
          </button>
          {showFilter && <FilterProducts setCurrentPage={setCurrentPage} />}
        </div>
        {paginatedProducts.length ? (
          isLoading ? (
            <Spinner />
          ) : (
            <div className="relative grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 col-span-12 mt-8 pb-14">
              {paginatedProducts?.map((product) => (
                <Suspense fallback={<Spinner />}>
                  <ProductTemplate
                    product={product}
                    basketHandler={BasketHandler}
                  />
                </Suspense>
              ))}
            </div>
          )
        ) : (
          <div className="flex justify-center items-center mt-32">
            <div>
              <img
                src="https://www.digikala.com/statics/img/svg/plp/not-found.svg"
                alt=""
              />
              <p className="text-center mt-8 text-lg font-bold">
                Product Not Found
              </p>
            </div>
          </div>
        )}
        {pagesCount > 1 && (
          <nav className="flex justify-center">
            <ul className="flex absolute bottom-0" aria-current="page">
              {currentPageIndex > 0 && (
                <li
                  onClick={() => setCurrentPage(currentPageIndex)}
                  className="flex items-center justify-center"
                >
                  <span className="text-xs dark:text-white-100">Previous</span>
                </li>
              )}
              {showPage.map((i) => (
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
                  <span className="text-xs dark:text-white-100">Next</span>
                </li>
              )}
            </ul>
          </nav>
        )}
        <ToastContainer />
      </section>

      <Footer />
    </>
  );
}
