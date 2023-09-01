import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import userAxios from "../../services/Axios/userInterceptors"
import Pagination from "../Paganation";

export default function ProfileComments() {
  const [paginatedComments, setPaginatedComments] = useState([]);
  const { datas: comments } = useFetch("/comment",userAxios);
  const [currentPage, setCurrentPage] = useState(1);
  let pageSize = 6;
  let totalPage = 1;
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
    } catch (error) {
      console.log("Error fetching search results:", error);
    }
  };
  useEffect(() => {
    fetchSearchResults();
  }, [currentPage]);

  return (
    <section className="relative pb-16">
      {paginatedComments?.map((comment) => (
        <div className="border-b py-4">
          <div className="flex justify-between">
            <div className="flex items-center mb-5">
              <p className="mr-2 text-sm text-gray-800">Name:</p>
              <p>{comment?.productName}</p>
            </div>
            <div className="flex items-center mb-5">
              <p className="mr-2 text-sm text-gray-800">createdAt:</p>
              <p>{comment?.createdAt.slice(0, 10)}</p>
            </div>
            <div className="flex items-center mb-5">
              <p className="mr-2 text-sm text-gray-800">Rate:</p>
              <p
                className={
                  comment?.rate >= 4 ? "text-green-300" : "text-red-700"
                }
              >
                {comment?.rate}
              </p>
            </div>
          </div>
          <p className="mb-5 text-sm ml-4">{comment?.text}</p>
          <div className="grid grid-cols-2">
            <ul>
              <li>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mr-2 text-green-300"
                />
                {comment?.weakPonits}
              </li>
            </ul>
            <ul>
              <li>
                <FontAwesomeIcon icon={faMinus} className="mr-2 text-red-700" />
                {comment?.strengthPoints}
              </li>
            </ul>
          </div>
        </div>
      ))}
      <Pagination
        pageNumber={pageNumber}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </section>
  );
}
