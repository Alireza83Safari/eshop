import React, { Suspense, lazy, useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import userAxios from "../services/Axios/userInterceptors";
import Spinner from "../components/Spinner/Spinner";
import Header from "./Header/Header";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "./Sidebar/Sidebar";
import FilterProducts from "../components/Product/FilterProducts";
import Pagination from "../components/getPagination";
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
  const [showFilter, setShowFilter] = useState(false);

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
        })
        .catch((err) => setIsLoading(err));
    }, 1000);
  }, [location.search, categoryId, brandId, order, minPrice, maxPrice]);

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
