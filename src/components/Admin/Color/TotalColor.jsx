import React from "react";

export default function TotalColor({ total }) {
  return (
    <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl text-center md:mx-0 mx-1 h-[9rem]">
      <span className="font-bold text-xl text-[11px] whitespace-nowrap dark:text-white-100">
        Total Color
      </span>
      <h1 className="text-5xl text-blue-600 font-bold my-8">{total}</h1>
    </div>
  );
}
