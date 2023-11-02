import React, { useState, useEffect } from "react";
import CommentsTemplate from "./CommentsTemplate";
import AddComment from "./AddComment";
import userAxios from "../../services/Axios/userInterceptors";
import { Toaster } from "react-hot-toast";

export default function Comments({ productId }) {
  const [getComments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await userAxios.get(`/comment/product/${productId}`);

      if (response.status === 200) {
        setComments(response?.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="border p-4 mb-20 rounded-xl">
      <>
        {getComments?.length > 0 ? (
          getComments?.map((comment, index) => (
            <CommentsTemplate index={index} comment={comment} />
          ))
        ) : (
          <div className="text-xl text-center w-full bg-gray-200 dark:bg-black-200 mt-10">
            Be the first to comment.
          </div>
        )}
        <div className="mt-20 md:px-12">
          <h3 className="lg:text-lg sm:text-base text-sm font-bold mb-2">
            Add Comment and Rating
          </h3>
          <p className="md:text-sm text-xs text-gray-600 mb-4">
            Please read the rules and regulations before writing your opinion
            about this product.
          </p>

          <AddComment fetchComments={fetchComments} productId={productId} />
        </div>
      </>

      <Toaster />
    </div>
  );
}
