import React from "react";
import Spinner from "../../Spinner/Spinner";

export default function TotalColor({ total, paginationLoading }) {
  return (
    <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl text-center h-[12rem] 2xl:h-[15rem]">
      <span className="font-bold xl:text-3xl sm:text-xl text-2xl whitespace-nowrap dark:text-white-100">
        Total Color
      </span>
      {paginationLoading ? (
        <div className="relative">
          <Spinner />
        </div>
      ) : (
        <h1 className="2xl:text-7xl text-5xl text-blue-600 font-bold my-8">
          {total}
        </h1>
      )}
    </div>
  );
}
