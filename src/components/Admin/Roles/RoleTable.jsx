import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import adminAxios from "../../../services/Axios/adminInterceptors";
import useFetch from "../../../hooks/useFetch";
import Spinner from "../../Spinner/Spinner";
import useAccess from "../../../hooks/useAccess";
import AccessError from "../../AccessError";
import toast from "react-hot-toast";

export default function RoleTable({
  setPermissionInfo,
  setShowPermissionInfo,
  setEditRoleId,
  setShowEditRoles,
}) {
  const {
    datas: rolesData,
    fetchData,
    isLoading: roleLoading,
  } = useFetch("/role", adminAxios);

  const [isLoading, setLoading] = useState(false);

  const { userHaveAccess: userHaveAccessList } = useAccess(
    "action_role_admin_list"
  );
  const { userHaveAccess: userHaveAccessDelete } = useAccess(
    "action_role_admin_delete"
  );
  const { userHaveAccess: userHaveAccessEdit } = useAccess(
    "action_role_admin_update"
  );
  const editRoleHandler = (ID) => {
    if (userHaveAccessEdit) {
      setEditRoleId(ID);
      setShowEditRoles(false);
    }else{
      toast.success("edit role is successfully");

    }
  };

  const deleteRoleHandler = (roleId) => {
    if (userHaveAccessDelete) {
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
    } else {
      toast.error("You Havent Access Delete Role");
    }
  };

  return (
    <div className="h-[30rem]">
      {isLoading && roleLoading ? (
        <Spinner />
      ) : userHaveAccessList ? (
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
                className="2xl:text-base md:text-sm sm:text-xs text-[10px] text-center hover:bg-gray-50 dark:hover:bg-black-900"
                key={role.id}
              >
                <td className="2xl:py-3 py-2">{index + 1}</td>
                <td className="2xl:py-3 py-2">{role.name}</td>
                <td className="2xl:py-3 py-2">{role.createdAt.slice(0, 10)}</td>
                <td className="2xl:py-3 py-2">{role?.code}</td>
                <td className="2xl:py-3 py-2">
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
                <td className="2xl:py-3 py-2 md:space-x-2">
                  <button>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-orange-400"
                      onClick={() => editRoleHandler(role.id)}
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
      ) : (
        <AccessError error={"Roles List"} />
      )}
    </div>
  );
}
