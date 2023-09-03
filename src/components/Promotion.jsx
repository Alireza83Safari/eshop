import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userAxios from "../services/Axios/userInterceptors";
import axios from "axios";

export default function Suggestion() {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [suggestionProduct, setSuggestionProduct] = useState({
    id: "ae0ed272-feb1-41af-bbc4-d14f03f58992",
    name: "Iphone 13 pro max",
    code: "1747",
    brandId: "95231911-ba44-47b1-aac4-47a544546ebd",
    brandName: "اپل",
    categoryId: "78a03d81-0a36-47c5-8da6-81741234917f",
    categoryName: "Electronics",
    price: 1299,
    itemId: "7e8e6f2b-24af-4c53-9586-7a452df153fd",
    fileUrl: "uploads/product/01bc03af-9404-4c88-95f5-5dfc6db79634.png",
  });

  const [getProducts, setProducts] = useState([]);
  const { datas: productsData } = useFetch("product", userAxios);


  useEffect(() => {
    if (productsData && productsData.data) {
      setProducts(productsData.data);
    }
  }, [productsData]);

  const addToCart = (data) => {
    let productData = {
      productItemId: data.itemId,
      quantity: 1,
    };
    userAxios.post("/orderItem", productData).then((res) => {
      if (res.status === 200) {
        toast.success(`${data.name} added to cart!`, {
          position: "bottom-right",
        });
      }
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * getProducts.length);

      setSuggestionProduct(getProducts[randomIndex]);
    }, 10000);

    return () => clearInterval(timer);
  }, [getProducts]);

  // Function to navigate to previous product
  const goToPreviousProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === 0 ? getProducts.length - 1 : prevIndex - 1
    );
    setSuggestionProduct(getProducts[currentProductIndex]);
  };

  // Function to navigate to next product
  const goToNextProduct = () => {
    if (currentProductIndex === getProducts.length) {
      setCurrentProductIndex(0);
    }
    setCurrentProductIndex((prevIndex) =>
      prevIndex === getProducts.length - 1 ? 0 : prevIndex + 1
    );
    setSuggestionProduct(getProducts[currentProductIndex]);
  };

  const [hover, setHover] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * getProducts.length);

      setSuggestionProduct(getProducts[randomIndex]);
    }, 10000);

    return () => clearInterval(timer);
  }, [getProducts]);
  return (
    <section
      className="w-full px-4 lg:px-20 lg:mt-52 mt-32 relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        className={`absolute left-8 top-40 z-10 outline-none duration-500 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
        onClick={goToPreviousProduct}
      >
        <FontAwesomeIcon icon={faAngleLeft} className="lg:text-4xl text-2xl" />
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="text-black-900 dark:text-white-100 mx-auto">
          <h1 className="sm:text-3xl lg:text-5xl md:font-4xl text-2xl font-black md:mb-0 md:text-start text-center mb-10">
            {suggestionProduct?.name}
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <Timer days={12} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-black-900 dark:text-white-100">
        <div className="mt-6 md:mt-16 md:block hidden">
          <h2 className="text-2xl font-bold">Share Now Deal</h2>
          <p className="mt-4 md:mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
            maiores?
          </p>
          <p className="mt-4 md:mt-12 text-xl text-center font-bold">
            {suggestionProduct?.price}$
          </p>
        </div>
        <div className="flex justify-center items-center md:w-[20rem] md:h-[20rem] h-[20rem]">
          <img
            src={`http://127.0.0.1:6060/${suggestionProduct?.fileUrl}`}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            className="text-white-100 rounded-md py-3 px-20 md:px-14 bg-blue-600 md:mt-40 mt-10"
            onClick={() => addToCart(suggestionProduct)}
          >
            Buy Now
          </button>
        </div>
      </div>
      <button
        className={`absolute right-8 top-40 z-10 outline-none duration-500 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => goToNextProduct()}
      >
        <FontAwesomeIcon icon={faAngleRight} className="lg:text-4xl text-2xl" />
      </button>

      <ToastContainer />
    </section>
  );
}
