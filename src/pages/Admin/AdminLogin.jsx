import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  maxValidator,
  minValidator,
  requiredValidator,
} from "../../validators/rules";
import Input from "../../components/Form/Input";
import { useForm } from "./../../hooks/useForm";
import Header from "../Header/Header";
import Footer from "../Footer";
import instance from "../../api/userInterceptors";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [formState, onInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const userLogin = (event) => {
    event.preventDefault();
    const { username, password } = formState.inputs;

    let userInfo = {
      password: password.value,
      username: username.value,
    };

    instance.post("/api/v1/admin/login", userInfo).then((res) => {
      console.log(res);
      if (res.status === 200) {
        let token = res.data.token;
        localStorage.setItem("admin", JSON.stringify({ token }));
        navigate("/panel");
        return res.json();
      } else if (res.status === 422) {
        setError("user is not found");
      }
    });
  };
  return (
    <>
      <section className="flex items-center justify-center my-12">
        <form className="w-96 p-6 rounded-lg shadow-md bg-white-300">
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <span className=" text-red-700 text-center">{error}</span>
          <div className="mb-4 mt-12">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              username
            </label>
            <Input
              type="username"
              id="username"
              element="input"
              placeholder="username"
              className="p-2 block w-full rounded-md border shadow-sm outline-none"
              validations={[
                requiredValidator(),
                minValidator(4),
                maxValidator(26),
              ]}
              onInputHandler={onInputHandler}
            />
          </div>
          <div className="mb-4 mt-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-400"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              element="input"
              placeholder="password"
              className="p-2 block w-full rounded-md border shadow-sm outline-none"
              validations={[
                requiredValidator(),
                minValidator(8),
                maxValidator(26),
              ]}
              onInputHandler={onInputHandler}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-8 py-2 px-4 bg-blue-600 hover:bg-blue-700 duration-300 text-white-100 rounded-lg focus:outline-none"
            disabled={!formState.isFormValid}
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
    </>
  );
}
