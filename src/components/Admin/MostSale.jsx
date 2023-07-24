import React from "react";

const MostSale = () => {
  return (
    <div className="md:col-span-3 col-span-10 md:ml-0 ml-6 mr-8 mt-7">
      <div className="bg-white-100 dark:bg-black-200 dark:text-white-100 py-7 px-6 rounded-xl">
        <span className="flex justify-center font-bold whitespace-nowrap dark:text-white-100 lg:text-base text-xs text-center">
          Most Sale Product Weekly
        </span>
        <div className="pt-4 h-56">
          <img
            src="https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-11-green-back.png?v=35"
            className="w-full h-full object-contain"
            alt="Most Sale Product"
          />
        </div>
        <div className="flex justify-between md:px-1 px-10 xl:text-base md:text-xs text-sm mt-4">
          <p className="py-1 lg:py-0">price: $339.9</p>
          <p className="py-1 lg:py-0">View: 42,654</p>
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

export default MostSale;
