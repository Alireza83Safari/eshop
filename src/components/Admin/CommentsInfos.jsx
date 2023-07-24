import React from "react";

export default function CommentsInfp({
  totalComments,
  totalAccept,
  totalReject,
}) {
  return (
    <>
      <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl md:mt-2 mt-6 text-center md:mx-0 mx-1">
        <span className="font-bold sm:text-sm text-xs">Total comments</span>
        <h1 className="text-4xl text-blue-600 font-bold my-6">
          {totalComments.toLocaleString()}
        </h1>
      </div>

      <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl mt-6 text-center md:mx-0 mx-1">
        <span className="font-bold  sm:text-sm text-xs">Total Accept comments</span>
        <h1 className="text-4xl text-green-300 font-bold my-6">
          {totalAccept.toLocaleString()}
        </h1>
        <div className="w-full"></div>
      </div>

      <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl mt-6 text-center md:mx-0 mx-1">
        <span className="font-bold sm:text-sm text-xs">Total reject comments</span>
        <h1 className="text-4xl text-red-700 font-bold my-6">
          {totalReject.toLocaleString()}
        </h1>
      </div>
    </>
  );
}
