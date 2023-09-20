import React, { useState } from "react";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";

export default function AddAppPicData({
  setAddAppPicId,
  setShowAddAppPic,
  setShowAddAppPicFile,
}) {
  const [isLoading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(false);

  const [newAppPic, setNewAppPic] = useState({
    appPicType: 3,
    description: "",
    priority: "",
    title: "",
    url: "",
  });
  const setNewAppPicHandler = (event) => {
    setNewAppPic({
      ...newAppPic,
      [event.target.name]: event.target.value,
    });
  };
  const addNewAppPicHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await adminAxios.post("/appPic", {
        ...newAppPic,
        priority: Number(newAppPic?.priority),
      });

      if (response.status == 200) {
        setShowAddAppPicFile(true);
        setShowAddAppPic(false);
        setAddAppPicId(response?.data?.data);
        setLoading(false);
        setServerErrors("");
      }
    } catch (error) {
      setServerErrors(error?.response?.data?.errors);
      setLoading(false);
    }
  };

  return (
    <div>
      <span className="my-2 text-xl font-bold flex justify-center">
        Add New AppPic
      </span>

      <form
        onSubmit={addNewAppPicHandler}
        className="w-full mx-auto p-4 bg-white rounded-lg"
      >
        <div
          className={` grid grid-cols-2 gap-4 mt-4 ${
            isLoading && "opacity-20"
          }`}
        >
          <div>
            <label htmlFor="url" className="block font-medium">
              url
            </label>
            <input
              type="text"
              id="url"
              name="url"
              placeholder="AppPic url"
              className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
              onChange={setNewAppPicHandler}
              value={newAppPic?.url}
              onBlur={() => setServerErrors("")}
              onFocus={() => setServerErrors("")}
            />

            <p className="text-red-700 text-xs">{serverErrors?.url}</p>
          </div>

          <div>
            <label htmlFor="priority" className="block font-medium">
              priority
            </label>
            <input
              type="number"
              id="priority"
              name="priority"
              placeholder="AppPic priority"
              className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
              onChange={setNewAppPicHandler}
              value={newAppPic?.priority}
              onBlur={() => setServerErrors("")}
              onFocus={() => setServerErrors("")}
            />

            <p className="text-red-700 text-xs">{serverErrors?.priority}</p>
          </div>

          <div className="col-span-2">
            <div>
              <label htmlFor="title" className="block font-medium">
                title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="AppPic title"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
                onChange={setNewAppPicHandler}
                value={newAppPic?.title}
                onFocus={() => setServerErrors("")}
              />

              <p className="text-red-700 text-xs">{serverErrors?.title}</p>
            </div>
          </div>

          <div className="col-span-2">
            <label htmlFor="description" className="block font-medium">
              description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="AppPic description"
              className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
              onChange={setNewAppPicHandler}
              value={newAppPic?.description}
              onBlur={() => setServerErrors("")}
              onFocus={() => setServerErrors("")}
            />

            <p className="text-red-700 text-xs">{serverErrors?.description}</p>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className={`bg-blue-600 text-white-100 w-full py-2 rounded-xl ${
              isLoading && "py-5"
            }`}
          >
            {isLoading ? <FormSpinner /> : "Add AppPic"}
          </button>
        </div>
      </form>
    </div>
  );
}
