import React, { useState } from "react";
import Pagination from "../../getPagination";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { useFetchPagination } from "../../../hooks/useFetchPagination";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import Spinner from "../../Spinner/Spinner";

export default function CommentsTable() {
  const [currentPage, setCurrentPage] = useState(1);

  let url = "/comment";
  let pageSize = 10;
  const {
    isLoading: paginationLodaing,
    paginations,
    total,
    fetchData,
  } = useFetchPagination(url, adminAxios);
  const pagesCount = Math.ceil(total / pageSize);
  const { isLoading } = usePaginationURL(currentPage, pageSize, url);

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
        fetchData();
      }
    } catch (error) {}
  };

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
        {paginationLodaing || isLoading ? (
          <Spinner />
        ) : (
          <tbody>
            {paginations?.map((comment) => (
              <tr
                className="sm:text-xs text-[10px] 2xl:text-sm grid lg:grid-cols-6 sm:grid-cols-5 grid-cols-4 sm:px-4 sm:py- py-3"
                key={comment.id}
              >
                <td className="truncate">
                  <p className="font-bold">{comment.username}</p>
                </td>

                <td className="text-ellipsis overflow-hidden truncate">
                  {comment.text}
                </td>
                <td className="overflow-auto truncate">
                  {comment.productName}
                </td>
                <td className="lg:inline hidden">
                  {comment.createdAt.slice(0, 10)}
                </td>
                <td className="sm:inline hidden">{comment.rate}/5</td>
                <td>
                  {(() => {
                    switch (comment.commentStatus) {
                      case 0:
                        return (
                          <div>
                            <button
                              className="text-[10px] font-black p-1 rounded-l-lg bg-green-100 text-green-300"
                              onClick={() =>
                                commentStatusHandler(comment.id, 1)
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="text-[10px] font-black p-1 rounded-r-lg bg-red-300 text-red-100"
                              onClick={() =>
                                commentStatusHandler(comment.id, 2)
                              }
                            >
                              Reject
                            </button>
                          </div>
                        );
                      case 1:
                        return (
                          <button className="text-[10px] font-black p-1 rounded-lg bg-green-100 text-green-300">
                            Accepted
                          </button>
                        );
                      case 2:
                        return (
                          <button className="text-[10px] font-black p-1 rounded-lg bg-red-300 text-red-100">
                            Rejected
                          </button>
                        );
                      default:
                        return null;
                    }
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <Pagination
        pagesCount={pagesCount}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}
