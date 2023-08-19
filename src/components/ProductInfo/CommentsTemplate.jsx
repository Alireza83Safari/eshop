import React from "react";

export default function CommentsTemplate({ index, comment }) {
  return (
    <div className="md:w-[80%] w-[100%]  m-auto py-4 border-b" key={index}>
      <div className="flex justify-between md:text-base text-sm">
        <div className="flex">
          <p className="mr-4 sm:flex hidden">Username:</p>
          <p>{comment.username}</p>
        </div>
        <div className="flex">
          <p className="mr-5">{comment.updatedAt.slice(0, 10)}</p>
          <div className="flex">
            <p className="mr-2">rate:</p>
            <p className="text-green-300 font-black"> {comment.rate}</p>
          </div>
        </div>
      </div>
      <div className="my-7 md:text-sm text-xs">
        <p>{comment.text}</p>
      </div>
    </div>
  );
}
