import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import useFetch from "../../../hooks/useFetch";
import adminAxios from "../../../services/Axios/adminInterceptors";
import Spinner from "../../Spinner/Spinner";
import { CustomSelect } from "../../SelectList";
import userPanelContext from "../../../Context/userPanelContext";

export default function AddUser() {
  const { setShowAddUser, fetchData } = useContext(userPanelContext);
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, aetServerErrors] = useState(null);
  const [userInfos, setUserInfos] = useState({
    firstName: "",
    lastName: "",
    username: "",
    mobile: null,
    email: "",
    roleId: "",
    isSystem: "",
    enabled: "",
  });
  const { datas: roles } = useFetch("/role", adminAxios);
  console.log({
    ...userInfos,
    isSystem: Boolean(userInfos?.isSystem),
    enabled: Boolean(userInfos?.enabled),
  });
  const editUserHandler = async (e) => {
    e.preventDefault();
    console.log(userInfos);

    setIsLoading(true);
    try {
      const response = await adminAxios.post(`/user`, {
        ...userInfos,
        isSystem: Boolean(userInfos?.isSystem),
        enabled: Boolean(userInfos?.enabled),
        mobile: Number(userInfos?.mobile),
      });
      console.log(response);

      if (response.status === 200) {
        fetchData();
        setShowAddUser(false);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      aetServerErrors(error?.response?.data);
      console.log(error);
    }
  };

  const setUserInfosHandler = (event) => {
    setUserInfos({
      ...userInfos,
      [event.target.name]: event.target.value,
    });
  };

  return ReactDOM.createPortal(
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full bg-gray-100 h-screen flex items-center justify-center transition duration-400">
      <div className="lg:w-[30rem] bg-white-100 p-2 rounded-xl overflow-auto ">
        <span className="mb-4 text-xl font-bold flex justify-center">
          Add User
        </span>
        {isLoading ? (
          <Spinner />
        ) : (
          <form
            className="w-full mx-auto p-4 bg-white rounded-lg text-sm"
            onSubmit={editUserHandler}
          >
            <p className="text-xs text-red-700 text-center">
              {serverErrors?.message}
            </p>
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
                <p className="text-xs text-red-700">
                  {serverErrors?.errors?.firstName}
                </p>
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
                <p className="text-xs text-red-700">
                  {serverErrors?.errors?.lastName}
                </p>
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
                <p className="text-xs text-red-700">
                  {serverErrors?.errors?.username}
                </p>
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
                <p className="text-xs text-red-700">
                  {serverErrors?.errors?.mobile}
                </p>
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
                  <p className="text-xs text-red-700">
                    {serverErrors?.errors?.email}
                  </p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="colorId"
                  className="block text-gray-800 font-medium"
                >
                  role
                </label>
                <CustomSelect
                  options={roles?.data.map((role) => ({
                    value: role.id,
                    label: role.name,
                  }))}
                  onchange={(selectedOption) => {
                    setUserInfos({
                      ...userInfos,
                      roleId: selectedOption?.value || "",
                    });
                  }}
                />
                <p className="text-xs text-red-700">
                  {serverErrors?.errors?.role}
                </p>
              </div>

              <div>
                <label
                  htmlFor="isMainItem"
                  className="block text-gray-800 font-medium"
                >
                  isSystem
                </label>
                <CustomSelect
                  options={["true", "false"].map((isMain) => ({
                    value: isMain,
                    label: isMain,
                  }))}
                  onchange={(selectedOptions) => {
                    setUserInfos({
                      ...userInfos,
                      isMainItem: selectedOptions?.value,
                    });
                  }}
                />
                <p className="text-xs text-red-700">
                  {serverErrors?.errors?.isSystem}
                </p>
              </div>

              <div>
                <label
                  htmlFor="isMainItem"
                  className="block text-gray-800 font-medium"
                >
                  enabled
                </label>
                <CustomSelect
                  options={["true", "false"].map((status) => ({
                    value: status,
                    label: status,
                  }))}
                  onchange={(selectedOptions) => {
                    setUserInfos({
                      ...userInfos,
                      enabled: selectedOptions?.value,
                    });
                  }}
                />
                <p className="text-xs text-red-700">
                  {serverErrors?.errors?.enabled}
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-blue-600 text-white-100 w-1/2 py-2 rounded-xl mr-2"
                onSubmit={editUserHandler}
              >
                Add User
              </button>
              <button
                type="submit"
                className="w-1/2 py-2 rounded-xl border ml-2"
                onClick={() => setShowAddUser(false)}
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
