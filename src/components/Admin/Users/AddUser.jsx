import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import useFetch from "../../../hooks/useFetch";
import adminAxios from "../../../services/Axios/adminInterceptors";
import Spinner from "../../Spinner/Spinner";
import { CustomSelect } from "../../SelectList";
import userPanelContext from "../../../Context/userPanelContext";
import Input from "../Input";

export default function AddUser() {
  const { setShowAddUser, fetchData } = useContext(userPanelContext);
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
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

  const editUserHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await adminAxios.post(`/user`, {
        ...userInfos,
        isSystem: Boolean(userInfos?.isSystem),
        enabled: Boolean(userInfos?.enabled),
        mobile: Number(userInfos?.mobile),
      });

      if (response.status === 200) {
        fetchData();
        setShowAddUser(false);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setServerErrors(error?.response?.data);
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
      <div className="lg:w-[30rem] bg-white-100 dark:bg-black-200 p-2 rounded-xl overflow-auto dark:text-white-100">
        <span className="mb-4 text-xl font-bold flex justify-center">
          Add User
        </span>
        {isLoading ? (
          <Spinner />
        ) : (
          <form
            className="w-full mx-auto p-4 bg-white rounded-lg text-sm  dark:text-white-100"
            onSubmit={editUserHandler}
          >
            <p className="text-xs text-red-700 text-center">
              {serverErrors?.message}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Input
                  labelText="firstName"
                  placeholder="firstNamee"
                  name="firstName"
                  value={userInfos?.firstName}
                  onChange={setUserInfosHandler}
                  Error={serverErrors?.errors?.firstName}
                  callback={() => setServerErrors("")}
                />
              </div>

              <div>
                <Input
                  labelText="lastName"
                  placeholder="lastName"
                  name="lastName"
                  value={userInfos?.lastName}
                  onChange={setUserInfosHandler}
                  Error={serverErrors?.errors?.lastName}
                  callback={() => setServerErrors("")}
                />
              </div>

              <div>
                <Input
                  labelText="username"
                  placeholder="username"
                  name="username"
                  value={userInfos?.username}
                  onChange={setUserInfosHandler}
                  Error={serverErrors?.errors?.username}
                  callback={() => setServerErrors("")}
                />
              </div>

              <div>
                <Input
                  type="number"
                  labelText="mobile"
                  placeholder="mobile"
                  name="mobile"
                  value={userInfos?.mobile}
                  onChange={setUserInfosHandler}
                  Error={serverErrors?.errors?.mobile}
                  callback={() => setServerErrors("")}
                />
              </div>

              <div>
                <Input
                  labelText="email"
                  placeholder="email"
                  name="email"
                  value={userInfos?.email}
                  onChange={setUserInfosHandler}
                  Error={serverErrors?.errors?.email}
                  callback={() => setServerErrors("")}
                />
              </div>

              <div>
                <label
                  htmlFor="colorId"
                  className="block  dark:text-white-100 text-gray-800 font-medium"
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
                  className="block  dark:text-white-100 text-gray-800 font-medium"
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
                  className="block  dark:text-white-100 text-gray-800 font-medium"
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
