import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import userAxios from "../services/Axios/userInterceptors";

export default function ProductSlider() {
  const { datas: productsData } = useFetch("/product", userAxios);
  const handleAddToCart = (productID) => {
    let productData = {
      productItemId: productID.itemId,
      quantity: 1,
    };
    userAxios.post("/orderItem", productData).then((res) => {
      if (res.status === 200) {
        toast.success(`${productID.name} added to cart!`, {
          position: "bottom-right",
        });
      }
    });
  };

  return (
    <>
      {productsData?.data.length < 1 ? null : (
        <section className="mt-52 rounded-xl border lg:mx-20 ">
          <div className="flex justify-between dark:text-white-100 font-bold border-b py-4 px-5">
            <p className="lg:text-xl md:text-lg text-sm p-1">
              All eshop Products
            </p>
            <Link to="/products" className="p-1 md:text-sm text-xs">
              show all products >
            </Link>
          </div>
          <div className="xl:px-8 my-5">
            <Swiper
              slidesPerView={
                window.innerWidth >= 1024
                  ? 4
                  : window.innerWidth >= 640 && window.innerWidth <= 1024
                  ? 3
                  : 2
              }
              pagination={{
                clickable: true,
              }}
              spaceBetween={7}
              className="mySwiper "
            >
              {productsData?.data.length > 1 &&
                productsData?.data.slice(0, 9).map((product) => (
                  <SwiperSlide key={product.id}>
                    <div
                      className="dark:bg-black-200 relative duration-200 bg-white-100 mt-4 md:h-[20rem] h-[15rem] shadow-sm hover:shadow-xl "
                      key={product.id}
                    >
                      <div className="flex justify-center relative h-5/6">
                        <Link
                          to={`/product/${product.name}`}
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
                        >
                          <FontAwesomeIcon icon={faPlus} className="text-xl" />
                        </button>
                      </div>

                      <div className="flex justify-center h-1/6">
                        <p className="font-semibold dark:text-white-100 lg:text-base text-sm whitespace-nowrap">
                          $ {product.price}
                        </p>
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
