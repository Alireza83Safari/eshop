import React, { useState, useEffect } from "react";
import Pagination from "../../Paganation";
import usePost from "../../../hooks/usePost";

export default function CommentsTable({ comments, fetchDatas }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const pageSize = 11;
  const totalPage = Math.ceil(comments.length / pageSize);
  const pageNumber = Array.from(Array(totalPage).keys());

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    setPaginatedProducts(
      comments !== null ? comments.slice(startIndex, endIndex) : []
    );
  }, [currentPage, comments]);

  const { doPost } = usePost();
  const commentStatusHandler = (productId, statusCode) => {
    const statusInfo = {
      note: "test",
      status: Number(statusCode),
    };
    console.log(statusInfo);

    doPost(`/api/v1/admin/comment/changeStatus/${productId}`, statusInfo);
    fetchDatas();
  };

  return (
    <>
      <table>
        <thead>
          <tr className="sm:text-xs text-[12px] 2xl:text-lg grid lg:grid-cols-6 sm:grid-cols-5 grid-cols-4 border-b sm:py-2 py-3">
            <th>User</th>
            <th>Comment</th>
            <th>Product</th>
            <th className="lg:block hidden">Date</th>
            <th className="sm:block hidden">rate</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((comment) => (
            <tr
              className="sm:text-xs text-[10px] 2xl:text-sm grid lg:grid-cols-6 sm:grid-cols-5 grid-cols-4 sm:px-4 sm:py- py-3"
              key={comment.id}
            >
              <td className=" flex items-center">
                <p className="font-bold">{comment.username}</p>
              </td>

              <td className=" whitespace-nowrap text-ellipsis overflow-hidden">
                {comment.text}
              </td>
              <td className=" whitespace-nowrap overflow-auto text-ellipsis">
                {comment.productName}
              </td>
              <td className="lg:block hidden">
                {comment.createdAt.slice(0, 10)}
              </td>
              <td className="sm:block hidden">{comment.rate}/5</td>
              <td>
                {comment.commentStatus === 0 ? (
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
