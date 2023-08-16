import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import instance from "../../../api/axios-interceptors";
import EditRole from "./EditRole";
import AddRoles from "./AddRoles";

export default function RolesPanel() {
  const [showAddRoles, setShowAddRoles] = useState(false);
  const [showEditRoles, setShowEditRoles] = useState(false);
  const [editRoleId, setEditRoleId] = useState();
  const { datas: rolesData, fetchData } = useFetch("/api/v1/admin/role");

  const deleteRoleHandler = (roleId) => {
    instance.post(`/api/v1/admin/role/delete/${roleId}`).then((res) => {
      if (res.status === 200) {
        fetchData();
      }
    });
  };

  /*   const editRoleHandler = (roleId) => {
    instance.post(`/api/v1/admin/role/edit/${roleId}`).then((res) => {
      if (res.status === 200) {
        fetchData();
      }
    });
  }; */

  return (
    <section className="float-right md:mt-16 mt-12 pb-10 pt-4 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen px-10">
      <h2 className="text-lg font-semibold mb-4">Roles</h2>

      <div>
        <table className="min-w-full">
          <thead>
            <tr className="md:text-sm sm:text-xs text-[10px] text-center border-y">
              <th className="py-3">NO</th>
              <th className="py-3">Role Name</th>
              <th className="py-3">createdAt</th>
              <th className="py-3">Code</th>
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
                <td className="py-2">permission</td>
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
      <button
        className="bg-blue-600 text-white-100 py-1 px-3"
        onClick={() => setShowAddRoles(true)}
      >
        Add new Roles
      </button>
      <AddRoles showAddRoles={showAddRoles} setShowAddRoles={setShowAddRoles} />
      <EditRole
        showEditRoles={showEditRoles}
        setShowEditRoles={setShowEditRoles}
        editRoleId={editRoleId}
      />
    </section>
  );
}
