import React, { useState, useEffect } from "react";
import Pagination from "../../Paganation";
import usePost from "../../../hooks/usePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditUser from "./EditUser";

export default function UsersTable({ users, fetchUsers }) {
  const [showEditUser, setShowEditUser] = useState(false);
  const [editUserID, setEditUserID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedUser, setPaginatedUser] = useState([]);

  const pageSize = 11;
  const totalPage = Math.ceil(users?.length / pageSize);
  const pageNumber = Array.from(Array(totalPage).keys());

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    setPaginatedUser(users !== null ? users.slice(startIndex, endIndex) : []);
  }, [currentPage, users]);

  const { doPost } = usePost();
  const deleteUser = (ID) => {
    doPost(`/api/v1/admin/user/delete/${ID}`);
    fetchUsers();
  };

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

        <tbody>
          {paginatedUser.map((user, index) => (
            <tr
              className="md:text-sm sm:text-xs text-[10px] text-center overflow-auto"
              key={index}
            >
              <td className="py-3 px-2">{index + 1}</td>
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
      </table>

      <Pagination
        pageNumber={pageNumber}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      <EditUser
        showEditUser={showEditUser}
        setShowEditUser={setShowEditUser}
        editUserID={editUserID}
      />
    </>
  );
}
