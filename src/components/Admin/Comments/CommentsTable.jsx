import React, { useState, useEffect } from "react";
import Pagination from "../../Paganation";
import { useLocation, useNavigate } from "react-router-dom";
import adminAxios from "../../../services/Axios/adminInterceptors";

export default function CommentsTable({ comments, fetchDatas }) {
  const location = useLocation();
  const history = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [pageSize, setPageSize] = useState(11);
  const totalPage = Math.ceil(comments?.length / pageSize);
  const pageNumber = Array.from(Array(totalPage).keys());

  const commentStatusHandler = async (productId, statusCode) => {
    const statusInfo = {
      note: "test",
      status: Number(statusCode),
    };

    try {
      const response = await adminAxios.post(
        `/comment/changeStatus/${productId}`,
        statusInfo
      );
      if (response.status === 200) {
        fetchDatas();
      }
    } catch (error) {
      console.error("Error deleting the product:", error.message);
    }
  };

  const getPaginationComments = async () => {
    history(`?page=${currentPage}&limit=${pageSize}`);
    try {
      const response = await adminAxios.get(
        `/comment?page=${currentPage}&limit=${pageSize}`
      );
      setPaginatedProducts(response?.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getPaginationComments();
  }, [currentPage, location.search]);

  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr className="sm:text-xs text-[12px] 2xl:text-lg grid lg:grid-cols-6 sm:grid-cols-5 grid-cols-4 border-b sm:py-2 py-3">
            <th>User</th>
            <th>Comment</th>
            <th>Product</th>
            <th className="lg:inline hidden">Date</th>
            <th className="sm:inline hidden">rate</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts?.map((comment) => (
            <tr
              className="sm:text-xs text-[10px] 2xl:text-sm grid lg:grid-cols-6 sm:grid-cols-5 grid-cols-4 sm:px-4 sm:py- py-3"
              key={comment.id}
            >
              <td className="flex items-center truncate">
                <p className="font-bold">{comment.username}</p>
              </td>

              <td className=" whitespace-nowrap text-ellipsis overflow-hidden">
                {comment.text}
              </td>
              <td className=" whitespace-nowrap overflow-auto truncate">
                {comment.productName}
              </td>
              <td className="lg:inline hidden">
                {comment.createdAt.slice(0, 10)}
              </td>
              <td className="sm:inline hidden">{comment.rate}/5</td>
              <td>
                {comments?.commentStatus === 0 ? (
                  <div>
                    <button
                      className="text-[10px] font-black p-1 rounded-l-lg bg-green-100 text-green-300"
                      onClick={() => commentStatusHandler(comment.id, 1)}
                    >
                      Accept
                    </button>
                    <button
                      className="text-[10px] font-black p-1 rounded-r-lg  bg-red-300 text-red-100"
                      onClick={() => commentStatusHandler(comment.id, 2)}
                    >
                      Reject
                    </button>
                  </div>
                ) : comment.commentStatus === 1 ? (
                  <button className="text-[10px] font-black p-1 rounded-lg bg-green-100 text-green-300">
                    Accepted
                  </button>
                ) : (
                  <button className="text-[10px] font-black p-1 rounded-lg  bg-red-300 text-red-100">
                    Rejected
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageNumber={pageNumber}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}
