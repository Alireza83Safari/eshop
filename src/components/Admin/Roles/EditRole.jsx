import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import useFetch from "../../../hooks/useFetch";
import instance from "../../../api/axios-interceptors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function EditRole({
  showEditRoles,
  setShowEditRoles,
  editRoleId,
}) {
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  const { datas: editRoleData } = useFetch(`/api/v1/admin/role/${editRoleId}`);
  const { handleSubmit, control, register } = useForm();

  const { datas: permissionsData } = useFetch("/api/v1/admin/role/permissions");

  const permissionsName =
    permissionsData?.map((permission) => permission.name) || [];

  const handleSelectAll = () => {
    const allPermissions = permissionsData.flatMap((permission) =>
      permission.children.map((child) => child.code)
    );

    if (selectedPermissions.length === allPermissions.length) {
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions(allPermissions);
    }
  };
  const handleSubmitNewRole = (data) => {
    const newRole = {
      code: data.code,
      isSystem: true,
      name: data.name,
      permissions: selectedPermissions,
    };

    instance
      .post(`/api/v1/admin/role/edit/${editRoleId}`, newRole)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setShowEditRoles(false);
        } else {
          alert("GET ERROR");
        }
      })
      .catch((err) => console.log(err));
  };
  return ReactDOM.createPortal(
    <div
      className={` absolute bg-gray-100  z-10 w-full min-h-screen flex items-center justify-center transition duration-400 ${
        showEditRoles ? "visible" : "invisible"
      }`}
    >
      <div className="bg-white-100 w-11/12 overflow-auto p-3 h-[40rem] rounded-xl">
        <form onSubmit={handleSubmit(handleSubmitNewRole)}>
          <div className="flex justify-between mb-4">
            <div>
              <button
                type="button"
                className="px-2 py-1 text-sm text-white-100 text-white rounded-md bg-blue-600"
                onClick={handleSelectAll}
              >
                Select All
              </button>
            </div>
            <button onClick={() => setShowEditRoles(false)}>
              <FontAwesomeIcon icon={faX} className="text-red-700" />
            </button>
          </div>
          <div className="grid grid-cols-2">
            <div className="py-1">
              <label htmlFor="name" className="font-bold">
                Role Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Role Name"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                {...register("name", {
                  required: "This field is required",
                })}
                defaultValue={editRoleData?.name}
              />
            </div>

            <div className="py-1">
              <label htmlFor="code" className="font-bold">
                Role Code
              </label>

              <input
                type="text"
                id="code"
                name="code"
                placeholder="Role Code"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                {...register("code", {
                  required: "This field is required",
                })}
                defaultValue={editRoleData?.code}
              />
            </div>
          </div>

          <div className="mt-1 grid grid-cols-2">
            {permissionsName.map((permi, index) => (
              <div key={index} className="border">
                <p className="p-2">{permi}</p>
                <ul className="text-xs grid grid-cols-2 gap-2 p-4">
                  {permissionsData.map(
                    (permission) =>
                      permission.name === permi &&
                      permission.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <input
                            type="checkbox"
                            checked={selectedPermissions.includes(child.code)}
                            onChange={() => {
                              if (selectedPermissions.includes(child.code)) {
                                setSelectedPermissions(
                                  selectedPermissions.filter(
                                    (code) => code !== child.code
                                  )
                                );
                              } else {
                                setSelectedPermissions([
                                  ...selectedPermissions,
                                  child.code,
                                ]);
                              }
                            }}
                            className="mr-1 h-3 w-3 border-gray-300 rounded"
                          />

                          <label
                            htmlFor={`category_${child.code}`}
                            className="text-gray-700 text-xs"
                          >
                            {child.name}
                          </label>
                        </li>
                      ))
                  )}
                </ul>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white-100 m-2 px-6 py-1"
          >
            Submit
          </button>
        </form>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
