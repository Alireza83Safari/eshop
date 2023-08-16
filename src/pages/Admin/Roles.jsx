import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import usePost from "../../hooks/usePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller } from "react-hook-form";

export default function Roles() {
  const [getPermissions, setPermissions] = useState([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { datas: getRoles } = useFetch("/api/v1/admin/role");

  const { datas: permissions } = useFetch("/api/v1/admin/role/permissions");

  const permissionsName =
    permissions?.map((permission) => permission.name) || [];

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSelectAll = () => {
    const allPermissions = permissions.flatMap((permission) =>
      permission.children.map((child) => child.code)
    );

    if (selectedCategories.length === allPermissions.length) {
      setPermissions([]);
    } else {
      setPermissions(allPermissions);
    }
  };
  const { doPost } = usePost();
  const newRolesHandler = (data) => {
    let rolesModel = {
      code: data.code,
      isSystem: true,
      name: data.name,
      permissions: getPermissions,
    };
    console.log(rolesModel);

    doPost("/api/v1/admin/role", rolesModel);
  };

  // در تگ <input> از تابع newRolesHandler با ارسال e.target.value و نوع ورودی (name یا code) استفاده کنید.

  return (
    <section className="float-right md:mt-16 mt-12 pb-10 pt-4 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
      <div className="px-10">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4">Roles</h2>
          <div>
            <button
              type="button"
              className="px-1 text-sm text-white-100 text-white rounded-md bg-blue-600"
              onClick={handleSelectAll}
            >
              Select All
            </button>
          </div>
        </div>

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
              {getRoles?.data.map((role, index) => (
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
                      />
                    </button>
                    <button className="px-2 py-1 rounded-md text-red-700 text-white">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16">
          <h1 className="mb-8 font-black">Add New Permission</h1>
          <form onSubmit={handleSubmit(newRolesHandler)}>
            <div className="grid grid-cols-2">
              <div className="px-4 py-1">
                <label htmlFor="name">Name</label>
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
                      className="w-full"
                      placeholder="Name"
                    />
                  )}
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>
              <div className="px-4 py-1">
                <label htmlFor="code">Code</label>
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
                      className="w-full"
                      placeholder="Code"
                    />
                  )}
                />
                {errors.code && <p>{errors.code.message}</p>}
              </div>
            </div>

            <div className="mt-1 grid grid-cols-2">
              {permissionsName.map((category, index) => (
                <div key={index} className="border">
                  <p className="p-2">{category}</p>
                  <ul className="text-xs grid grid-cols-2 gap-2 p-4">
                    {permissions.map(
                      (permission) =>
                        permission.name === category &&
                        permission.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <input
                              type="checkbox"
                              value={child.code}
                              checked={getPermissions.includes(child.code)}
                              onChange={() => {
                                if (getPermissions.includes(child.code)) {
                                  setPermissions(
                                    getPermissions.filter(
                                      (code) => code !== child.code
                                    )
                                  );
                                } else {
                                  setPermissions([
                                    ...getPermissions,
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

            <button type="submit" className="bg-blue-600 text-white-100 m-2 px-6 py-1">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
}
