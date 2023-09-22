import React from "react";

export default function TotalCategory({ total }) {
  return (
    <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl text-center h-[12rem] mb-5 2xl:h-[15rem]">
      <span className="font-bold sm:text-xl text-[16px] text-sm whitespace-nowrap dark:text-white-100 2xl:text-3xl">
        Total Category
      </span>
      <h1 className="2xl:text-7xl text-5xl text-blue-600 font-bold my-8 2xl:my-10">
        {total}
      </h1>
    </div>
  );
}
