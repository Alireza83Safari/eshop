import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { registerValidation } from "../validators/registerValidation";
import Header from "../pages/Header/Header";
import Footer from "../pages/Footer";
import Sidebar from "./Sidebar/Sidebar";
import Spinner from "../components/Spinner/Spinner";

export default function Register() {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState(null);
  const [sameValue, setSameValue] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
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
    const { name, value } = event.target;

    const isAnyInputEmpty = Object.values(registerInfos).some(
      (val) => val === ""
    );

    setIsDisable(isAnyInputEmpty);

    setRegisterInfos({
      ...registerInfos,
      [name]: value,
    });
  };

  useEffect(() => {
    setSameValue(registerInfos.password === registerInfos.passwordConfirmation);
  }, [registerInfos.password, registerInfos.passwordConfirmation]);

  const sendUserData = async () => {
    registerValidation(registerInfos, errors, setErrors);

    if (registerInfos.password !== registerInfos.passwordConfirmation) {
      setSameValue(false);
      return;
    }
    setLoading(true);
    try {
      await axios.post("/api/v1/user/register", registerInfos).then((res) => {
        if (res.status === 200) {
          navigate("/login");
          setLoading(false);
        }
      });
    } catch (error) {
      setServerErrors(error?.response?.data?.errors);
      setLoading(false);
      toast.error("Failed ", {
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <section className="grid lg:grid-cols-2 py-16 relative m-auto min-h-screen xl:px-20 px-5 z-10">
        <div className="flex lg:justify-end justify-center items-center w-96 m-auto lg:py-0 py-10">
          <div className="w-96">
            <img src="/images/User-Account-Sign-up.png" />
          </div>
        </div>
        <div className="flex lg:justify-start justify-center items-center">
          <form
            className="w-96 p-6 rounded-xl shadow-md bg-white-300 dark:bg-black-900 z-20"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className={` ${isLoading && "opacity-30"}`}>
              <h2 className="text-2xl font-bold mb-6 text-center dark:text-white-200">
                Register
              </h2>

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
                  onFocus={() => {
                    setErrors("");
                    setServerErrors("");
                  }}
                />
                <span className="text-red-700 text-center text-xs">
                  {errors?.username} {serverErrors?.username}
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
                  onFocus={() => {
                    setErrors("");
                    setServerErrors("");
                  }}
                />
                <span className=" text-red-700 text-center text-xs">
                  {errors?.password} {serverErrors?.password}
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
                  placeholder="password"
                  className="p-2 block w-full rounded-md border shadow-sm outline-none"
                  onChange={registerInfosHandler}
                  sameValue={sameValue}
                  value={registerInfos?.passwordConfirmation}
                  onFocus={() => {
                    setErrors("");
                    setServerErrors("");
                  }}
                />
                <span className=" text-red-700 text-center text-xs">
                  {errors?.passwordConfirmation} {serverErrors?.password}
                </span>
              </div>
            </div>
            <button
              type="submit"
              onClick={sendUserData}
              className={`w-full mt-8 py-2 px-4 bg-blue-600 hover:bg-blue-700 duration-300 text-white-100 rounded-lg disabled:bg-gray-200 z-10 ${
                isLoading && "py-5 bg-gray-200"
              }`}
              disabled={isDisable || !sameValue}
            >
              {isLoading ? <Spinner /> : "Register"}
            </button>

            <div className="mt-6 text-center dark:text-white-200">
              <Link className="text-xs" to="/login">
                Don't Have an Account? <span>Log In</span>
              </Link>
            </div>
          </form>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className=" absolute bottom-0 -z-10"
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
