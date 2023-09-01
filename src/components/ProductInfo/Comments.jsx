import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CommentsTemplate from "./CommentsTemplate";
import AddComment from "./AddComment";
import userAxios from "../../services/Axios/userInterceptors";

export default function Comments() {
  const { productID } = useParams();
  const [getComments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const response = await userAxios.get(`/comment/product/${productID}`);

      if (response.status === 200) {
        setComments(response?.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="border p-4 mb-20 bg-white-300 dark:bg-black-900 rounded-xl">
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
        <div className="mt-20 md:px-12 px-6">
          <h3 className="text-lg font-bold mb-2">Add Comment and Rating</h3>
          <p className="md:text-sm text-xs text-gray-600 mb-4">
            Please read the rules and regulations before writing your opinion
            about this product.
          </p>

          <AddComment fetchComments={fetchComments} />
        </div>
      </>

      <ToastContainer />
    </div>
  );
}
