import React from "react";
import userAxios from "../../../services/Axios/userInterceptors";
import useFetch from "../../../hooks/useFetch";

const TopDiscount = () => {
  const { datas: product } = useFetch("/product?order=discount", userAxios);
  var topDiscount = product?.data && product?.data[0];
  return (
    <div className="mr-7 mt-3">
      <div className="bg-white-100 dark:bg-black-200 dark:text-white-100 py-7 px-5 ml-3 rounded-xl">
        <span className="flex justify-center font-bold whitespace-nowrap dark:text-white-100 lg:text-base text-xs text-center">
          Most Discount Product Weekly
        </span>
        <div className="pt-4 h-56">
          <img
            src={`http://127.0.0.1:6060/${topDiscount?.fileUrl}`}
            className="w-full h-full object-contain"
            alt="Most Sale Product"
          />
        </div>
        <div className="flex justify-between md:px-1 px-10 xl:text-base md:text-xs text-sm mt-4">
          <p className="py-1 lg:py-0">price:{topDiscount?.price}$</p>
          <p className="py-1 lg:py-0">code: {topDiscount?.code}</p>
        </div>
        <div className="w-full">
          <button className="bg-blue-600 w-full rounded-lg text-white-300 lg:mt-7 mt-3 md:py-1 py-2 lg:text-base text-xs">
            Show Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopDiscount;
