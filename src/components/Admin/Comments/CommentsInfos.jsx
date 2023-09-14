import React from "react";

export default function CommentsInfos({ comments }) {
  const acceptedComments = comments.filter(
    (comment) => comment.commentStatus === 1
  );
  const rejectedComments = comments.filter(
    (comment) => comment.commentStatus === 2
  );
  const pendingComments = comments.filter(
    (comment) => comment.commentStatus === 0
  );
  console.log(comments);
  return (
    <>
      <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl md:mt-2 mt-6 text-center md:mx-0 mx-1">
        <span className="font-bold lg:text-sm sm:text-xs text-[11px] whitespace-nowrap">
          Total comments
        </span>
        <h1 className="text-4xl text-blue-600 font-bold my-6">
          {comments.length}
        </h1>
      </div>
      <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl mt-6 text-center md:mx-0 mx-1">
        <span className="font-bold lg:text-sm sm:text-xs text-[11px] whitespace-nowrap">
          Total Pending comments
        </span>
        <h1 className="text-4xl text-orange-400 font-bold my-6">
          {pendingComments.length}
        </h1>
      </div>
      <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl mt-6 text-center md:mx-0 mx-1">
        <span className="font-bold  lg:text-sm sm:text-xs text-[11px] whitespace-nowrap">
          Total Accept comments
        </span>
        <h1 className="text-4xl text-green-300 font-bold my-6">
          {acceptedComments.length}
        </h1>
        <div className="w-full"></div>
      </div>

      <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl mt-6 text-center md:mx-0 mx-1">
        <span className="font-bold lg:text-sm sm:text-xs text-[11px] whitespace-nowrap">
          Total reject comments
        </span>
        <h1 className="text-4xl text-red-700 font-bold my-6">
          {rejectedComments.length}
        </h1>
      </div>
    </>
  );
}
