import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userAxios from "../services/Axios/userInterceptors";
import { Link } from "react-router-dom";

export default function Suggestion() {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [suggestionProduct, setSuggestionProduct] = useState(null);

  const [getProducts, setProducts] = useState([]);
  const { datas: promotion } = useFetch("product", userAxios);

  useEffect(() => {
    if (promotion && promotion.data) {
      setProducts(promotion.data);
    }
  }, [promotion]);

  useEffect(() => {
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * promotion?.data?.length);
      setCurrentProductIndex(randomIndex);
    }, 10000);

    return () => clearInterval(timer);
  }, [promotion]);

  // Function to navigate to previous product
  const goToPreviousProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === 0 ? promotion?.data?.length - 1 : prevIndex - 1
    );
  };

  // Function to navigate to next product
  const goToNextProduct = () => {
    if (currentProductIndex === promotion?.data.length) {
      setCurrentProductIndex(0);
    }
    setCurrentProductIndex((prevIndex) =>
      prevIndex === promotion?.data?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const [hover, setHover] = useState(false);

  return (
    <section
      className="w-full px-4 lg:px-20 lg:mt-52 mt-32 relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        className={` absolute left-8 top-40 z-10 outline-none duration-500 dark:text-white-100 ${
          hover ? "opacity-100" : "opacity-0"
        }`}
        onClick={goToPreviousProduct}
      >
        <FontAwesomeIcon icon={faAngleLeft} className="lg:text-4xl text-2xl" />
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="text-black-900 dark:text-white-100 mx-auto">
          <h1 className="sm:text-3xl lg:text-5xl md:font-4xl text-2xl font-black md:mb-0 md:text-start text-center mb-10">
            {suggestionProduct &&
              suggestionProduct?.data[currentProductIndex].name}
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
            {promotion && promotion?.data[currentProductIndex]?.price}$
          </p>
        </div>
        <div className="flex justify-center items-center md:w-[20rem] md:h-[20rem] h-[20rem]">
          <img
            src={`http://127.0.0.1:6060/${
              promotion && promotion?.data[currentProductIndex]?.fileUrl
            }`}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex justify-center items-center">
          <Link
            className="text-white-100 rounded-md py-3 px-20 md:px-14 bg-blue-600 md:mt-40 mt-10"
            to={`/products/${
              promotion && promotion?.data[currentProductIndex]?.name
            }`}
          >
            Show Now
          </Link>
        </div>
      </div>
      <button
        className={`absolute right-8 top-40 z-10 outline-none duration-500 dark:text-white-100 ${
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
