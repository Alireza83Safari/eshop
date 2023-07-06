import React from "react";

export default function CommentsItem({
  totalComments,
  totalAccept,
  totalReject,
}) {
  return (
    <div>
      <div className="bg-white-100 dark:bg-black-200 py-3 rounded-xl mt-2 text-center">
        <span className="font-bold text-sm">Total comments</span>
        <h1 className="text-4xl text-blue-600 font-bold my-6">
          {totalComments.toLocaleString()}
        </h1>
      </div>

      <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl mt-6 text-center">
        <span className="font-bold text-sm">Total Accept comments</span>
        <h1 className="text-4xl text-blue-600 font-bold my-6">
          {totalAccept.toLocaleString()}
        </h1>
        <div className="w-full"></div>
      </div>

      <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl mt-6 text-center">
        <span className="font-bold text-sm">Total reject comments</span>
        <h1 className="text-4xl text-red font-bold my-6">
          {totalReject.toLocaleString()}
        </h1>
      </div>
    </div>
  );
}
