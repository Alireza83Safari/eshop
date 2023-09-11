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
    <section className="md:px-5 md:mt-40 mt-20 text-black-900 dark:text-white-100 ">
      <p className="pb-3 md:mb-8 md:text-2xl sm:text-xl font-bold text-center">
        Most Popular Brands
      </p>
      <Swiper
        breakpoints={{
          1: { slidesPerView: 4 },
          768: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: 8,
          },
        }}
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
              className="w-28 h-28 object-contain py-3"
              onClick={() => brandHandler(brand)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
