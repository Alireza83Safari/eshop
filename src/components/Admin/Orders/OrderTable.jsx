import React, { useMemo, useState } from "react";
import Pagination from "../../getPagination";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import Spinner from "../../Spinner/Spinner";
import useTableRow from "../../../hooks/useTableRow";
import { useSearch } from "../../../hooks/useSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import useAccess from "../../../hooks/useAccess";
import AccessError from "../../AccessError";
import { useLocation } from "react-router-dom";

export default function OrderTable({ paginations, paginationLodaing, total }) {
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const limit = searchParams.get("limit");
  const pageSize = limit ? +limit : 7;

  const pagesCount = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  const { isLoading } = usePaginationURL(currentPage, pageSize);
  const { rowNumber, limit: lomitRow } = useTableRow();
  const [searchQuery, setSearchQuery] = useState("");
  const { setSearchValue } = useSearch(searchQuery);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearchValue();
    }
  };
  const { userHaveAccess } = useAccess(
    "ction_user_admin_order_list" && "action_user_admin_orders_list"
  );

  return (
    <div className="lg:col-span-8 col-span-12 md:mt-2 text-center md:mx-5 mx-2 mb-2 bg-white-100 dark:bg-black-200 rounded-xl">
      <div className="grid grid-cols-2 my-2">
        <div className="flex rounded-md relative md:w-auto ml-4">
          <input
            type="text"
            id="searchInput"
            name="searchTerm"
            placeholder="search comment"
            className="py-1 sm:py-2 pl-7 w-32 outline-none rounded-lg dark:bg-black-200  text-xs sm:placeholder:text-[12px] placeholder:text-[10px] dark:text-white-100"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute text-sm left-2 sm:top-2 top-1 text-black-800 dark:text-white-100"
            onClick={setSearchValue}
          />
        </div>
      </div>
      <div className="sm:px-6 2xl:h-[32rem] h-[27.5rem] dark:text-white-100 rounded-b-xl relative overflow-x-auto">
        {userHaveAccess ? (
          <>
            <table className="min-w-full">
              <thead>
                <tr className="md:text-sm text-xs text-center border-b">
                  <th className="2xl:py-4 py-3 px-2">NO</th>
                  <th className="2xl:py-4 py-3 px-2">userName</th>
                  <th className="2xl:py-4 py-3 px-2">price</th>
                  <th className="2xl:py-4 py-3 px-2">createdAt</th>
                  <th className="2xl:py-4 py-3 px-2">status</th>
                </tr>
              </thead>

              {isLoading || paginationLodaing ? (
                <Spinner />
              ) : (
                <tbody>
                  {!!paginations?.length  ? (
                    paginations?.map((order, index) => (
                      <tr
                        className="2xl:text-base md:text-sm text-xs text-center hover:bg-gray-50 dark:hover:bg-black-900"
                        key={order.id}
                      >
                        <td className="2xl:py-4 py-3 px-2">
                          {rowNumber >= lomitRow
                            ? rowNumber + index + 1
                            : index + 1}
                        </td>
                        <td className="2xl:py-4 py-3 px-2 truncate">
                          {order?.username.slice(0, 25)}
                        </td>
                        <td className="2xl:py-4 py-3 px-2 truncate">
                          {order?.price}
                        </td>
                        <td className="2xl:py-4 py-3 px-2 truncate">
                          {order?.createdAt.slice(0, 10)}
                        </td>
                        <td className="2xl:py-4 py-3 px-2 md:space-x-2 truncate">
                          {order?.status === 1 ? (
                            <button className="text-green-300 bg-green-400 sm:px-2 px-1 py-1 text-xs rounded-md">
                              Ok
                            </button>
                          ) : (
                            <button className="bg-orange-100 text-orange-400 sm:px-2 px-1 py-1 text-xs rounded-md">
                              pending
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : !paginations.length  ? (
                    <div className="flex justify-center items-center mt-32">
                      <div>
                        <img src="/images/not-found-product.svg" alt="" />
                        <p className="text-center mt-8 text-lg font-bold dark:text-white-100">
                          Color Not Found
                        </p>
                      </div>
                    </div>
                  ) : null}
                </tbody>
              )}
            </table>
            <Pagination
              pagesCount={pagesCount}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </>
        ) : (
          <AccessError error={"Orders Table"} />
        )}
      </div>
    </div>
  );
}
