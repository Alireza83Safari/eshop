import React, { useContext, useState, Suspense, lazy , useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faMoneyBill,
  faShieldAlt,
  faStar,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import productsContext from "../Context/productsContext";
import Header from "./Header/Header";
import Footer from "./Footer";
import usePost from "../hooks/usePost";
import Spinner from "../components/Spinner/Spinner";
import useFetch from "../hooks/useFetch";
const Breadcrumb = lazy(() => import("../components/Breadcrumb"));
const Description = lazy(() => import("../components/Description"));
const Comments = lazy(() => import("../components/Comments"));

export default function ProductsInfo() {
  const { token } = useContext(productsContext);
  const { productID } = useParams();
  const [activeTab, setActiveTab] = useState("description");
  const { doPost } = usePost();
  const findProduct = getProducts.find((product) => product.id == productID);

  const [getProducts, setProducts] = useState([]);
  const { datas: productsData } = useFetch("/api/v1/product");
  useEffect(() => {
    if (productsData && productsData.data) {
      setProducts(productsData.data);
    }
  }, [productsData]);

  // Add the product to the cart
  const handleAddToCart = () => {
    let productData = {
      productItemId: findProduct.itemId,
      quantity: 1,
    };

    // Make a POST request to add the product to the cart
    doPost("/api/v1/orderItem", productData, {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    toast.success(`${findProduct.name} added to cart!`, {
      position: "bottom-right",
    });
  };
  // Add the product to favorites
  const addToFavorite = (ID) => {
    let productData = {
      productItemId: ID,
    };
    // Make a POST request to add the product to favorites
    fetch("/api/v1/favoriteProductItem", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    }).then((res) => {
      res.json();
      if (res.status === 200) {
        toast.success(`${findProduct.name} added to favorite!`, {
          position: "bottom-right",
        });
      } else if (res.status === 400) {
        toast.success(`${findProduct.name} Previously added product`, {
          position: "bottom-right",
          type: "warning",
        });
      }
    });
  };

  // Display "Product not found" message if the product is not found
  if (!findProduct) {
    return (
      <div className="flex justify-center items-center text-5xl">
        Product not found!
      </div>
    );
  }

  return (
    <>
      <Header />
      <section className="md:px-5 xl:px-16 px-2 xl:container mx-auto">
        <div className="grid grid-cols-12">
          <div className="lg:col-span-4 md:col-span-5 col-span-12">
            <div className="md:block flex justify-center md:w-80 w-full md:px-4 lg:py-10 md:py-20">
              <img
                src={`http://127.0.0.1:6060/${findProduct?.fileUrl}`}
                alt=""
                className="md:w-full w-7/12 object-contain md:py-0 py-5"
              />
            </div>
          </div>
          <div className="lg:col-span-6 md:col-span-7 col-span-12 md:px-0 px-8">
            <Suspense fallback={<Spinner />}>
              <Breadcrumb
                links={[
                  { id: 1, title: "Home", to: "products" },
                  {
                    id: 2,
                    title: "product Info",
                    to: "checkout",
                  },
                ]}
              />
            </Suspense>
            <div className="text-black-900 dark:text-white-100 pr-4">
              <div className="flex justify-between">
                <h1 className="sm:text-2xl text-lg font-bold">
                  {findProduct.name}
                </h1>
                <FontAwesomeIcon
                  icon={faHeart}
                  className="mr-10 text-2xl text-red-700 hover:text-red-300 duration-300"
                  onClick={() => addToFavorite(findProduct?.itemId)}
                />
              </div>
              <div className="md:flex grid grid-cols-2 sm:py-4 py-6 sm:text-sm text-xs">
                <div className="sm:mr-8">
                  <FontAwesomeIcon icon={faStar} className="text-green-300" />
                  <FontAwesomeIcon icon={faStar} className="text-green-300" />
                  <FontAwesomeIcon icon={faStar} className="text-green-300" />
                  <FontAwesomeIcon icon={faStar} className="text-green-300" />
                  <FontAwesomeIcon icon={faStar} className="text-gray-100" />
                </div>
                <p className="sm:text-sm text-xs">
                  (<span className="text-green-300 mx-1">1</span>) Review | Add
                  Review
                </p>
              </div>
              <div className="text-sm">
                <div className="md:flex grid grid-cols-2">
                  <p className="py-2 mr-20 sm:text-sm text-xs">
                    Category :
                    <Link to="electronics">{findProduct?.categoryName}</Link>
                  </p>
                  <p className="py-2 sm:text-sm text-xs">
                    Status :
                    <span className=" text-green-300 font-bold">Published</span>
                  </p>
                </div>

                <div className="mb-4 flex sm:text-sm text-xs sm:py-2 py-6">
                  <p>Color:</p>
                  <div className="mt-2 flex">
                    <div className="bg-green-300 mx-1 w-10 h-10 rounded-full"></div>
                    <div className="bg-red-700 mx-1 w-10 h-10 rounded-full"></div>
                    <div className="bg-blue-600 mx-1 w-10 h-10 rounded-full"></div>
                    <div className="bg-white-100 border mx-1 w-10 h-10 rounded-full"></div>
                  </div>
                </div>

                <p className="py-2 whitespace-break-spaces sm:text-sm text-xs">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam. fringilla viverra.
                </p>
              </div>

              <h3 className="pb-6 sm:text-sm text-xs sm:py-4 py-6">
                Total Price:
                <span className="text-lg ml-4 font-bold text-red-700">
                  {findProduct?.price}$
                </span>
              </h3>

              <button
                className="bg-blue-60 relative bg-blue-600 hover:bg-blue-300 duration-300 text-white-100 px-8 py-2 text-sm rounded-lg"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 col-span-12 lg:block sm:flex justify-between block lg:my-0 my-16 lg:px-0 px-12 text-black-900 dark:text-white-100">
            <div className="relative lg:my-5">
              <div className="flex">
                <div className="mr-4">
                  <FontAwesomeIcon
                    icon={faTruck}
                    className="block sm:text-xl text-2xl my-2 mr-2 text-blue-600"
                  />
                </div>
                <div>
                  <p className="sm:text-xs my-1">FREE SHIPPING</p>
                  <p className="sm:text-[10px] text-sm text-gray-800">
                    Free shipping on all
                  </p>
                </div>
              </div>
              <span className="sm:text-[10px] text-xs absolute top-9 text-gray-800">
                orders
              </span>
            </div>

            <div className="relative lg:my-12 sm:my-0 my-12">
              <div className="flex">
                <div className="mr-4">
                  <FontAwesomeIcon
                    icon={faMoneyBill}
                    className="block sm:text-xl text-2xl my-2 mr-2 text-green-300"
                  />
                </div>
                <div>
                  <p className="sm:text-xs sm:my-1 mt-2 sm:whitespace-normal whitespace-nowrap">
                    MONEY BACK <br className="sm:flex hidden" /> GUARANTEE
                  </p>
                </div>
              </div>
              <span className="sm:text-[10px] text-xs absolute top-10 text-gray-800 whitespace-nowrap">
                100% money back guarantee.
              </span>
            </div>

            <div className="relative lg:my-12 sm:my-0 my-7">
              <div className="flex">
                <div className="mr-4">
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className="block sm:text-xl text-2xl my-2 mr-2 text-orange-400"
                  />
                </div>
                <div>
                  <p className="sm:text-xs my-1">SAFE & SECURE</p>
                  <p className="sm:text-[10px] text-sm text-gray-800">
                    Lorem ipsum dolor sitall
                  </p>
                </div>
              </div>
              <span className="sm:text-[10px] text-xs absolute top-9 text-gray-800">
                amet
              </span>
            </div>
          </div>
        </div>
        <div className="px-8 lg:mt-16 md:mt-12 mt-4 text-black-900 dark:text-white-100">
          <div className="flex text-sm pb-5">
            <Link
              className={`mx-2 ${
                activeTab === "description" ? "font-bold" : ""
              }`}
              onClick={() => setActiveTab("description")}
            >
              DESCRIPTION
            </Link>

            <Link
              className={`mx-2 ${activeTab === "reviews" ? "font-bold" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              REVIEWS
            </Link>
          </div>
          <Suspense fallback={<Spinner />}>
            {activeTab === "description" && <Description />}
          </Suspense>
          <Suspense fallback={<Spinner />}>
            {activeTab === "reviews" && <Comments />}
          </Suspense>
        </div>
        <ToastContainer />
      </section>

      <Footer />
    </>
  );
}
