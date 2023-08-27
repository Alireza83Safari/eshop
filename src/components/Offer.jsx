import {
  faAngleLeft,
  faAngleRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import instance from "../api/userInterceptors";

export default function Offer() {
  const [count, setCount] = useState(1);
  const [getProducts, setProducts] = useState([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const [newProduct, setNewProduct] = useState({
    id: "ae0ed272-feb1-41af-bbc4-d14f03f58992",
    brandName: "Apple",
    price: 1299,
    fileUrl: "uploads/product/01bc03af-9404-4c88-95f5-5dfc6db79634.png",
  });

  const { datas: productsData } = useFetch("/product");
  useEffect(() => {
    if (productsData && productsData.data) {
      setProducts(productsData.data);
    }
  }, [productsData]);

  // Automatically switch to a new product every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * getProducts.length);
      setNewProduct(getProducts[randomIndex]);
    }, 10000);

    return () => clearInterval(timer); // Clear interval on unmount
  }, [getProducts]);

  // Add product to cart and show toast notification
  const handleAddToCart = (productID) => {
    let productData = {
      productItemId: productID.itemId,
      quantity: 1,
    };

    instance.post("/orderItem", productData).then((res) => {
      if (res.status === 200) {
        toast.success(`${productID.name} added to cart!`, {
          position: "bottom-right",
        });
      }
    });
  };

  // Function to navigate to previous product
  const goToPreviousProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === 0 ? getProducts.length - 1 : prevIndex - 1
    );
    setNewProduct(getProducts[currentProductIndex]);
  };

  // Function to navigate to next product
  const goToNextProduct = () => {
    if (currentProductIndex === getProducts.length) {
      setCurrentProductIndex(0);
    }
    setCurrentProductIndex((prevIndex) =>
      prevIndex === getProducts.length - 1 ? 0 : prevIndex + 1
    );
    setNewProduct(getProducts[currentProductIndex]);
  };
  const [hover, setHover] = useState(false);
  return (
    <section
      className="w-full xl:px-20 md:px-4 lg:mt-52 md:mt-36 mt-20 relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="grid md:grid-cols-2 relative">
        <button
          className={`absolute left-2 top-80 z-10 outline-none ${
            hover ? "opacity-100" : "opacity-0"
          }`}
          onClick={goToPreviousProduct}
        >
          <FontAwesomeIcon
            icon={faAngleLeft}
            className="lg:text-4xl text-2xl"
          />
        </button>

        <div className="text-black-900 dark:text-white-100 text-center md:text-start">
          <h1 className="font-black xl:text-5xl lg:text-4xl md:text-3xl text-2xl">
            we offer you the
          </h1>
          <h1 className="font-black xl:text-5xl lg:text-4xl md:text-3xl text-2xl my-3">
            best we have
          </h1>
        </div>
        <p className="px-4 text-black-900 dark:text-white-100 lg:text-base text-sm md:text-start text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, vitae
          placeat? officia, accusamus excepturi sequi nemo illum officiis facere
          vel.
        </p>
        <h2 className="md:my-5 mt-3 text-2xl text-blue-600 font-black md:text-start text-center">
          20.45$
        </h2>

        <div className="flex justify-end mr-10 md:my-5 text-black-900 dark:text-white-100">
          <FontAwesomeIcon icon={faArrowUp} />
        </div>

        <div className="md:w-full md:bg-gray-100 flex items-center justify-center lg:h-[32rem]">
          <img
            src={`http://127.0.0.1:6060/${newProduct?.fileUrl}`}
            className="object-contain md:p-10 px-10 md:h-full h-[24rem]"
          />
        </div>
        <div className="ml-5">
          <p className="font-black text-black-900 dark:text-white-100">
            Choose Your Product
          </p>
          <div className="grid grid-cols-3 py-3">
            <img
              src={`http://127.0.0.1:6060/${newProduct?.fileUrl}`}
              className="p-1 lg:h-[10rem] h-[8rem] object-contain"
            />
            <img
              src={`http://127.0.0.1:6060/${newProduct?.fileUrl}`}
              className="p-1 lg:h-[10rem] h-[8rem] object-contain"
            />
            <img
              src={`http://127.0.0.1:6060/${newProduct?.fileUrl}`}
              className="p-1 lg:h-[10rem] h-[8rem] object-contain"
            />
          </div>

          <div className="text-black-900 dark:text-white-100">
            <p className="font-black lg:mt-10 md:mt-4 md:block hidden">
              Select Best Color
            </p>
            <div className="flex justify-between my-4">
              <div className="flex items-center">
                <p className="font-black lg:mt-10 md:mt-4 text-sm flex md:hidden mr-10 py-5">
                  Select Best Color
                </p>
                <div className="lg:w-12 lg:h-12 md:w-8 md:h-8 w-7 h-7 bg-red-700 lg:mr-4 mr-1 rounded-lg"></div>
                <div className="lg:w-12 lg:h-12 md:w-8 md:h-8 w-7 h-7 bg-blue-600 lg:mr-4 mr-1 rounded-lg"></div>
                <div className="lg:w-12 lg:h-12 md:w-8 md:h-8 w-7 h-7 bg-gray-800 lg:mr-4 mr-1 rounded-lg"></div>
                <div className="lg:w-12 lg:h-12 md:w-8 md:h-8 w-7 h-7 bg-orange-400 lg:mr-4 mr-1 rounded-lg"></div>
              </div>

              <div className="flex items-center md:mx-10 ml-5">
                <button
                  onClick={() => setCount(count - 1)}
                  className="lg:px-4 lg:py-2 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
                >
                  -
                </button>
                <span className="px-5">{count}</span>
                <button
                  onClick={() => setCount(count + 1)}
                  className="lg:px-4 lg:py-2 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
                >
                  +
                </button>
              </div>
            </div>

            <p className="font-black lg:mt-10 md:mt-4">spaciousness</p>
            <div className="flex justify-between md:my-4 py-6 lg:text-base md:text-sm text-xs">
              <p>1.Better quality</p>
              <p>2.Variety Color</p>
              <p>3.Best Products</p>
            </div>

            <div className="md:block flex justify-center">
              <button
                className="lg:px-12 md:px-9 px-12 py-3 md:text-base text-sm bg-blue-600 text-white-100 rounded-md"
                onClick={() => handleAddToCart(newProduct)}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        <button
          className={`absolute right-2 top-80 z-10 outline-none ${
            hover ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => goToNextProduct()}
        >
          <FontAwesomeIcon
            icon={faAngleRight}
            className="lg:text-4xl text-2xl"
          />
        </button>
      </div>
      <ToastContainer />
    </section>
  );
}
