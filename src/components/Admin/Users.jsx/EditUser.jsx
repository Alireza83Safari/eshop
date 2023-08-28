import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useFetch from "../../../hooks/useFetch";
import adminAxios from "../../../api/adminInterceptors";
import Spinner from "../../Spinner/Spinner";

export default function EditUser({
  setShowEditUser,
  showEditUser,
  editUserID,
  fetchUsers,
}) {
  const [userInfos, setUserInfos] = useState({
    firstName: "",
    lastName: "",
    username: "",
    mobile: Number,
    email: "",
    roleId: "",
    isSystem: "",
    enabled: Boolean,
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        adminAxios.get(`/user/${editUserID}`).then((usetData) => {
          setUserInfos({
            ...userInfos,
            firstName: usetData?.data.firstName,
            lastName: usetData?.data.lastName,
            username: usetData?.data.username,
            mobile: usetData?.data.mobile,
            email: usetData?.data.email,
            roleId: usetData?.data.roleId,
            isSystem: usetData?.data.isSystem,
            enabled: usetData?.data.enabled,
          });
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [showEditUser]);

  const { datas: rolesData } = useFetch("/role",adminAxios);
  

  const editUserHandler = async (userData) => {
    userData.preventDefault();
    setIsLoading(true);
    try {
      const response = await adminAxios.post(
        `/user/edit/${editUserID}`,
        userInfos
      );
      if (response.status === 200) {
        fetchUsers();
        setShowEditUser(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error deleting the product:", error.message);
      setIsLoading(false);
    }
  };

  const setUserInfosHandler = (event) => {
    setUserInfos({
      ...userInfos,
      [event.target.name]: event.target.value,
    });
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full bg-gray-100 h-screen flex items-center justify-center transition duration-400 ${
        showEditUser ? "visible" : "invisible"
      }`}
    >
      <div className="w-3/6 bg-white-100 p-2 rounded-xl h-[30rem] overflow-auto ">
        <span className="mb-4 text-xl font-bold flex justify-center">
          Edit User
        </span>
        {isLoading ? (
          <Spinner />
        ) : (
          <form
            onSubmit={editUserHandler}
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
                  value={userInfos?.firstName}
                  onChange={setUserInfosHandler}
                />
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
                  value={userInfos?.lastName}
                  onChange={setUserInfosHandler}
                />
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
                  value={userInfos?.username}
                  onChange={setUserInfosHandler}
                />
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
                  value={userInfos?.mobile}
                  onChange={setUserInfosHandler}
                />
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
                    value={userInfos?.email}
                    onChange={setUserInfosHandler}
                  />
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
                  value={userInfos?.roleId}
                  onChange={setUserInfosHandler}
                >
                  <option value="">Select a Role</option>
                  {rolesData &&
                    rolesData.data?.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="isMainItem"
                  className="block text-gray-800 font-medium"
                >
                  isSystem
                </label>
                <select
                  name="isSystem"
                  id="isSystem"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  onChange={setUserInfosHandler}
                  value={userInfos?.isSystem}
                >
                  <option value="">Select a isSystem</option>

                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="isMainItem"
                  className="block text-gray-800 font-medium"
                >
                  enabled
                </label>
                <select
                  name="isSystem"
                  id="isSystem"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  onChange={setUserInfosHandler}
                  value={userInfos?.enabled}
                >
                  <option value="">Select a enabled</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-blue-600 text-white-100 w-1/2 py-2 rounded-xl mr-2"
                onSubmit={editUserHandler}
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
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
