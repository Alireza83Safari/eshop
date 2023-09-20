import React from "react";

export default function TotalAppPict({ total }) {
  return (
    <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl text-center lg:h-[9rem] lg:my-0 sm:my-5 sm:col-span-1 col-span-3">
      <span className="font-bold text-xl text-[11px] whitespace-nowrap dark:text-white-100">
        Total AppPic
      </span>
      <h1 className="lg:text-5xl sm:text-8xl text-5xl text-blue-600 font-bold lg:mt-6 sm:mt-32 mt-7">
        {total}
      </h1>
    </div>
  );
}
