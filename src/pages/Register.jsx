import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import {
  emailValidator,
  maxValidator,
  minValidator,
  requiredValidator,
} from "../validators/rules";
import Input from "../components/Form/Input";

export default function Register() {
  const navigate = useNavigate();
  const [sameValue, setSameValue] = useState(false);
  const [formState, onInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      confirmPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );


  useEffect(() => {
    const { password, confirmPassword } = formState.inputs;
    setSameValue(password.value === confirmPassword.value);
  }, [formState.inputs.password, formState.inputs.confirmPassword]);

  const sendUserData = (event) => {
    event.preventDefault();
    const { password, confirmPassword } = formState.inputs;

    if (password.value !== confirmPassword.value) {
      setSameValue(false);
      return;
    }

    let newUserInfo = {
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
    };
    fetch("http://localhost:9000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfo),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  return (
    <div className="flex items-center justify-center my-12">
      <form className="w-96 p-6 rounded-lg shadow-md bg-white-300">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <div className="mb-4 mt-6">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Username
          </label>
          <Input
            type="text"
            id="username"
            element="input"
            placeholder="Username"
            className="p-2 block w-full rounded-md border shadow-sm outline-none"
            validations={[
              requiredValidator(),
              minValidator(6),
              maxValidator(20),
            ]}
            onInputHandler={onInputHandler}
          />
        </div>

        <div className="mb-4 mt-6">
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
            element="passwordRegister"
            placeholder="password"
            className="p-2 block w-full rounded-md border shadow-sm outline-none"
            validations={[
              requiredValidator(),
              minValidator(8),
              maxValidator(26),
            ]}
            onInputHandler={onInputHandler}
            sameValue={sameValue}
          />
        </div>
        <div className="mb-4 mt-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Confirm Password
          </label>
          <Input
            type="password"
            id="confirmPassword"
            element="passwordRegister"
            placeholder="confirmPassword"
            className="p-2 block w-full rounded-md border shadow-sm outline-none"
            validations={[
              requiredValidator(),
              minValidator(8),
              maxValidator(26),
            ]}
            onInputHandler={onInputHandler}
            sameValue={sameValue}
          />
        </div>
        <button
          type="submit"
          onClick={sendUserData}
          disabled={!sameValue && !formState.isFormValid}
          className="w-full mt-8 py-2 px-4 bg-blue-600 hover:bg-blue-700 duration-300 text-white-100 rounded-lg focus:outline-none"
        >
          Register
        </button>

        <div className="mt-6 text-center">
          <Link className="text-xs" to="/shop/login">
            Don't Have an Account? <span>Log In</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
