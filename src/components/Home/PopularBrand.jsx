import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import useBrands from "../../api/brand/user/useBrands";

export default function PopularBrand() {
  const { data: brands, isLoading } = useBrands();

  return (
    <section className="md:px-5 md:mt-40 mt-20 text-black-900 dark:text-white-100 ">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
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
            {brands?.map((brand) => (
              <SwiperSlide
                key={brand?.id}
                className="flex justify-center items-center mb-8"
              >
                <Link to={`/products?brandId=${brand?.id}`}>
                  <img
                    src={brand.fileUrl}
                    alt={brand.brand}
                    className="w-28 h-28 object-contain py-3"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </section>
  );
}
