import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted:", data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="w-96 p-6 rounded-lg shadow-md bg-white-300"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4 mt-12">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-400"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`p-2 block w-full rounded-md border shadow-sm outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-700 text-xs mt-1">{errors.email.message}</p>
          )}
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
            id="password"
            className={`p-2 block w-full rounded-md border shadow-sm outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must have at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-700 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full mt-8 py-2 px-4 bg-blue-600 hover:bg-blue-700 duration-300 text-white-100 rounded-lg focus:outline-none"
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
