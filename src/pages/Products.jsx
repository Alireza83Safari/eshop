import React, { useContext, useEffect, useReducer, useState } from "react";
import productsContext from "../Context/productsContext";
import ProductsTemplate from "../components/ProductsTemplate";
import FilterProducts from "../components/FilterProducts";
import { ToastContainer, toast } from "react-toastify";

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
  const { getProducts } = useContext(productsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const { checkOut, setCheckOut } = useContext(productsContext);

  let pageSize = 8;
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

  const basketHandler = (cartID) => {
   

    const productToAdd = getProducts.find((product) => product.id === cartID);

    const isProductInCart = checkOut.some((product) => product.id === cartID);

    if (!isProductInCart && productToAdd) {
      setCheckOut((prevCart) => [...prevCart, productToAdd]);
    }

    toast.success(`${productToAdd.name} added to cart!`, {
      position: "bottom-right",
    });
  };

  return (
    <div className="relative mx-auto mt-24 py-4 dark:bg-black-200">
      <div className="md:grid md:grid-cols-12 xl:px-10 md:px-5">
        <div className="lg:col-span-2 md:col-span-3 md:pr-10 md:px-0 px-10">
          <FilterProducts state={state} dispatch={dispatch} />
        </div>

        <div className="lg:col-span-10 md:col-span-9 grid sm:grid-cols-2 grid-cols-1 pb-14 gap-4 px-3">
          {paginatedProducts.map((product) => (
            <ProductsTemplate product={product} basketHandler={basketHandler} />
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
    </div>
  );
}
