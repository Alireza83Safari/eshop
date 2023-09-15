import React, { useState } from "react";
import ReactDOM from "react-dom";
import useFetch from "../../../hooks/useFetch";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { roleVlidation } from "../../../validators/roleValidation";

export default function AddRoles({ setShowAddRoles, fetchData }) {
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [errors, setErrors] = useState(null);
  const [serverErrors, setServerErrors] = useState(null);
  const [roleInfos, setRoleInfos] = useState({
    code: "",
    name: "",
  });

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

  const editRolesHandler = () => {
    roleVlidation(roleInfos, errors, setErrors);

    const newRole = {
      code: roleInfos?.code,
      isSystem: true,
      name: roleInfos?.name,
      permissions: selectedPermissions,
    };
    console.log(newRole);
    adminAxios
      .post("/role", newRole)
      .then((res) => {
        if (res.status === 200) {
          setShowAddRoles(false);
          fetchData();
        } else {
          alert("GET ERROR");
        }
      })
      .catch((err) => console.log(err));
  };

  const setRoleValue = (event) => {
    setRoleInfos({
      ...roleInfos,
      [event.target.name]: event.target.value,
    });
  };

  return ReactDOM.createPortal(
    <div className="absolute bg-gray-100 z-10 w-full min-h-screen flex items-center justify-center transition duration-400 overflow-auto">
      <div className="bg-white-100 w-11/12 overflow-auto h-[40rem] rounded-xl relative p-4">
        <form onSubmit={(e) => e.preventDefault()}>
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
              <input
                name="name"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                value={roleInfos?.name}
                placeholder="Permission Name"
                onChange={setRoleValue}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />

              <p className="text-red-700 text-xs">{errors?.name}</p>
            </div>
            <div className="py-1">
              <label htmlFor="code" className="font-bold">
                Permission Code
              </label>
              <input
                name="code"
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600"
                value={roleInfos?.code}
                placeholder="Permission Code"
                onChange={setRoleValue}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />

              <p className="text-red-700 text-xs">{errors?.code}</p>
            </div>
          </div>

          <div className="mt-1 grid grid-cols-2">
            {permissionsName.map((category, index) => (
              <div key={index} className="border rounded-lg">
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
            onClick={editRolesHandler}
          >
            Submit
          </button>
        </form>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
