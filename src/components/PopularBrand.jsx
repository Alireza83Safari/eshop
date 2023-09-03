import React from "react";
import useFetch from "../hooks/useFetch";
import userAxios from "./../services/Axios/userInterceptors";
import { Swiper, SwiperSlide } from "swiper/react";

export default function PopularBrand() {
  const { datas: brand } = useFetch("/brand", userAxios);
  const brandHandler = (data) => {
    document.location.href = `/brand/${data?.name}`;
  };
  return (
    <section className="md:px-5 mt-40 text-black-900 dark:text-white-100">
      <p className="pb-3 md:mb-8 md:text-2xl sm:text-xl font-bold text-center">
        Most Popular Brands
      </p>
      <Swiper
        slidesPerView={
          window.innerWidth >= 1024
            ? 6
            : window.innerWidth >= 640 && window.innerWidth <= 1024
            ? 4
            : 4
        }
        spaceBetween={15}
      >
        {brand?.data?.map((brand, index) => (
          <SwiperSlide
            key={index}
            className="flex justify-center items-center mb-8"
          >
            <img
              src={`http://127.0.0.1:6060/${brand.fileUrl}`}
              alt={brand.brand}
              className="sm:w-32 sm:h-32 w-24 h-24 object-contain py-3"
              onClick={() => brandHandler(brand)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
