import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import Timer from "./Timer";
import useFetch from "../hooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import userAxios from "../services/Axios/userInterceptors";
import useAddToCart from "../hooks/useAddCart";

export default function Offer() {
  const { datas: productsData } = useFetch(
    "/product?onlyDiscount=true",
    userAxios
  );

  const { addToCart, isLoading } = useAddToCart();
  const handleAddToCart = (product) => {
    addToCart(product.itemId, 1, product);
  };

  return (
    <>
      {productsData?.data.length < 1 ? null : (
        <section className="mt-52 mx-4 lg:mx-20">
          <div className="flex items-center md:px-5 xl:px-10 px-2">
            <Timer days={1} />
            <div className="w-full h-1 bg-blue-600"></div>
          </div>
          <div className="rounded-xl border mt-5">
            <p className="p-4 lg:text-xl text-center dark:text-white-100 font-bold border-b py-4 px-5">
              Top Discount Products
            </p>
            <div className="xl:px-10 p-2">
              <Swiper
                breakpoints={{
                  1: { slidesPerView: 2 },
                  768: {
                    slidesPerView: 3,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
                spaceBetween={7}
                pagination={{
                  clickable: true,
                }}
                className="mySwiper"
              >
                {productsData?.data.length > 1 &&
                  productsData?.data.map((product) => (
                    <SwiperSlide key={product.id}>
                      <div
                        className="dark:bg-black-200 relative duration-200 bg-white-100 mt-4 md:h-[20rem] h-[15rem] shadow-sm hover:shadow-xl"
                        key={product.id}
                      >
                        <div className=" flex justify-center h-5/6">
                          <div className="w-8 h-8 flex items-center justify-center lg:text-sm text-xs text-white-100 bg-red-700 rounded-full absolute top-0 right-5">
                            {product?.discountValue}%
                          </div>
                          <Link
                            to={`/product/${product.name}`}
                            style={{ display: "block" }}
                          >
                            <img
                              src={`http://127.0.0.1:6060/${product.fileUrl}`}
                              alt="Product"
                              className="relative object-contain lg:h-[260px] md:h-[220px] sm:h-[180px] h-[160px]"
                            />
                          </Link>
                          <button
                            className="flex items-center justify-center text-blue-600 hover:text-white-100 hover:bg-blue-300 duration-500 absolute md:w-10 md:h-10 w-7 h-7 rounded-full lg:bottom-24 bottom-16 right-6 z-10 border border-blue-600"
                            onClick={() => handleAddToCart(product)}
                            disabled={isLoading} 
                          >
                            <FontAwesomeIcon
                              icon={faPlus}
                              className="text-xl"
                            />
                          </button>
                        </div>

                        <div className="flex justify-center h-1/6">
                          <p className="font-semibold dark:text-white-100 lg:text-base text-sm whitespace-nowrap mr-6 line-through text-gray-200">
                            $ {product.price}
                          </p>
                          <p className="font-semibold dark:text-white-100 lg:text-base text-sm whitespace-nowrap">
                            {product?.price -
                              (product?.discountValue / 100) * product.price}
                            $
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                {}
              </Swiper>
            </div>
            <ToastContainer />
          </div>
        </section>
      )}
    </>
  );
}
