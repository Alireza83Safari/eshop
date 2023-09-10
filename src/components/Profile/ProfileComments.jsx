import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import userAxios from "../../services/Axios/userInterceptors";
import Pagination from "../Paganation";

export default function ProfileComments() {
  const [paginatedComments, setPaginatedComments] = useState([]);
  const { datas: comments } = useFetch("/comment", userAxios);
  const [currentPage, setCurrentPage] = useState(1);
  let pageSize = 4;
  let totalPage;
  if (comments?.data && comments.data.length > 0) {
    totalPage = Math.ceil(comments.data.length / pageSize);
  }
  let pageNumber = Array.from(Array(totalPage).keys());

  const fetchSearchResults = async () => {
    try {
      const response = await userAxios.get(
        `/comment?page=${currentPage}&limit=${pageSize}`
      );
      setPaginatedComments(response?.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchSearchResults();
  }, [currentPage]);

  return (
    <section className="relative pb-16">
      {paginatedComments.length < 1 ? (
        <div className="w-full text-center py-24">
          <img src="/images/order-empty.svg" alt="" className="m-auto " />
          <p className="text-lg font-semibold">You havent comments</p>
        </div>
      ) : (
        paginatedComments?.map((comment) => (
          <div className="border-b py-10 px-8 dark:text-white-100">
            <div className="lg::flex grid grid-cols-2 justify-between">
              <div className="flex items-center mb-5 md:text-sm text-xs">
                <p className="mr-2 text-gray-800">product:</p>
                <p className="">{comment?.productName}</p>
              </div>
              <div className="flex items-center mb-5 md:text-sm text-xs">
                <p className="mr-2 text-gray-800 md:text-sm text-xs">
                  createdAt:
                </p>
                <p>{comment?.createdAt.slice(0, 10)}</p>
              </div>
              <div className="flex items-center mb-5 md:text-sm text-xs">
                <p className="mr-2 text-gray-800">rate:</p>
                <p
                  className={
                    comment?.rate >= 4 ? "text-green-300" : "text-red-700"
                  }
                >
                  {comment?.rate}
                </p>
              </div>
              <div className="md:text-sm text-xs">
                <button
                  className={` p-1 rounded-md mb-4 ${
                    comment?.commentStatus === 2
                      ? "bg-red-700 text-white-100"
                      : comment?.commentStatus === 1
                      ? "bg-green-300 text-white-100"
                      : "bg-orange-400 text-white-100"
                  }`}
                >
                  {comment?.commentStatus === 2
                    ? "reject"
                    : comment?.commentStatus === 1
                    ? "accept"
                    : "pending"}
                </button>
              </div>
            </div>

            <p className="mb-5 text-sm ml-1 border-t border-gray-50 py-6">
              {comment?.text}
            </p>
            <div className="grid grid-cols-2">
              <ul>
                <li className="md:text-sm text-xs">
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="mr-2 text-green-300"
                  />
                  {comment?.weakPonits}
                </li>
              </ul>
              <ul>
                <li className="md:text-sm text-xs">
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="mr-2 text-red-700"
                  />
                  {comment?.strengthPoints}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
      <div className={` ${totalPage > 1 ? "visible" : "hidden"}`}>
        <Pagination
          pageNumber={pageNumber}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </section>
  );
}
