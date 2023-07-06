import React from "react";

export default function MostSale() {
  return (
    <div className="col-span-3 pr-8 mt-7">
      <div className="bg-white-100 dark:bg-black-200 dark:text-white-100 py-7 px-6 rounded-xl">
        <span className="font-bold whitespace-nowrap">
          Most Sale Product Weekly
        </span>
        <div className="pt-4 h-56">
          <img
            src="https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-11-green-back.png?v=35"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex justify-between px-1 pr-2 text-sm mt-4">
          <p>price: 799 $</p>
          <p>Sales: 104</p>
        </div>
        <div className="w-full">
          <button className="bg-blue-600 w-full rounded-lg text-white-300 mt-7 py-1">
            Show Details
          </button>
        </div>
      </div>
    </div>
  );
}
