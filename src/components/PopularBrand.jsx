import React from "react";
import useFetch from "../hooks/useFetch";

export default function PopularBrand() {
  const { datas: brand } = useFetch("/api/v1/user/brand");

  return (
    <>
      <section className="md:px-5 mt-40 text-black-900 dark:text-white-100">
        <p className="pb-3 text-xl font-bold text-center">
          Most Popular Brands
        </p>
        <div className="grid lg:grid-cols-8 grid-cols-4 gid-cols-3 lg:py-7 pb-7">
          {brand?.data?.map((brand, index) => (
            <div key={index} className="flex justify-center items-center">
              <img
                src={`http://127.0.0.1:6060/${brand.fileUrl}`}
                alt={brand.brand}
                className="sm:w-28 sm:h-28 w-20 h-20 object-contain py-3"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
