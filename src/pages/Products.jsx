import React, { useContext, useEffect, useReducer, useState } from "react";
import productsContext from "../Context/productsContext";
import ProductsTemplate from "../components/ProductsTemplate";
import FilterProducts from "../components/FilterProducts";
import { ToastContainer, toast } from "react-toastify";
import Header from "./Header/Header";
import Footer from "./Footer";
import useProductItem from "../hooks/useProductItem";
import Spinner from "../components/Spinner/Spinner";

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
  const { getProducts, token, isLoading } = useContext(productsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [showFilterInSm, setShowFilterInSm] = useState(false);
  const [productId, setProductId] = useState();
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

  const { productItem } = useProductItem(productId, token);
  const valueAtIndex0 = productItem && productItem[0]?.id;

  console.log(valueAtIndex0);
  const BasketHandler = (cartID) => {
    setProductId(cartID);

    const productToAdd = getProducts.find((product) => product.id === cartID);

    // const isProductInCart = checkOut.some((product) => product.id === cartID);

    toast.success(`${productToAdd.name} added to cart!`, {
      position: "bottom-right",
    });

    let userBasketHandler = {
      productItemId: valueAtIndex0,
      quantity: 1,
    };

    fetch("/api/v1/orderItem", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(userBasketHandler),
    })
      .then((res) => {
        res.json();
        console.log(res);
      })
      .catch((res) => console.log(res));
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M15 10.5A3.502 3.502 0 0018.355 8H21a1 1 0 100-2h-2.645a3.502 3.502 0 00-6.71 0H3a1 1 0 000 2h8.645A3.502 3.502 0 0015 10.5zM3 16a1 1 0 100 2h2.145a3.502 3.502 0 006.71 0H21a1 1 0 100-2h-9.145a3.502 3.502 0 00-6.71 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <FilterProducts
                state={state}
                dispatch={dispatch}
                showFilterInSm={showFilterInSm}
              />
            </div>

            <div className="relative grid lg:grid-cols-3 sm:grid-cols-2 col-span-12 mt-5 pb-14">
              {paginatedProducts.map((product) => (
                <ProductsTemplate
                  product={product}
                  basketHandler={BasketHandler}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center ">
            <div className="flex justify-center absolute bottom-0 mx-auto text-center">
              {pageNumber.map((page) => (
                <div
                  className={`" flex items-center justify-center rounded-md font-bold w-8 h-8 m-2 p-3 " ${
                    currentPage === page + 1
                      ? "bg-blue-600 text-white-100"
                      : "bg-white-200 text-black-600"
                  }`}
                  onClick={() => setCurrentPage(page + 1)}
                  key={page + 1}
                >
                  {page + 1}
                </div>
              ))}
            </div>
          </div>
          <ToastContainer />
        </section>
      )}
      <Footer />
    </>
  );
}
