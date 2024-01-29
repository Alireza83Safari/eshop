import React from "react";
import useFetch from "../hooks/useFetch";
import userAxios from "./../services/Axios/userInterceptors";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function PopularBrand() {
  const { datas: brand } = useFetch("/brand", userAxios);

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
        {brand?.data?.map((brand) => (
          <SwiperSlide
            key={brand?.id}
            className="flex justify-center items-center mb-8"
          >
            <Link to={`/products?barndId=${brand?.id}`}>
              <img
                src={brand.fileUrl}
                alt={brand.brand}
                className="w-28 h-28 object-contain py-3"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
