import React, { useEffect, useState } from "react";
import adminAxios from "../../../services/Axios/adminInterceptors";
import Spinner from "../../Spinner/Spinner";

const CommentCategory = ({ label, count, color, isLoading }) => (
  <div className="bg-white-100 dark:bg-black-200 2xl:py-6 py-4 rounded-xl lg:mt-7 text-center lg:mx-1">
    {isLoading ? (
      <div className="relative h-28">
        <Spinner />
      </div>
    ) : (
      <>
        <span className="font-bold 2xl:text-lg lg:text-sm sm:text-xs text-[11px] whitespace-nowrap">
          {label}
        </span>
        <h1 className={`2xl:text-5xl text-4xl font-bold my-6 ${color}`}>
          {count}
        </h1>
      </>
    )}
  </div>
);

const CommentsInfos = () => {
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await adminAxios.get("/comment");
      if (response.status === 200 && response.data) {
        setComments(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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
      <CommentCategory
        label="Total comments"
        count={comments.length}
        color="text-blue-600"
        isLoading={isLoading}
      />
      <CommentCategory
        label="Total Pending comments"
        count={pendingComments.length}
        color="text-orange-400"
        isLoading={isLoading}
      />
      <CommentCategory
        label="Total Accept comments"
        count={acceptedComments.length}
        color="text-green-300"
        isLoading={isLoading}
      />
      <CommentCategory
        label="Total reject comments"
        count={rejectedComments.length}
        color="text-red-700"
        isLoading={isLoading}
      />
    </>
  );
};

export default CommentsInfos;
