import React, { useState, useContext } from "react";
import Pagination from "../../getPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import adminAxios from "../../../services/Axios/adminInterceptors";
import Spinner from "../../Spinner/Spinner";
import useTableRow from "../../../hooks/useTableRow";
import userPanelContext from "../../../Context/userPanelContext";

export default function UsersTable() {
  const {
    paginations,
    fetchData,
    paginationLodaing,
    pageLoading,
    setShowEditUser,
    setEditUserID,
    pagesCount,
    setCurrentPage,
    currentPage,
  } = useContext(userPanelContext);
  const [isLoading, setLoading] = useState(false);

  const deleteUser = async (ID) => {
    setLoading(true);
    try {
      const response = await adminAxios.post(`/user/delete/${ID}`);
      setLoading(false);
      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {}
  };

  const { rowNumber, limit } = useTableRow();
  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr className="md:text-sm sm:text-xs text-[10px] text-center border-b">
            <th className="py-3">NO</th>
            <th className="py-3">userName</th>
            <th className="py-3">email</th>
            <th className="py-3">Join</th>
            <th className="py-3">Phone</th>
            <th className="py-3">actions</th>
          </tr>
        </thead>

        {isLoading || paginationLodaing || pageLoading ? (
          <Spinner />
        ) : (
          <tbody>
            {paginations.map((user, index) => (
              <tr
                className="md:text-sm sm:text-xs text-[10px] text-center overflow-auto"
                key={user.id}
              >
                <td className="py-3 px-2">
                  {" "}
                  {rowNumber >= limit ? rowNumber + index + 1 : index + 1}
                </td>
                <td className="py-3 px-2 whitespace-nowrap text-ellipsis overflow-hidden">
                  {user?.username}
                </td>
                <td className="py-3 px-2 whitespace-nowrap text-ellipsis overflow-hidden">
                  {user?.email}
                </td>
                <td className="py-3 px-2">{user?.createdAt.slice(0, 10)}</td>
                <td className="py-3 px-2">{user?.mobile}</td>
                <td className="py-3 px-2 md:space-x-2">
                  <button>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-orange-400"
                      onClick={() => {
                        setShowEditUser(true);
                        setEditUserID(user?.id);
                      }}
                    />
                  </button>
                  <button
                    className="px-2 py-1 rounded-md text-red-700 text-white"
                    onClick={() => {
                      deleteUser(user?.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
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
