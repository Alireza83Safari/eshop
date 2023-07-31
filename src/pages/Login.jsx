import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  emailValidator,
  maxValidator,
  minValidator,
  requiredValidator,
} from "../validators/rules";
import Input from "../components/Form/Input";
import { useForm } from "../hooks/useForm";

export default function Login() {
  const navigate = useNavigate();
  const [formState, onInputHandler] = useForm(
    {
      email: {
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
    const { email, password } = formState.inputs;

    let userInfo = {
      email: email,
      password: password,
    };
  };
  return (
    <div className="flex items-center justify-center my-12">
      <form className="w-96 p-6 rounded-lg shadow-md bg-white-300">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4 mt-12">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Email
          </label>
          <Input
            type="email"
            id="email"
            element="input"
            placeholder="Email"
            className="p-2 block w-full rounded-md border shadow-sm outline-none"
            validations={[
              requiredValidator(),
              minValidator(8),
              maxValidator(26),
              emailValidator(),
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
          <Link className="text-xs" to="/shop/register">
            Dont Havent an Account? <span>Sign Up</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
