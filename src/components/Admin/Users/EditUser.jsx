import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import useFetch from "../../../hooks/useFetch";
import adminAxios from "../../../services/Axios/adminInterceptors";
import Spinner from "../../Spinner/Spinner";
import { CustomSelect } from "../../SelectList";
import { useContext } from "react";
import userPanelContext from "../../../Context/userPanelContext";
import Input from "../Input";

export default function EditUser() {
  const { setShowEditUser, showEditUser, editUserID, fetchData } =
    useContext(userPanelContext);
  const [serverErrors, setServerErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [roleName, setRoleName] = useState(null);
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
  useEffect(() => {
    const fetchDatas = async () => {
      try {
        adminAxios.get(`/user/${editUserID}`).then((userData) => {
          let $ = userData?.data;
          setUserInfos({
            ...userInfos,
            firstName: $.firstName,
            lastName: $.lastName,
            username: $.username,
            mobile: Number($.mobile),
            email: $.email,
            roleId: $.roleId,
            isSystem: $.isSystem,
            enabled: $.enabled,
          });
          setRoleName($.roleName);
        });
      } catch (err) {}
    };
    if (editUserID) {
      fetchDatas();
    }
  }, [showEditUser]);

  const { datas: roles } = useFetch("/role", adminAxios);

  const editUserHandler = async (userData) => {
    userData.preventDefault();
    setIsLoading(true);
    try {
      const response = await adminAxios.post(
        `/user/edit/${editUserID}`,
        userInfos
      );
      if (response.status === 200) {
        fetchData();
        setShowEditUser(false);
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
      <div className="lg:w-[30rem] bg-white-100 p-2 rounded-xl overflow-auto ">
        <span className="mb-4 text-xl font-bold flex justify-center">
          Edit User
        </span>
        {isLoading ? (
          <Spinner />
        ) : (
          <form
            onSubmit={editUserHandler}
            className="w-full mx-auto p-4 bg-white rounded-lg text-sm"
          >
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
                  defaultValue={{
                    value: userInfos?.roleId,
                    label: roleName,
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="isSystem"
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
                      isSystem: selectedOptions?.value,
                    });
                  }}
                  defaultValue={{
                    value: userInfos?.isSystem,
                    label: String(userInfos?.isSystem),
                  }}
                />
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
                  defaultValue={{
                    value: userInfos?.enabled,
                    label: String(userInfos?.enabled),
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-blue-600 text-white-100 w-1/2 py-2 rounded-xl mr-2"
                onSubmit={editUserHandler}
              >
                Edit User
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
