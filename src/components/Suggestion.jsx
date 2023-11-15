import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import userAxios from "../services/Axios/userInterceptors";
import useFetch from "../hooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import useAddToCart from "../hooks/useAddCart";

export default function Suggestion() {
  const [count, setCount] = useState(1);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const { datas: suggestions, isLoading: suggestionsLoading } = useFetch(
    "/product/suggestions",
    userAxios
  );
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * suggestions?.data?.length);
      setCurrentProductIndex(randomIndex);
    }, 100000);

    return () => clearInterval(timer);
  }, [suggestions]);

  const { addToCart } = useAddToCart();

  const handleAddToCart = (product) => {
    addToCart(product?.productItemId, count, product);
    setCount(1);
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

  useEffect(() => {
    if (suggestions?.data?.length && !suggestionsLoading) {
      setLoading(true);
      try {
        userAxios
          .get(
            `/productItem/${suggestions?.data[currentProductIndex]?.productItemId}`
          )
          .then((res) => {
            setProductInfo(res?.data);
            setLoading(false);
          });
      } catch (error) {
        setLoading(false);
      }
    }
  }, [currentProductIndex, suggestions?.data]);

  const decrementCount = () => {
    if (count - 1 === 0) {
      setCount(count);
    } else {
      setCount(count - 1);
    }
  };

  return (
    <section
      className="w-full xl:px-20 md:px-4 lg:mt-52 md:mt-40 mt-32 relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {productInfo ? (
        <div
          className={` grid md:grid-cols-2 relative ${
            isLoading && "opacity-30"
          }`}
        >
          <button
            className={`absolute left-2 top-80 z-10 outline-none duration-500 dark:text-white-100 ${
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
            {productInfo?.productDescription}
          </p>
          <h2 className="md:my-5 mt-3 text-2xl text-blue-600 font-black md:text-start text-center">
            {productInfo?.price}$
          </h2>

          <div className="flex justify-end mr-10 md:my-5 text-black-900 dark:text-white-100"></div>

          <div className="md:w-full flex items-center justify-center lg:h-[32rem]">
            <img
              src={
                suggestions?.data &&
                suggestions?.data[currentProductIndex]?.files[0]?.fileUrl
              }
              className="object-contain md:p-10 px-10 md:h-full h-[20rem]"
            />
          </div>
          <div className="ml-5">
            <p className="font-black text-black-900 dark:text-white-100">
              Choose Your Product
            </p>
            <div className="py-3">
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {suggestions?.data[currentProductIndex]?.files?.map(
                  (data, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={data?.fileUrl}
                        className="p-1 lg:h-[10rem] h-[8rem] object-contain"
                        alt={`Product Image ${index}`}
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>

            <div>
              <p className="dark:text-white-100">
                {suggestions?.data &&
                  suggestions?.data[currentProductIndex]?.name}
              </p>
            </div>
            <div className="text-black-900 dark:text-white-100">
              <p className="font-black lg:mt-10 md:mt-4 md:block hidden sm:text-base text-xs">
                Select Color
              </p>
              <div className="flex justify-between my-4">
                <div className="flex items-center">
                  <p className="font-black lg:mt-10 md:mt-4 text-sm flex md:hidden sm:mr-10 mr-2 py-5">
                    Select Color
                  </p>
                  {suggestions?.data &&
                    suggestions?.data[currentProductIndex]?.colors?.map(
                      (color, index) => (
                        <div
                          className={` lg:w-12 lg:h-12 md:w-8 md:h-8 w-7 h-7 lg:mr-4 mr-1 rounded-lg border `}
                          style={{ backgroundColor: `${color?.colorHex}` }}
                          key={index}
                        ></div>
                      )
                    )}
                </div>

                <div className="flex items-center md:mx-10 ml-5">
                  <button
                    onClick={decrementCount}
                    className="lg:px-4 lg:py-2 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
                  >
                    -
                  </button>
                  <span className="sm:px-5 px-2">{count}</span>
                  <button
                    onClick={() => setCount(count + 1)}
                    className="lg:px-4 lg:py-2 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="md:my-4 py-6 lg:text-base md:text-sm text-xs ">
                {productInfo?.productShortDescription}
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
            className={`absolute right-2 top-80 z-10 outline-none duration-500 dark:text-white-100 ${
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
      ) : (
        ""
      )}
    </section>
  );
}
