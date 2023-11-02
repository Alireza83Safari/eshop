import React, { useState, useContext } from "react";
import Pagination from "../../getPagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import adminAxios from "../../../services/Axios/adminInterceptors";
import Spinner from "../../Spinner/Spinner";
import useTableRow from "../../../hooks/useTableRow";
import userPanelContext from "../../../Context/userPanelContext";
import AccessError from "../../AccessError";
import useAccess from "../../../hooks/useAccess";
import toast from "react-hot-toast";

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
  const { userHaveAccess } = useAccess("action_user_admin_list");
  const { userHaveAccess: userHaveAccessDelete } = useAccess(
    "action_user_admin_delete"
  );

  const [isLoading, setLoading] = useState(false);

  const deleteUser = async (ID) => {
    if (userHaveAccessDelete) {
      setLoading(true);
      try {
        const response = await adminAxios.post(`/user/delete/${ID}`);
        setLoading(false);
        if (response.status === 200) {
          toast.success("Delete User Is Success");
          fetchData();
        }
      } catch (error) {}
    } else {
      toast.error("You Havent Access Delete User");
    }
  };

  const { rowNumber, limit } = useTableRow();

  return (
    <>
      {userHaveAccess ? (
        <table className="min-w-full">
          <thead>
            <tr className="md:text-sm text-xs text-center border-y">
              <th className="2xl:py-4 py-3">NO</th>
              <th className="2xl:py-4 py-3">userName</th>
              <th className="2xl:py-4 py-3">email</th>
              <th className="2xl:py-4 py-3">Join</th>
              <th className="2xl:py-4 py-3">Phone</th>
              <th className="2xl:py-4 py-3">actions</th>
            </tr>
          </thead>

          {isLoading || paginationLodaing || pageLoading ? (
            <Spinner />
          ) : (
            <tbody>
              {paginations?.length >= 1 ? (
                paginations.map((user, index) => (
                  <tr
                    className="2xl:text-base md:text-sm text-xs text-center overflow-x-auto hover:bg-gray-50 dark:hover:bg-black-900"
                    key={user.id}
                  >
                    <td className="2xl:py-4 py-3 px-1">
                      {rowNumber >= limit ? rowNumber + index + 1 : index + 1}
                    </td>
                    <td className="2xl:py-4 py-3 px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                      {user?.username?.slice(0, 25)}
                    </td>
                    <td className="2xl:py-4 py-3 px-1 whitespace-nowrap text-ellipsis overflow-hidden">
                      {user?.email?.slice(0, 25)}
                    </td>
                    <td className="2xl:py-4 py-3 px-1 whitespace-nowrap text-ellipsis">
                      {user?.createdAt.slice(0, 10)}
                    </td>
                    <td className="2xl:py-4 py-3 px-1">{user?.mobile}</td>
                    <td className="2xl:py-4 py-3 px-1 md:space-x-2">
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
                        className="px-1 py-1 rounded-md text-red-700 text-white"
                        onClick={() => {
                          deleteUser(user?.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : paginations.length !== 0 ? (
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
      ) : (
        <AccessError />
      )}
      <Pagination
        pagesCount={pagesCount}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}
