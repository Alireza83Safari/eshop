import React from "react";

export default function CommentsTemplate({ comment }) {
  return (
    <div
      className="md:w-[80%] w-[100%]  m-auto py-4 border-b"
      key={comment?.id}
    >
      <div className="sm:flex grid grid-cols-2 sm:justify-between">
        <div className="flex  md:text-base text-sm">
          <p className="md:mr-4 sm:flex hidden">Username:</p>
          <p>{comment.username}</p>
        </div>
        <div className="flex md:text-base text-sm">
          <p className="md:mr-5">{comment?.updatedAt?.slice(0, 10)}</p>
        </div>
        <div className="flex md:text-base text-sm sm:mt-0 mt-4">
          <p className="mr-2">rate:</p>
          <p className="text-green-300 font-black"> {comment.rate}</p>
        </div>
      </div>
      <div className="my-7 md:text-base text-sm">
        <p>{comment.text}</p>
      </div>
    </div>
  );
}
