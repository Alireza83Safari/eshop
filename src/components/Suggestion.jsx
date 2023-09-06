import {
  faAngleLeft,
  faAngleRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import userAxios from "../services/Axios/userInterceptors";
import useFetch from "../hooks/useFetch";

export default function Suggestion() {
  const [count, setCount] = useState(1);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const { datas: suggestions } = useFetch("/product/suggestions", userAxios);

  useEffect(() => {
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * suggestions?.data?.length);
      setCurrentProductIndex(randomIndex);
    }, 10000);

    return () => clearInterval(timer);
  }, [suggestions]);

  const handleAddToCart = async (product) => {
    let productData = {
      productItemId: product?.productItemId,
      quantity: 1,
    };

    try {
      const response = await userAxios.post("/orderItem", productData);
      if (response.status === 200) {
        toast.success(`${product?.name} added to cart!`, {
          position: "bottom-right",
        });
      }
    } catch (error) {}
  };

  const goToPreviousProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === 0 ? suggestions?.data?.length - 1 : prevIndex - 1
    );
  };

  const goToNextProduct = () => {
    if (currentProductIndex === suggestions?.data?.length) {
      setCurrentProductIndex(0);
    }
    setCurrentProductIndex((prevIndex) =>
      prevIndex === suggestions?.data?.length - 1 ? 0 : prevIndex + 1
    );
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
          className={`absolute left-2 top-80 z-10 outline-none duration-500 ${
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

        <div className="flex justify-end mr-10 md:my-5 text-black-900 dark:text-white-100"></div>

        <div className="md:w-full md:bg-gray-100 flex items-center justify-center lg:h-[32rem]">
          <img
            src={`http://127.0.0.1:6060/${
              suggestions?.data &&
              suggestions?.data[currentProductIndex]?.files[0]?.fileUrl
            }`}
            className="object-contain md:p-10 px-10 md:h-full h-[24rem]"
          />
        </div>
        <div className="ml-5">
          <p className="font-black text-black-900 dark:text-white-100">
            Choose Your Product
          </p>
          <div className="grid grid-cols-3 py-3">
            {suggestions?.data[currentProductIndex]?.files?.map((data) => (
              <>
                <img
                  src={`http://127.0.0.1:6060/${data?.fileUrl}`}
                  className="p-1 lg:h-[10rem] h-[8rem] object-contain"
                />
              </>
            ))}
          </div>
          <div>
            <p>
              {suggestions?.data &&
                suggestions?.data[currentProductIndex]?.name}
            </p>
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
                {suggestions?.data &&
                  suggestions?.data[currentProductIndex]?.colors.map(
                    (color) => (
                      <div
                        className={` lg:w-12 lg:h-12 md:w-8 md:h-8 w-7 h-7 lg:mr-4 mr-1 rounded-lg border `}
                        style={{ backgroundColor: `${color?.colorHex}` }}
                      ></div>
                    )
                  )}
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

            <div className="flex justify-between md:my-4 py-6 lg:text-base md:text-sm text-xs">
              <p>1.Better quality</p>
              <p>2.Variety Color</p>
              <p>3.Best Products</p>
            </div>

            <div className="md:block flex justify-center">
              <button
                className="lg:px-12 md:px-9 px-12 py-3 md:text-base text-sm bg-blue-600 text-white-100 rounded-md"
                onClick={() =>
                  handleAddToCart(suggestions?.data[currentProductIndex])
                }
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
        <button
          className={`absolute right-2 top-80 z-10 outline-none duration-500 ${
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
