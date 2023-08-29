import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { registerValidation } from "../validators/registerValidation";
import Header from "../pages/Header/Header";
import Footer from "../pages/Footer";

export default function Register() {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState(null);
  const [sameValue, setSameValue] = useState(false);

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [registerInfos, setRegisterInfos] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const registerInfosHandler = (event) => {
    registerValidation(registerInfos, errors, setErrors);

    setRegisterInfos({
      ...registerInfos,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setSameValue(registerInfos.password === registerInfos.passwordConfirmation);
  }, [registerInfos.password, registerInfos.passwordConfirmation]);

  const sendUserData = async (event) => {
    event.preventDefault();

    if (registerInfos.password !== registerInfos.passwordConfirmation) {
      setSameValue(false);
      return;
    }
    try {
      await axios.post("/api/v1/user/register", registerInfos).then((res) => {
        if (res.status === 200) {
          navigate("/login");
        }
      });
    } catch (error) {
      setServerErrors(error?.response?.data?.errors);
      toast.error("Failed ", {
        position: "bottom-right",
      });
    }
  };
  const hasErrors = (errorObj) => {
    return Object.values(errorObj).some((error) => error !== "");
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center my-12">
        <form className="w-96 p-6 rounded-xl shadow-md bg-white-300 dark:bg-black-900">
          <h2 className="text-2xl font-bold mb-6 text-center dark:text-white-200">
            Register
          </h2>
          <span className="text-red-700 text-center text-xs">
            {serverErrors?.password}
          </span>

          <div className="mb-4 mt-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-white-200"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="p-2 block w-full rounded-md border shadow-sm outline-none"
              onChange={registerInfosHandler}
              value={registerInfos?.username}
            />
            <span className="text-red-700 text-center text-xs">
              {errors?.username}
            </span>
            <span className="text-red-700 text-center text-xs">
              {serverErrors?.username}
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
              id="password"
              placeholder="password"
              className="p-2 block w-full rounded-md border shadow-sm outline-none"
              onChange={registerInfosHandler}
              sameValue={sameValue}
              value={registerInfos?.password}
            />
            <span className=" text-red-700 text-center text-xs">
              {errors?.password}
            </span>
          </div>
          <div className="mb-4 mt-6">
            <label
              htmlFor="passwordConfirmation"
              className="block text-sm font-medium text-gray-700 dark:text-white-200"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              placeholder="passwordConfirmation"
              className="p-2 block w-full rounded-md border shadow-sm outline-none"
              onChange={registerInfosHandler}
              value={registerInfos?.passwordConfirmation}
              sameValue={sameValue}
            />
            <span className=" text-red-700 text-center text-xs">
              {errors?.passwordConfirmation}
            </span>
          </div>
          <button
            type="click"
            onClick={sendUserData}
            disabled={hasErrors(errors) || !sameValue}
            className="w-full mt-8 py-2 px-4 bg-blue-600 hover:bg-blue-700 duration-300 text-white-100 rounded-lg disabled:bg-gray-200"
          >
            Register
          </button>

          <div className="mt-6 text-center">
            <Link className="text-xs" to="/login">
              Don't Have an Account? <span>Log In</span>
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
