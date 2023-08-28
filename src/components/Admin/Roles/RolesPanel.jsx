import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import adminAxios from "../../../api/adminInterceptors";
import EditRole from "./EditRole";
import AddRoles from "./AddRoles";
import PermissionInfo from "./PermissionInfo";

export default function RolesPanel() {
  const [showAddRoles, setShowAddRoles] = useState(false);
  const [showEditRoles, setShowEditRoles] = useState(false);
  const [showPermissionInfo, setShowPermissionInfo] = useState(false);
  const [editRoleId, setEditRoleId] = useState(null);
  const [permissionInfo, setPermissionInfo] = useState();
  const { datas: rolesData, fetchData } = useFetch("/role", adminAxios);

  const deleteRoleHandler = (roleId) => {
    adminAxios.post(`/role/delete/${roleId}`).then((res) => {
      if (res.status === 200) {
        fetchData();
      }
    });
  };

  return (
    <section className="float-right mt-12 md:px-6 px-2 h-screen pb-8 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%]">
      <h2 className="text-lg font-semibold mb-4">Roles</h2>

      <div className="bg-white-100 dark:bg-black-600 p-3 rounded-xl text-black-900 dark:text-white-100">
        <button
          className="bg-blue-600 text-white-100 py-1 px-3 text-sm rounded-lg my-2"
          onClick={() => setShowAddRoles(true)}
        >
          Add new Roles <FontAwesomeIcon icon={faPlus} />
        </button>
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
      </div>

      <AddRoles showAddRoles={showAddRoles} setShowAddRoles={setShowAddRoles} />
      <EditRole
        showEditRoles={showEditRoles}
        setShowEditRoles={setShowEditRoles}
        editRoleId={editRoleId}
      />
      <PermissionInfo
        setShowPermissionInfo={setShowPermissionInfo}
        showPermissionInfo={showPermissionInfo}
        permissionInfo={permissionInfo}
      />
    </section>
  );
}
