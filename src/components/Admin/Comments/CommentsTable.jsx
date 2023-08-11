import React, { useState, useEffect, useContext } from "react";
import Pagination from "../../Paganation";
import productsContext from "../../../Context/productsContext";
import usePost from "../../../hooks/usePost";

export default function CommentsTable({ comments, fetchDatas }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const { token } = useContext(productsContext);
  const pageSize = 8;
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

    doPost(`/api/v1/admin/comment/changeStatus/${productId}`, statusInfo, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    fetchDatas();
  };

  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr className="sm:text-xs text-[12px] 2xl:text-lg grid lg:grid-cols-6 grid-cols-4 border-b">
            <th className="col-span-1 sm:py-2 py-3">User</th>
            <th className="col-span-1 sm:py-2 py-3">Comment</th>
            <th className="col-span-1 sm:py-2 py-3 lg:flex hidden">Product</th>
            <th className="col-span-1 sm:py-2 py-3">Date</th>
            <th className="col-span-1 sm:py-2 py-3">rate</th>
            <th className="col-span-1 sm:py-2 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.map((comment) => (
            <tr
              className="sm:text-xs text-[10px] 2xl:text-sm grid lg:grid-cols-6 grid-cols-4 px-4 py-1"
              key={comment.id}
            >
              <td className="col-span-1 sm:py-2 py-3 flex items-center">
                <p className="font-bold">{comment.username}</p>
              </td>

              <td className="col-span-1 sm:py-2 py-3 whitespace-nowrap text-ellipsis overflow-hidden pr-4">
                {comment.text}
              </td>
              <td className="col-span-1 sm:py-2 py-3 whitespace-nowrap overflow-auto text-ellipsis lg:flex hidden">
                {comment.productName}
              </td>
              <td className="col-span-1 sm:py-2 py-3">
                {comment.createdAt.slice(0, 10)}
              </td>
              <td className="col-span-1 sm:py-2 py-3">{comment.rate}/5</td>
              <td className="col-span-1 sm:py-2 py-3">
                {comment.commentStatus === 0 ? (
                  <div className="">
                    <button
                      className="text-[10px] font-black px-2 py-1 rounded-lg bg-green-100 text-green-300 mr-1"
                      onClick={() => commentStatusHandler(comment.id, 1)}
                    >
                      Accept
                    </button>
                    <button
                      className="text-[10px] font-black px-2 py-1 rounded-lg  bg-red-300 text-red-100 ml-1"
                      onClick={() => commentStatusHandler(comment.id, 2)}
                    >
                      Reject
                    </button>
                  </div>
                ) : comment.commentStatus === 1 ? (
                  <button className="text-[10px] font-black px-2 py-1 rounded-lg bg-green-100 text-green-300 mr-1">
                    Accepted
                  </button>
                ) : (
                  <button className="text-[10px] font-black px-2 py-1 rounded-lg  bg-red-300 text-red-100 ml-1">
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
