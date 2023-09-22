import React from "react";

export default function TotalColor({ total }) {
  return (
    <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl text-center h-[10rem] 2xl:h-[15rem]">
      <span className="font-bold xl:text-3xl text-xl text-[11px] whitespace-nowrap dark:text-white-100">
        Total Color
      </span>
      <h1 className="2xl:text-7xl text-5xl text-blue-600 font-bold my-8">{total}</h1>
    </div>
  );
}
