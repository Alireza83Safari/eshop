import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer";
import userAxios from "../services/Axios/userInterceptors";
import { loginValidation } from "../validators/loginValidation";
import AuthContext from "../Context/AuthContext";
import Sidebar from "./Sidebar/Sidebar";
import Spinner from "../components/Spinner/Spinner";

export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(null);
  const { userLogin } = useContext(AuthContext);
  const [loginInfos, setLoginInfos] = useState({
    username: "",
    password: "",
  });

  const loginInfosHandler = (event) => {
    setLoginInfos({
      ...loginInfos,
      [event.target.name]: event.target.value,
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
          navigate("/");
          userLogin();
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
      <section className="flex items-center justify-center mt-32 mb-10">
        <form className="w-96 p-6 rounded-xl shadow-md bg-white-300 dark:bg-black-900">
          <div className={` ${isLoading && "opacity-30"}`}>
            <h2 className="text-2xl font-bold mb-6 text-center dark:text-white-200">
              Login
            </h2>
            <span className="text-red-700 text-center text-xs">
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
                className="p-2 block w-full rounded-md border shadow-sm outline-none"
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
                className="p-2 block w-full rounded-md border shadow-sm outline-none"
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
              isLoading && "py-5"
            }`}
            disabled={errors?.length}
            onClick={userLoginHandler}
          >
            {isLoading ? <Spinner /> : "py-5 bg-gray-200"}
          </button>
          <div className="mt-6 text-center dark:text-white-200">
            <Link className="text-xs" to="/register">
              Dont Havent an Account? <span>Sign Up</span>
            </Link>
          </div>
        </form>
      </section>

      <Footer />
    </>
  );
}
