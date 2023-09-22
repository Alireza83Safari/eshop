import React from "react";

export default function TotalAppPict({ total }) {
  return (
    <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl text-center h-[9rem] 2xl:h-[14rem] lg:my-0 sm:my-5 mb-5">
      <span className="font-bold xl:text-3xl sm:text-xl text-[16px] whitespace-nowrap dark:text-white-100">
        Total AppPic
      </span>
      <h1 className="2xl:text-7xl lg:text-5xl text-6xl text-blue-600 font-bold mt-5 2xl:mt-9">
        {total}
      </h1>
    </div>
  );
}
