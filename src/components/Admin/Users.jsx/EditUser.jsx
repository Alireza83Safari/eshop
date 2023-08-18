import React, { useContext } from "react";
import ReactDOM from "react-dom";
import productsContext from "../../../Context/productsContext";
import { useForm } from "react-hook-form";
import useFetch from "../../../hooks/useFetch";
import instance from "../../../api/axios-interceptors";
export default function EditUser({
  setShowEditUser,
  showEditUser,
  editUserID,
}) {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Accessing token from context
  const { token } = useContext(productsContext);

  // Fetching data for the product to be edited
  const { datas: editData } = useFetch(`/api/v1/admin/product/${editUserID}`);
  console.log(editUserID);

  // Function to post edited product data
  const editProductHandler = (userData) => {
    let editUserModel = {
      email: userData.email,
      enabled: true,
      firstName: userData.firstName,
      isSystem: true,
      lastName: userData.lastName,
      mobile: userData.mobile,
      roleId: userData.roleId,
      username: userData.username,
    };
    console.log(editUserModel);
    instance
      .post(`/api/v1/admin/user/edit/${editUserID}`, editUserModel, {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: token,
        },
      })

      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const { datas: rolesData, fetchData } = useFetch("/api/v1/admin/role");

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full bg-gray-100 h-screen flex items-center justify-center transition duration-400 ${
        showEditUser ? "visible" : "invisible"
      }`}
    >
      <div className="w-3/6 bg-white-100 p-2 rounded-xl h-[26rem] overflow-auto ">
        <span className="mb-4 text-xl font-bold flex justify-center">
          Edit User
        </span>

        <form
          onSubmit={handleSubmit(editProductHandler)}
          className="w-full mx-auto p-4 bg-white rounded-lg"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-800 font-medium"
              >
                firstName
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="firstName"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                {...register("firstName", {
                  required: "This field is required",
                })}
                defaultValue={editData?.firstName}
              />
              {errors.firstName && (
                <p className="text-red-700 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-800 font-medium"
              >
                lastName
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="lastName"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                {...register("lastName", {
                  required: "This field is required",
                })}
                defaultValue={editData?.lastName}
              />
              {errors.lastName && (
                <p className="text-red-700 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-gray-800 font-medium"
              >
                username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                {...register("username", {
                  required: "This field is required",
                })}
                defaultValue={editData?.username}
              />
              {errors.username && (
                <p className="text-red-700 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="mobile"
                className="block text-gray-800 font-medium"
              >
                mobile
              </label>
              <input
                type="number"
                id="mobile"
                name="mobile"
                placeholder="mobile"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                {...register("mobile", {
                  required: "This field is required",
                })}
                defaultValue={editData?.mobile}
              />
              {errors.mobile && (
                <p className="text-red-700 text-sm">{errors.mobile.message}</p>
              )}
            </div>

            <div className="">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-800 font-medium"
                >
                  email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="user email"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  {...register("email", {
                    required: "This field is required",
                  })}
                  defaultValue={editData?.email}
                />
                {errors.email && (
                  <p className="text-red-700 text-sm">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="colorId"
                className="block text-gray-800 font-medium"
              >
                role
              </label>
              <select
                name="roleId"
                id="roleId"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                {...register("roleId", {
                  required: "Please select a Category",
                })}
                defaultValue={editData?.roleId}
              >
                <option value="">Select a Role</option>
                {rolesData &&
                  rolesData.data?.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
              </select>
              {errors.roleId && (
                <p className="text-red-700 text-sm">{errors.roleId.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white-100 w-1/2 py-2 rounded-xl mr-2"
            >
              Edit Product
            </button>
            <button
              type="submit"
              className="w-1/2 py-2 rounded-xl border ml-2"
              onClick={() => setShowEditUser(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
