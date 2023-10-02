import React from "react";
import Spinner from "../../Spinner/Spinner";

export default function TotalAppPict({ total, appPicLoading }) {
  return (
    <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl text-center h-[9rem] 2xl:h-[14rem] lg:my-0 sm:my-5 mb-5">
      <span className="font-bold sm:text-xl text-[16px] text-sm whitespace-nowrap dark:text-white-100 2xl:text-3xl">
        Total AppPic
      </span>
      {appPicLoading ? (
        <div className="relative ">
          <Spinner />
        </div>
      ) : (
        <h1 className="2xl:text-7xl lg:text-5xl text-6xl text-blue-600 font-bold mt-5 2xl:mt-9">
          {total}
        </h1>
      )}
    </div>
  );
}
