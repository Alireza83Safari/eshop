import React, { Suspense, lazy, useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userAxios from "../services/Axios/userInterceptors";
import Spinner from "../components/Spinner/Spinner";
import Header from "./Header/Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import Sidebar from "./Sidebar/Sidebar";
import FilterProducts from "../components/Product/FilterProducts";
const ProductTemplate = lazy(() =>
  import("../components/Product/ProductTemplate")
);

export default function BrandResult() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [filterProduct, setFilterProduct] = useState([]);

  const BasketHandler = (cartID) => {
    let userBasketHandler = {
      productItemId: cartID.itemId,
      quantity: 1,
    };

    userAxios.post("/orderItem", userBasketHandler).then((res) => {
      if (res.status === 200) {
        toast.success(`${cartID.name} added to cart!`, {
          position: "bottom-right",
        });
      }
    });
  };

  const pagesCount = Math.ceil(filterProduct / pageSize);
  /*   console.log(productsData?.data); */
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

      if (pagesCount > 1) {
        navigate(`?${searchParams.toString()}`);
      }
    };
    fetchSearchResults();
  }, [currentPage, categoryId, brandId, filterProduct]);

  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const maxPage = 3;
  const [endPageIndex, setEndPageIndex] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const currentPageIndex = currentPage - 1;
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
          setFilterProduct(res?.data?.total);
          console.log(res?.data?.total);
        })
        .catch((err) => setIsLoading(err));
    }, 1000);
  }, [location.search, categoryId, brandId, order, minPrice, maxPrice]);
  useEffect(() => {
    setEndPageIndex(currentPage + maxPage);
  }, [currentPage]);

  const arrayPage = Array.from(Array(pagesCount).keys());
  const showPage = useMemo(() => {
    return arrayPage?.slice(currentPage - 1, endPageIndex);
  }, [arrayPage]);

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
            <img src="/images/filter.svg" alt="" />
          </button>
          {showFilter && (
            <Suspense fallback={<Spinner />}>
              <FilterProducts setCurrentPage={setCurrentPage} />
            </Suspense>
          )}
        </div>
        {isLoading ? (
          <Spinner />
        ) : paginatedProducts.length ? (
          <Suspense fallback={<Spinner />}>
            <ProductTemplate
              mapData={paginatedProducts}
              basketHandler={BasketHandler}
            />
          </Suspense>
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
