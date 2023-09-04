import React, { useState } from "react";
import ReactDOM from "react-dom";
import useFetch from "../../../hooks/useFetch";
import adminAxios from "../../../services/Axios/adminInterceptors";
import Spinner from "../../Spinner/Spinner";
import userAxios from "../../../services/Axios/userInterceptors";
import { appPicValidation } from "../../../validators/appPicValidation";

export default function AddAppPic({
  setShowAddAppPic,
  setAppPicId,
  setShowFileAppPic,
}) {
  const { fetchData } = useFetch("/appPic", userAxios);
  const [appicInfo, setAppicInfo] = useState({
    appPicType: 3,
    description: "",
    priority: 0,
    title: "",
    url: "",
  });
  const [errors, setErrors] = useState(null);
  const [serverErrors, setServerErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const addNewProducts = async () => {
    setLoading(true);
    appPicValidation(appicInfo, errors, setErrors);
    try {
      const response = await adminAxios.post("/appPic", appicInfo);
      if (response.status === 200) {
        fetchData();
        setShowAddAppPic(false);
        setShowFileAppPic(true);
        setLoading(false);
        setAppPicId(response?.data?.data);
      }
    } catch (error) {
      setServerErrors(error?.response?.data?.errors);
      setLoading(false);
    }
  };

  const setAppicInfos = (event) => {
    const { name, value } = event.target;
    setAppicInfo({
      ...appicInfo,
      [name]: name === "priority" ? Number(value) : value,
    });
  };

  return ReactDOM.createPortal(
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400">
      <div className="lg:w-2/5 md:w-3/5 w-4/5 bg-white-100 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Add New Appics
        </span>

        <form onSubmit={(e) => e.preventDefault()}>
          <div
            className={` grid grid-cols-1 gap-2 mt-2 ${
              isLoading && "opacity-30"
            } `}
          >
            <div>
              <label
                htmlFor="title"
                className="block text-gray-800 font-medium"
              >
                title
              </label>
              <input
                type="text"
                placeholder="title"
                className="border py-2 w-full px-2 rounded-lg outline-none focus:border-blue-600"
                name="title"
                onChange={setAppicInfos}
                value={appicInfo?.title}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />
              <p className="text-sm text-red-700">
                {errors?.title}
                {serverErrors?.title}
              </p>
            </div>
            <div className="">
              <label htmlFor="url" className="block text-gray-800 font-medium">
                url
              </label>
              <input
                type="text"
                placeholder="url"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                name="url"
                onChange={setAppicInfos}
                value={appicInfo?.url}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />
              <p className="text-sm text-red-700">{errors?.url}</p>
            </div>

            <div className="">
              <label
                htmlFor="priority"
                className="block text-gray-800 font-medium"
              >
                priority
              </label>
              <input
                type="number"
                placeholder="priority"
                className="border py-2 w-full px-2 rounded-lg outline-none focus:border-blue-600"
                name="priority"
                onChange={setAppicInfos}
                value={appicInfo?.priority}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />

              <p className="text-sm text-red-700">
                {errors?.priority}
                {serverErrors?.priority}
              </p>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-gray-800 font-medium"
              >
                description
              </label>
              <input
                type="text"
                placeholder="Product Description"
                className="border py-2 w-full px-2 rounded-lg outline-none focus:border-blue-600"
                name="description"
                onChange={setAppicInfos}
                value={appicInfo?.description}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />
              <p className="text-sm text-red-700">
                {errors?.description}
                {serverErrors?.description}
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className={` bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2 ${
                isLoading && "bg-gray-200"
              }`}
              onClick={addNewProducts}
            >
              {isLoading ? <Spinner /> : "Add Product"}
            </button>
            <button
              type="submit"
              className="w-full py-2 rounded-xl border border-blue-600 ml-2"
              onClick={() => setShowAddAppPic(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
