import React, { useEffect, useState } from "react";
import adminAxios from "../../../services/Axios/adminInterceptors";

export default function CommentsInfos() {
  const [comments, setComments] = useState([]);

  const fetchDatas = async () => {
    try {
      const response = await adminAxios.get("/comment");
      setComments(response?.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchDatas();
  }, []);

  const acceptedComments = comments.filter(
    (comment) => comment.commentStatus === 1
  );
  const rejectedComments = comments.filter(
    (comment) => comment.commentStatus === 2
  );
  const pendingComments = comments.filter(
    (comment) => comment.commentStatus === 0
  );
  return (
    <>
      <div className="bg-white-100 dark:bg-black-200 2xl:py-6 py-4 rounded-xl lg:mt-6 text-center lg:mx-1">
        <span className="font-bold 2xl:text-lg lg:text-sm sm:text-xs text-[11px] whitespace-nowrap">
          Total comments
        </span>
        <h1 className="2xl:text-5xl text-4xl text-blue-600 font-bold my-6">
          {comments.length}
        </h1>
      </div>
      <div className="bg-white-100 dark:bg-black-200 2xl:py-6 py-4 rounded-xl lg:mt-6 text-center lg:mx-1">
        <span className="font-bold 2xl:text-lg lg:text-sm sm:text-xs text-[11px] whitespace-nowrap">
          Total Pending comments
        </span>
        <h1 className="2xl:text-5xl text-4xl text-orange-400 font-bold my-6">
          {pendingComments.length}
        </h1>
      </div>
      <div className="bg-white-100 dark:bg-black-200 2xl:py-6 py-4 rounded-xl lg:mt-6 text-center lg:mx-1">
        <span className="font-bold 2xl:text-lg lg:text-sm sm:text-xs text-[11px] whitespace-nowrap">
          Total Accept comments
        </span>
        <h1 className="text-4xl text-green-300 font-bold my-6">
          {acceptedComments.length}
        </h1>
        <div className="w-full"></div>
      </div>

      <div className="bg-white-100 dark:bg-black-200 2xl:py-6 py-4 rounded-xl lg:mt-6 text-center lg:mx-1">
        <span className="font-bold 2xl:text-lg lg:text-sm sm:text-xs text-[11px] whitespace-nowrap">
          Total reject comments
        </span>
        <h1 className="2xl:text-5xl text-4xl text-red-700 font-bold my-6">
          {rejectedComments.length}
        </h1>
      </div>
    </>
  );
}
