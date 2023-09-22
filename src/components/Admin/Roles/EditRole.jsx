import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useFetch from "../../../hooks/useFetch";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function EditRole({ setShowEditRoles, editRoleId }) {
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [editRoleData, setEditRoleData] = useState(null);
  const [serverErrors, setServerErrors] = useState({});
  const [initiallySelectedPermissions, setInitiallySelectedPermissions] =
    useState([]);
  const { datas: permissionsData } = useFetch("/role/permissions", adminAxios);

  const getEditRoleData = async () => {
    try {
      const response = await adminAxios.get(`/role/${editRoleId}`);
      setEditRoleData(response?.data);
      if (response.status === 200) {
        setInitiallySelectedPermissions(response?.data?.permissions || []);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getEditRoleData();
  }, [editRoleId]);

  useEffect(() => {
    setSelectedPermissions(initiallySelectedPermissions);
  }, [initiallySelectedPermissions]);

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

  const handleSubmitNewRole = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const newRole = {
      code: data.code,
      isSystem: true,
      name: data.name,
      permissions: selectedPermissions,
    };

    adminAxios
      .post(`/role/edit/${editRoleId}`, newRole)
      .then((res) => {
        if (res.status === 200) {
          setShowEditRoles(false);
          toast.success("edit role is successfully");
        }
      })
      .catch((err) => setServerErrors(err?.response?.data?.errors));
  };

  return ReactDOM.createPortal(
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400">
      <div className="bg-white-100 dark:bg-black-200 dark:text-white-100 w-11/12 overflow-auto p-3 h-[45rem] rounded-xl">
        <form onSubmit={handleSubmitNewRole}>
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
              <FontAwesomeIcon icon={faX} className="text-red-700 text-xl" />
            </button>
          </div>
          <div className="grid grid-cols-2">
            <div className="py-1 mx-1">
              <label htmlFor="name" className="font-bold">
                Role Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                placeholder="Role Name"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
                defaultValue={editRoleData?.name}
              />
              <p className="text-red-700 text-xs">{serverErrors?.name}</p>
            </div>

            <div className="py-1 mx-1">
              <label htmlFor="code" className="font-bold">
                Role Code
              </label>

              <input
                type="text"
                id="code"
                name="code"
                placeholder="Role Code"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
                defaultValue={editRoleData?.code}
              />
              <p className="text-red-700 text-xs">{serverErrors?.code}</p>
            </div>
          </div>

          <div className="mt-1 grid grid-cols-2">
            {permissionsName.map((permi, index) => (
              <div key={index} className="border m-1 rounded-lg">
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
