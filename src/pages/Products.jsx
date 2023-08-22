import React, { useEffect, useReducer, useState, lazy, Suspense } from "react";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../components/Spinner/Spinner";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import Header from "./Header/Header";
import Footer from "./Footer";
import Pagination from "../components/Paganation";
const ProductsTemplate = lazy(() => import("../components/ProductsTemplate"));
const FilterProducts = lazy(() => import("../components/FilterProducts"));

// Reducer function for filtering products
const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_MIN_PRICE":
      return { ...state, minPrice: action.payload };
    case "SET_MAX_PRICE":
      return { ...state, maxPrice: action.payload };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_SORT":
      return { ...state, sortBy: action.payload };
    default:
      return state;
  }
};

export default function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [showFilterInSm, setShowFilterInSm] = useState(false);
  const [getProducts, setProducts] = useState([]);
  const { datas: productsData } = useFetch("/api/v1/user/product");
  useEffect(() => {
    if (productsData && productsData.data) {
      setProducts(productsData.data);
    }
  }, [productsData]);

  let pageSize = 9;
  let pageNumber;
  let totalPage = Math.ceil(getProducts.length / pageSize);
  pageNumber = Array.from(Array(totalPage).keys());

  const initialState = {
    minPrice: "",
    maxPrice: "",
    selectedCategory: "All",
    sortBy: "",
  };

  const [state, dispatch] = useReducer(filterReducer, initialState);

  const filterProducts = (product) => {
    const { minPrice, maxPrice, selectedCategory } = state;
    const priceFilter =
      (!minPrice && !maxPrice) ||
      (minPrice && !maxPrice && product.price >= parseFloat(minPrice)) ||
      (!minPrice && maxPrice && product.price <= parseFloat(maxPrice)) ||
      (minPrice &&
        maxPrice &&
        product.price >= parseFloat(minPrice) &&
        product.price <= parseFloat(maxPrice));

    const categoryFilter =
      selectedCategory === "All" || product.category === selectedCategory;

    return priceFilter && categoryFilter;
  };

  const { datas, isLoading } = useFetch("api/v1/user/product");
  useEffect(() => {
    if (datas && datas.data) {
      setProducts(datas.data);
    }
  }, [datas]);

  useEffect(() => {
    let endIndex = currentPage * pageSize;
    let startIndex = endIndex - pageSize;
    const sortedAndFilteredProducts = getProducts
      .filter(filterProducts)
      .sort((a, b) => {
        const { sortBy } = state;
        if (sortBy === "lowToHigh") {
          return a.price - b.price;
        } else if (sortBy === "highToLow") {
          return b.price - a.price;
        } else {
          return 0;
        }
      });

    setPaginatedProducts(sortedAndFilteredProducts.slice(startIndex, endIndex));
  }, [getProducts, currentPage, state]);

  const { doPost } = usePost();

  const BasketHandler = (ID) => {
    let cartID = ID?.id;

    let userBasketHandler = {
      productItemId: ID.itemId,
      quantity: 1,
    };

    doPost("/api/v1/user/orderItem", userBasketHandler);

    const productToAdd = getProducts.find((product) => product.id === cartID);

    toast.success(`${productToAdd.name} added to cart!`, {
      position: "bottom-right",
    });
  };
  return (
    <>
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="relative mx-auto mt-4 py-4 dark:bg-black-200 xl:container">
          <div className="grid grid-cols-12 xl:px-20 px-5">
            <div className="col-span-12 flex justify-center">
              <button
                className="text-xl p-2 bg-gray-100 rounded-lg absolute top-0 z-10"
                onClick={() => setShowFilterInSm(!showFilterInSm)}
              >
                <img src="/images/filter.svg" alt="" />
              </button>
              <Suspense fallback={<Spinner />}>
                <FilterProducts
                  state={state}
                  dispatch={dispatch}
                  showFilterInSm={showFilterInSm}
                />
              </Suspense>
            </div>

            <div className="relative grid lg:grid-cols-3 sm:grid-cols-2 col-span-12 mt-5 pb-14">
              <Suspense fallback={<Spinner />}>
                <>
                  {paginatedProducts.map((product) => (
                    <ProductsTemplate
                      product={product}
                      basketHandler={BasketHandler}
                    />
                  ))}
                  {console.log(paginatedProducts)}
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
