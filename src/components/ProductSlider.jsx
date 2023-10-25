import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import useFetch from "../hooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import userAxios from "../services/Axios/userInterceptors";
import useAddToCart from "../hooks/useAddCart";

export default function ProductSlider() {
  const { datas: productsData } = useFetch("/product", userAxios);
  const { addToCart, isLoading } = useAddToCart();

  const handleAddToCart = (product) => {
    addToCart(product.itemId, 1, product);
  };

  return (
    <>
      {productsData?.data.length < 1 ? null : (
        <section className="mt-52 rounded-xl border lg:mx-20 ">
          <div className="flex justify-between dark:text-white-100 font-bold border-b py-4 px-5">
            <p className="lg:text-xl md:text-lg text-sm p-1">
              All eshop Products
            </p>
            <Link to="/product" className="p-1 md:text-sm text-xs">
              show all products >
            </Link>
          </div>
          <div className="xl:px-8">
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
              pagination={{
                clickable: true,
              }}
              spaceBetween={7}
              className="mySwiper"
            >
              {productsData?.data.length > 1 &&
                productsData?.data.slice(0, 9).map((product) => (
                  <SwiperSlide key={product.id}>
                    <div
                      className="dark:bg-black-200 relative duration-200 bg-white-100 mt-4 md:h-[22rem] h-[15rem] shadow-sm hover:shadow-xl "
                      key={product.id}
                    >
                      <div className="flex justify-center relative h-4/6">
                        <Link
                          to={`/product/${product?.name?.replace(/ /g, "_")}`}
                          style={{ display: "block" }}
                        >
                          <img
                            src={`http://127.0.0.1:6060/${product.fileUrl}`}
                            alt="Product"
                            className="object-contain h-full w-full"
                          />
                        </Link>
                        <button
                          className="flex items-center justify-center text-blue-600 hover:text-white-100 hover:bg-blue-300 duration-500 absolute md:w-10 md:h-10 w-7 h-7 rounded-full lg:bottom-6 bottom-16 right-6 z-10 border border-blue-600"
                          onClick={() => handleAddToCart(product)}
                          disabled={isLoading}
                        >
                          <FontAwesomeIcon icon={faPlus} className="text-xl" />
                        </button>
                      </div>
                      <div className="p-2 h-2/6">
                        <Link
                          to={`/product/${product.name?.replace(/ /g, "_")}`}
                        >
                          <h2 className="font-bold mb-2 text-xs whitespace-pre-line dark:text-white-100 text-center py-2">
                            {product.name}
                          </h2>
                          <p className="text-gray-900 font-bold dark:text-white-100 md:texs-base text-sm text-center py-2">
                            $ {product.price.toLocaleString()}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>

          <ToastContainer />
        </section>
      )}
    </>
  );
}
