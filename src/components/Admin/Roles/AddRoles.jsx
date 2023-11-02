import React, { useState } from "react";
import ReactDOM from "react-dom";
import useFetch from "../../../hooks/useFetch";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import Input from "../Input";

export default function AddRoles({ setShowAddRoles }) {
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [errors, setErrors] = useState({});
  const [serverErrors, setServerErrors] = useState({});
  const [roleInfos, setRoleInfos] = useState({
    code: "",
    name: "",
  });

  const { fetchData } = useFetch("/role", adminAxios);
  const { datas: permissionsData } = useFetch("/role/permissions", adminAxios);

  const permissionsName =
    permissionsData?.map((permission) => permission?.name) || [];

  const handleSelectAll = () => {
    const allPermissions = permissionsData?.flatMap((permission) =>
      permission.children.map((child) => child?.code)
    );

    if (selectedPermissions?.length === allPermissions?.length) {
      setSelectedPermissions([]);
    } else {
      setSelectedPermissions(allPermissions);
    }
  };

  const editRolesHandler = (e) => {
    e.preventDefault();

    const newRole = {
      code: roleInfos?.code,
      isSystem: true,
      name: roleInfos?.name,
      permissions: selectedPermissions,
    };

    adminAxios
      .post("/role", newRole)
      .then((res) => {
        if (res.status === 200) {
          setShowAddRoles(false);
          toast.success("create role is successfully");
          fetchData();
        }
      })
      .catch((err) => setServerErrors(err?.response?.data?.errors));
  };

  const setRoleValue = (event) => {
    setRoleInfos({
      ...roleInfos,
      [event.target.name]: event.target.value,
    });
  };

  return ReactDOM.createPortal(
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400">
      <div className="bg-white-100 dark:bg-black-200 dark:text-white-100 w-11/12 overflow-auto max-h-[98%] rounded-xl relative p-4">
        <form onSubmit={editRolesHandler}>
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
              className="absolute top-2 right-2"
            >
              <FontAwesomeIcon icon={faX} className="text-red-700 text-xl" />
            </button>
          </div>
          <div className="grid grid-cols-2">
            <div className="py-1 m-1">
              <Input
                labelText="Role Name"
                placeholder="Permission name"
                name="name"
                value={roleInfos?.name}
                onChange={setRoleValue}
                Error={errors?.name || serverErrors?.name}
                callback={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />
            </div>
            <div className="py-1 m-1">
              <Input
                labelText=" Permission code"
                placeholder="Permission code"
                name="code"
                value={roleInfos?.code}
                onChange={setRoleValue}
                Error={errors?.code || serverErrors?.code}
                callback={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />
            </div>
          </div>

          <div className="mt-1 grid grid-cols-2">
            {permissionsName.map((category, index) => (
              <div key={index} className="border rounded-lg m-1">
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
