import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import userAxios from "../services/Axios/userInterceptors";
import { loginValidation } from "../validators/loginValidation";
import { AuthContext } from "../Context/AuthContext";
import Sidebar from "./Sidebar/Sidebar";
import Spinner from "../components/Spinner/Spinner";
import useAccess from "../hooks/useAccess";

export default function Login() {
  const navigate = useNavigate();
  const { userLogin, userPermissions } = useContext(AuthContext);
  const [errors, setErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const [loginInfos, setLoginInfos] = useState({
    username: "",
    password: "",
  });

  const loginInfosHandler = (event) => {
    const { name, value } = event.target;

    const isAnyInputEmpty = Object.values(loginInfos).some((val) => val === "");

    setIsDisable(isAnyInputEmpty);

    setLoginInfos({
      ...loginInfos,
      [name]: value,
    });
  };
  const userLoginHandler = (event) => {
    event.preventDefault();

    loginValidation(loginInfos, errors, setErrors);
    setLoading(true);
    userAxios
      .post("/login", loginInfos)
      .then((res) => {
        if (res.status === 200) {
          userLogin();
          navigate("/");
          setLoading(false);
        }
      })
      .catch((err) => {
        setServerErrors(err?.response?.data);
        setLoading(false);
      });
  };

  return (
    <>
      <Header />
      <Sidebar />

      <section className="grid lg:grid-cols-2 py-16 relative m-auto min-h-screen xl:px-20 px-5">
        <div className="flex lg:justify-end justify-center items-center w-96 m-auto lg:py-0 py-10">
          <div className="w-96">
            <img src="/images/User-Account-Sign-up.png" />
          </div>
        </div>
        <div className="flex lg:justify-start justify-center items-center">
          <form className="sm:w-[26rem] w-full py-8 px-5 rounded-xl shadow-md bg-white-300 dark:bg-black-900">
            <div className={` ${isLoading && "opacity-30"}`}>
              <h2 className="text-2xl font-bold mb-8 text-center dark:text-white-200">
                Login
              </h2>
              <span className="text-red-700 flex justify-center text-center text-xs">
                {serverErrors?.message}
              </span>

              <div className="mb-4 mt-6">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-white-200"
                >
                  username
                </label>
                <input
                  type="text"
                  name="username"
                  element="input"
                  placeholder="username"
                  className="p-2 block w-full rounded-md border shadow-sm outline-none dark:bg-black-200 dark:text-white-100"
                  onChange={loginInfosHandler}
                  value={loginInfos?.username}
                  onFocus={() => {
                    setErrors("");
                    setServerErrors("");
                  }}
                />
                <span className=" text-red-700 text-center text-xs">
                  {errors?.username} {serverErrors?.errors?.username}
                </span>
              </div>
              <div className="mb-4 mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-white-200"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="p-2 block w-full rounded-md border shadow-sm outline-none dark:bg-black-200 dark:text-white-100"
                  onChange={loginInfosHandler}
                  value={loginInfos?.password}
                  onFocus={() => {
                    setErrors("");
                    setServerErrors("");
                  }}
                />
                <span className=" text-red-700 text-center text-xs">
                  {errors?.password} {serverErrors?.errors?.password}
                </span>
              </div>
            </div>
            <button
              type="submit"
              className={`w-full mt-8 py-2 px-4 bg-blue-600 hover:bg-blue-700 duration-300 text-white-100 rounded-lg disabled:bg-gray-200 ${
                isLoading && "py-5 bg-gray-200"
              }`}
              disabled={isDisable}
              onClick={userLoginHandler}
            >
              {isLoading ? <Spinner /> : "login"}
            </button>
            <div className="mt-6 text-center dark:text-white-200">
              <Link className="text-xs" to="/register">
                Dont Havent an Account? <span>Sign Up</span>
              </Link>
            </div>
          </form>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className=" absolute bottom-0 -z-20"
        >
          <path
            fill="#a2d9ff"
            fillOpacity="0.1"
            d="M0 128l60-16c60-16 180-48 300-21.3C480 117 600 203 720 218.7c120 16.3 240-37.7 360-48 120-10.7 240 21.3 300 37.3l60 16v96H0z"
          ></path>
        </svg>
      </section>

      <Footer />
    </>
  );
}
