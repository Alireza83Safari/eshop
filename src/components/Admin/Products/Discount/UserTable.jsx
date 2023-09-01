import React, {  useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import { useLocation } from "react-router-dom";
import Pagination from "../../../Paganation";
import Spinner from "../../../Spinner/Spinner";

export default function UserTable({ setUserId, setUsername }) {
  const { datas: users } = useFetch("/user", adminAxios);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [pageSize, setPageSize] = useState(8);
  const totalPage = Math.ceil(users?.data.length / pageSize);
  const pageNumber = totalPage > 0 ? Array.from(Array(totalPage).keys()) : [];
  const [isLoading, setIsLoading] = useState(false);
  const getPaginationComments = async () => {
    try {
      setIsLoading(true);
      const response = await adminAxios.get(
        `/user?page=${currentPage}&limit=${pageSize}`
      );
      setPaginatedProducts(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPaginationComments();
  }, [currentPage, location.search]);

  const setUserHandler = (user) => {
    setUserId(user?.id);
    setUsername(user?.username);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 visible">
      <div className="mb-8 bg-white-100 relative  rounded-xl w-3/12">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <h2 className="text-xl text-center font-bold py-4 border-b">
              Choose User
            </h2>
            <ul className="pb-12">
              {paginatedProducts?.map((user, index) => (
                <li
                  className="py-3 hover:bg-gray-100 duration-500 px-8"
                  onClick={() => setUserHandler(user)}
                >
                  {index + 1}:{user?.username}
                </li>
              ))}
            </ul>
            <Pagination
              pageNumber={pageNumber}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
