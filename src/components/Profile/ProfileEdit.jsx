import React, { useContext, useEffect, useState } from "react";
import userAxios from "../../services/Axios/userInterceptors";
import AuthContext from "../../Context/AuthContext";

export default function ProfileEdit() {
  const { userInfos } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    username: "",
  });

  useEffect(() => {
    setUserInfo({
      ...userInfo,
      email: userInfos?.email,
      firstName: userInfos?.firstName,
      lastName: userInfos?.lastName,
      mobile: userInfos?.mobile,
      username: userInfos?.username,
    });
  }, [userInfo]);

  const edituserInfo = () => {
    userAxios.post(`/profile/edit`, userInfo);
  };

  const userInfoHandler = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  return (
    <div className="p-5">
      <h2 className="text-center pb-10 font-bold text-lg dark:text-white-100">
        Edit Infos
      </h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div>
            <label className="block text-gray-800 font-medium" htmlFor="email">
              email
            </label>
            <input
              type="text"
              placeholder="email"
              className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
              name="email"
              onChange={userInfoHandler}
              value={userInfo?.email}
            />
          </div>

          <div>
            <label
              className="block text-gray-800 font-medium"
              htmlFor="firstName"
            >
              firstName
            </label>
            <input
              type="text"
              placeholder="firstName"
              className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
              name="firstName"
              onChange={userInfoHandler}
              value={userInfo?.firstName}
            />
          </div>

          <div>
            <label
              className="block text-gray-800 font-medium"
              htmlFor="lastName"
            >
              lastName
            </label>
            <input
              type="text"
              placeholder="lastName"
              className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
              name="lastName"
              onChange={userInfoHandler}
              value={userInfo?.lastName}
            />
          </div>

          <div>
            <label className="block text-gray-800 font-medium" htmlFor="mobile">
              mobile
            </label>
            <input
              type="text"
              placeholder="mobile"
              className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
              name="mobile"
              onChange={userInfoHandler}
              value={userInfo?.mobile}
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            onClick={edituserInfo}
            className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2"
          >
            Edit Profile
          </button>
        </div>
      </form>
    </div>
  );
}
