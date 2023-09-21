import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { toast } from "react-toastify";
import useFetch from "../../../hooks/useFetch";
import Spinner from "../../Spinner/Spinner";

export default function RoleTable({
  setPermissionInfo,
  setEditRoleId,
  setShowPermissionInfo,
  setShowEditRoles,
}) {
  const {
    datas: rolesData,
    fetchData,
    isLoading: roleLoading,
  } = useFetch("/role", adminAxios);

  const [isLoading, setLoading] = useState(false);

  const deleteRoleHandler = (roleId) => {
    setLoading(true);
    adminAxios
      .post(`/role/delete/${roleId}`)
      .then((res) => {
        setLoading(false);
        if (res.status === 200) {
          toast.success("delete role is successfully");
          fetchData();
        }
      })
      .catch(() => setLoading(false));
  };
  return (
    <div className="h-[37rem]">
      {isLoading && roleLoading ? (
        <Spinner />
      ) : (
        <table className="min-w-full">
          <thead>
            <tr className="md:text-sm sm:text-xs text-[10px] text-center border-b">
              <th className="py-3">NO</th>
              <th className="py-3">Role Name</th>
              <th className="py-3">createdAt</th>
              <th className="py-3">Code</th>
              <th className="py-3">Permissions</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rolesData?.data.map((role, index) => (
              <tr
                className="md:text-sm sm:text-xs text-[10px] text-center"
                key={index}
              >
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{role.name}</td>
                <td className="py-2">{role.createdAt.slice(0, 10)}</td>
                <td className="py-2">{role?.code}</td>
                <td className="py-2">
                  <button
                    className="border rounded-lg px-2 py-1 text-xs"
                    onClick={() => {
                      setShowPermissionInfo(true);
                      setPermissionInfo(role?.permissions);
                    }}
                  >
                    permission
                  </button>
                </td>
                <td className="py-2 md:space-x-2">
                  <button>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-orange-400"
                      onClick={() => {
                        setShowEditRoles(true);
                        setEditRoleId(role.id);
                      }}
                    />
                  </button>
                  <button
                    className="px-2 py-1 rounded-md text-red-700 text-white"
                    onClick={() => deleteRoleHandler(role.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
