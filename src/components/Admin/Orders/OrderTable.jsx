import React, { useState } from "react";
import Pagination from "../../getPagination";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import { useFetchPagination } from "../../../hooks/useFetchPagination";
import Spinner from "../../Spinner/Spinner";

export default function OrderTable() {
  const [currentPage, setCurrentPage] = useState(1);
  let url = "/order";
  let pageSize = 7;
  const {paginations , total,isLoading: paginationLodaing} = useFetchPagination(url, adminAxios);
  const pagesCount = Math.ceil(total / pageSize);
  const { isLoading } = usePaginationURL(currentPage, pageSize);
  return (
    <div className="lg:col-span-8 col-span-12 md:mt-2 text-center md:mx-5 mx-2 mb-2">
      <p className="md:text-base text-sm font-bold border-b py-2 w-full bg-white-100 dark:text-white-100 dark:bg-black-200 rounded-t-xl 2xl:text-xl">
        Orders
      </p>
      <div className="sm:px-6 h-[26rem] overflow-y-auto bg-white-100 dark:text-white-100 dark:bg-black-200 rounded-b-xl relative">
        <table className="min-w-full">
          <thead>
            <tr className="md:text-sm sm:text-xs text-[10px] text-center border-b">
              <th className="py-3">NO</th>
              <th className="py-3">userName</th>
              <th className="py-3">price</th>
              <th className="py-3">createdAt</th>
              <th className="py-3">status</th>
            </tr>
          </thead>

          {isLoading || paginationLodaing ? (
            <Spinner />
          ) : (
            <tbody>
              {paginations?.map((order, index) => (
                <tr
                  className="md:text-sm sm:text-xs text-[10px] text-center"
                  key={index}
                >
                  <td className="py-3">{index + 1}</td>
                  <td className="py-3">{order?.username}</td>
                  <td className="py-3">{order?.price}</td>
                  <td className="py-3">{order?.createdAt.slice(0, 10)}</td>
                  <td className="py-3 md:space-x-2">
                    {order?.status === 1 ? (
                      <button className="text-green-300 bg-green-400 px-2 py-1 text-xs rounded-md">
                        Ok
                      </button>
                    ) : (
                      <button className="bg-orange-100 text-orange-400 px-2 py-1 text-xs rounded-md">
                        pending
                      </button>
                    )}
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
      </div>
    </div>
  );
}
