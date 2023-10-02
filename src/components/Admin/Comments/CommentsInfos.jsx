import React, { useEffect, useState } from "react";
import adminAxios from "../../../services/Axios/adminInterceptors";
import Spinner from "../../Spinner/Spinner";

export default function CommentsInfos() {
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const fetchDatas = async () => {
    try {
      setLoading(true);
      const response = await adminAxios.get("/comment");
      if (response.status === 200) {
        setComments(response?.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
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
      <div className="bg-white-100 dark:bg-black-200 2xl:py-6 py-4 rounded-xl lg:mt-4 text-center lg:mx-1">
        {isLoading ? (
          <div className="relative h-24">
            <Spinner />
          </div>
        ) : (
          <>
            <span className="font-bold 2xl:text-lg lg:text-sm sm:text-xs text-[11px] whitespace-nowrap">
              Total comments
            </span>
            <h1 className="2xl:text-5xl text-4xl text-blue-600 font-bold my-6">
              {comments.length}
            </h1>
          </>
        )}
      </div>
      <div className="bg-white-100 dark:bg-black-200 2xl:py-6 py-4 rounded-xl lg:mt-6 text-center lg:mx-1">
        {isLoading ? (
          <div className="relative h-28">
            <Spinner />
          </div>
        ) : (
          <>
            <span className="font-bold 2xl:text-lg lg:text-sm sm:text-xs text-[11px] whitespace-nowrap">
              Total Pending comments
            </span>
            <h1 className="2xl:text-5xl text-4xl text-orange-400 font-bold my-6">
              {pendingComments.length}
            </h1>
          </>
        )}
      </div>
      <div className="bg-white-100 dark:bg-black-200 2xl:py-6 py-4 rounded-xl lg:mt-6 text-center lg:mx-1">
        {isLoading ? (
          <div className="relative h-28">
            <Spinner />
          </div>
        ) : (
          <>
            <span className="font-bold 2xl:text-lg lg:text-sm sm:text-xs text-[11px] whitespace-nowrap">
              Total Accept comments
            </span>
            <h1 className="text-4xl text-green-300 font-bold my-6">
              {acceptedComments.length}
            </h1>
          </>
        )}
      </div>

      <div className="bg-white-100 dark:bg-black-200 2xl:py-6 py-4 rounded-xl lg:mt-6 text-center lg:mx-1">
        {isLoading ? (
          <div className="relative h-28">
            <Spinner />
          </div>
        ) : (
          <>
            <span className="font-bold 2xl:text-lg lg:text-sm sm:text-xs text-[11px] whitespace-nowrap">
              Total reject comments
            </span>
            <h1 className="2xl:text-5xl text-4xl text-red-700 font-bold my-6">
              {rejectedComments.length}
            </h1>
          </>
        )}
      </div>
    </>
  );
}
