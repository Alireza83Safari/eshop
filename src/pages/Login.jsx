import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer";
import instance from "../api/userInterceptors";
import { loginValidation } from "../validators/loginValidation";

export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [serverErrors, setServerErrors] = useState(null);
  
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

  const userLogin = (event) => {
    event.preventDefault();
    loginValidation(loginInfos, errors, setErrors);

    instance
      .post("/login", loginInfos)
      .then((res) => {
        if (res.status === 200) {
          let token = res.data.token;
          localStorage.setItem("user", JSON.stringify({ token }));
          navigate("/shop");
        }
      })
      .catch((err) => {
        setServerErrors(err?.response?.data);
      });
  };
  return (
    <>
      <Header />

      <section className="flex items-center justify-center my-12">
        <form className="w-96 p-6 rounded-lg shadow-md bg-white-300">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <span className=" text-red-700 text-center text-xs">
            {serverErrors?.message}
          </span>
          <br />
          <span className=" text-red-700 text-center text-xs">
            {serverErrors?.errors?.password}
          </span>
          <div className="mb-4 mt-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
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
            />
            <span className=" text-red-700 text-center text-xs">
              {errors?.username}
            </span>
          </div>
          <div className="mb-4 mt-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
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
            />
            <span className=" text-red-700 text-center text-xs">
              {errors?.password}
            </span>
          </div>
          <button
            type="submit"
            className="w-full mt-8 py-2 px-4 bg-blue-600 hover:bg-blue-700 duration-300 text-white-100 rounded-lg disabled:bg-gray-200"
            disabled={errors?.length}
            onClick={userLogin}
          >
            Login
          </button>
          <div className="mt-6 text-center">
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
