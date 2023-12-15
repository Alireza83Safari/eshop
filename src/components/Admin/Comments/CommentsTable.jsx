import React, { useMemo, useState } from "react";
import Pagination from "../../getPagination";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { useFetchPagination } from "../../../hooks/useFetchPagination";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import Spinner from "../../Spinner/Spinner";
import useAccess from "../../../hooks/useAccess";
import AccessError from "../../AccessError";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

export default function CommentsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  let url = "/comment";
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const limit = searchParams.get("limit");
  const pageSize = limit ? +limit : 11;

  const {
    isLoading: paginationLodaing,
    paginations,
    total,
    fetchData,
  } = useFetchPagination(url, adminAxios);
  const pagesCount = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  const { isLoading } = usePaginationURL(currentPage, pageSize);

  const { userHaveAccess } = useAccess("action_comment_admin_list");
  const { userHaveAccess: userHaveAccessStatus } = useAccess(
    "action_comment_change_status"
  );

  const commentStatusHandler = async (productId, statusCode) => {
    const statusInfo = {
      note: "test",
      status: Number(statusCode),
    };
    if (userHaveAccessStatus) {
      try {
        const response = await adminAxios.post(
          `/comment/changeStatus/${productId}`,
          statusInfo
        );
        if (response.status === 200) {
          fetchData();
          toast.success("Change Comment Status Is Success");
        }
      } catch (error) {}
    } else {
      toast.error("You Havent Access Change Status");
    }
  };

  return (
    <>
      {userHaveAccess ? (
        <>
          <table className="min-w-full overflow-x-auto">
            <thead>
              <tr className="sm:text-xs text-[12px] 2xl:text-lg border-y">
                <th className="py-2">User</th>
                <th className="py-2">Comment</th>
                <th className="py-2">Product</th>
                <th className="py-2">Date</th>
                <th className="py-2">rate</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            {paginationLodaing || isLoading ? (
              <Spinner />
            ) : paginations?.length >= 1 ? (
              <tbody>
                {paginations?.map((comment) => (
                  <tr
                    className="sm:text-xs text-[10px] 2xl:text-sm sm:px-4 text-center hover:bg-gray-50 dark:hover:bg-black-900"
                    key={comment.id}
                  >
                    <td className="truncate font-bold  py-3 px-2">
                      {comment.username.slice(0, 25)}
                    </td>

                    <td className="truncate  py-3 px-2">
                      {comment.text.slice(0, 25)}
                    </td>
                    <td className="truncate  py-3 px-2">
                      {comment.productName.slice(0, 25)}
                    </td>
                    <td className="truncate  py-3 px-2 ">
                      {comment.createdAt.slice(0, 10)}
                    </td>
                    <td className="truncate  py-3 px-2">{comment.rate}/5</td>
                    <td className="truncate  py-3 px-2 ">
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
            ) : paginations.length !== 0 ? (
              <div className="flex justify-center items-center mt-32">
                <div>
                  <img src="/images/not-found-product.svg" alt="" />
                  <p className="text-center mt-8 text-lg font-bold dark:text-white-100">
                    Comment Not Found
                  </p>
                </div>
              </div>
            ) : null}
          </table>
          <Pagination
            pagesCount={pagesCount}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      ) : (
        <AccessError error={"Comments List"} />
      )}
    </>
  );
}
