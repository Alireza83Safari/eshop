import React, { useEffect, useState } from "react";

export default function PopularBrand() {
  const [brand, setBrand] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/popular-brand")
      .then((res) => res.json())
      .then((brands) => setBrand(brands));
  }, []);

  console.log(brand);
  return (
    <div className="sm:px-16 mt-40 text-black-900 dark:text-white-100">
      <p className="pb-3 text-xl font-bold text-center">Most Popular Brands</p>
      <div className="grid lg:grid-cols-8 grid-cols-4 grid-cols-2== lg:py-7">
        {brand.map((brand, index) => (
          <div key={index} className="flex justify-center items-center">
            <img
              src={brand.url}
              alt={brand.brand}
              className="sm:w-28 sm:h-28 w-20 h-20 object-contain py-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
