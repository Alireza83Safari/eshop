import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm, Controller } from "react-hook-form";
import useFetch from "../../../hooks/useFetch";
import adminAxios from "../../../api/adminInterceptors";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AddRoles({ showAddRoles, setShowAddRoles }) {
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
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

  const editRolesHandler = (data) => {
    const newRole = {
      code: data.code,
      isSystem: true,
      name: data.name,
      permissions: selectedPermissions,
    };

    adminAxios.post("/role", newRole).then((res) => {
      if (res.status === 200) {
        setShowAddRoles(false);
      } else {
        alert("GET ERROR");
      }
    });
  };
  return ReactDOM.createPortal(
    <div
      className={` absolute bg-gray-100  z-10 w-full min-h-screen flex items-center justify-center transition duration-400 ${
        showAddRoles ? "visible" : "invisible"
      }`}
    >
      <div className="bg-white-100 w-11/12 overflow-auto p-3 h-[40rem] rounded-xl relative">
        <form onSubmit={handleSubmit(editRolesHandler)}>
          <div className="flex justify-between">
            <h1 className="mb-8 font-black">Add New Role</h1>
            <div className="mr-5">
              <button
                type="button"
                className="px-2 py-1 text-sm text-white-100 text-white rounded-md bg-blue-600"
                onClick={handleSelectAll}
              >
                Select All
              </button>
            </div>
            <button
              onClick={() => setShowAddRoles(false)}
              className=" absolute top-2 right-2"
            >
              <FontAwesomeIcon icon={faX} className="text-red-700" />
            </button>
          </div>
          <div className="grid grid-cols-2">
            <div className="py-1">
              <label htmlFor="name" className="font-bold">
                Permission Name
              </label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="name"
                    className="w-full border placeholder:text-sm"
                    placeholder="Name"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-700 text-xs">{errors.name.message}</p>
              )}
            </div>
            <div className="py-1">
              <label htmlFor="code" className="font-bold">
                Permission Code
              </label>
              <Controller
                name="code"
                control={control}
                defaultValue=""
                rules={{ required: "Code is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="code"
                    className="w-full border placeholder:text-sm"
                    placeholder="Code"
                  />
                )}
              />
              {errors.code && (
                <p className="text-red-700 text-xs">{errors.code.message}</p>
              )}
            </div>
          </div>

          <div className="mt-1 grid grid-cols-2">
            {permissionsName.map((category, index) => (
              <div key={index} className="border">
                <p className="p-2">{category}</p>
                <ul className="text-xs grid grid-cols-2 gap-2 p-4">
                  {permissionsData.map(
                    (permission) =>
                      permission.name === category &&
                      permission.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <input
                            type="checkbox"
                            value={child.code}
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
