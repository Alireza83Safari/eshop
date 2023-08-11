import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  lazy,
  Suspense,
} from "react";
import productsContext from "../Context/productsContext";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../components/Spinner/Spinner";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import Header from "./Header/Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
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
  const { token } = useContext(productsContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [showFilterInSm, setShowFilterInSm] = useState(false);
  const [productId, setProductId] = useState();
  const [getProducts, setProducts] = useState([]);
  const { datas: productsData } = useFetch("/api/v1/product");
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

  // Filter logic for products
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

  // Fetch user-specific product data
  const { datas, isLoading } = useFetch("api/v1/user/product");
  useEffect(() => {
    if (datas && datas.data) {
      setProducts(datas.data);
    }
  }, [datas]);

  // Hook for posting data
  const { doPost } = usePost();

  // Fetch product item details
  const { datas: productItem } = useFetch(
    `/api/v1/admin/productItem/product/${productId}`
  );

  // Handling adding items to the cart
  const BasketHandler = (cartID) => {
    const valueAtIndex0 = productItem && productItem[0]?.id;

    setProductId(cartID);
    let userBasketHandler = {
      productItemId: valueAtIndex0,
      quantity: 1,
    };
    
    doPost("/api/v1/user/orderItem", userBasketHandler, {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    const productToAdd = getProducts.find((product) => product.id === cartID);

    toast.success(`${productToAdd.name} added to cart!`, {
      position: "bottom-right",
    });
  };

  // Update paginated products based on filters and sorting
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
                {paginatedProducts.map((product) => (
                  <ProductsTemplate
                    product={product}
                    basketHandler={BasketHandler}
                  />
                ))}
              </Suspense>
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
