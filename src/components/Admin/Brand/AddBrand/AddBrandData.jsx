import React, { useState } from "react";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";

export default function AddBrandData({
  setAddBrandId,
  setShowAddBrand,
  setShowAddBrandFile,
}) {
  const [isLoading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(false);
  const [newBrand, setNewBrand] = useState({
    code: "",
    name: "",
  });
  const setNewBrandHandler = (event) => {
    setNewBrand({
      ...newBrand,
      [event.target.name]: event.target.value,
    });
  };
  const addNewBrandHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await adminAxios.post("/brand", newBrand);

      if (response.status == 200) {
        setShowAddBrandFile(true);
        setShowAddBrand(false);
        setAddBrandId(response?.data?.data);
        setLoading(false);
        setNewBrand({
          code: "",
          name: "",
        });
        setServerErrors("");
      }
    } catch (error) {
      setServerErrors(error?.response?.data?.errors);
      setLoading(false);
    }
  };

  return (
    <>
      <span className="my-3 font-bold flex justify-center 2xl:text-2xl sm:text-xl text-[16px]">
        Add New Brand
      </span>

      <form
        onSubmit={addNewBrandHandler}
        className="w-full mx-auto sm:p-4 p-1 bg-white rounded-lg sm:text-base text-sm"
      >
        <div
          className={` grid grid-cols-1 sm:text-base text-sm gap-4 2xl:gap-y-7 mt-4 2xl:mt-5 ${
            isLoading && "opacity-20"
          }`}
        >
          <div>
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Brand name"
              className="border 2xl:p-3 p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
              onChange={setNewBrandHandler}
              value={newBrand?.name}
              onFocus={() => setServerErrors("")}
            />

            <p className="text-red-700">{serverErrors?.name}</p>
          </div>

          <div>
            <label htmlFor="code" className="block font-medium">
              Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              placeholder="Brand code"
              className="border 2xl:p-3 p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
              onChange={setNewBrandHandler}
              value={newBrand?.code}
              onBlur={() => setServerErrors("")}
              onFocus={() => setServerErrors("")}
            />

            <p className="text-red-700">{serverErrors?.code}</p>
          </div>
        </div>

        <div className="flex justify-center sm:mt-10 mt-7 sm:mb-0 sm:text-base text-sm 2xl:mt-16">
          <button
            type="submit"
            className={`bg-blue-600 text-white-100 w-full p-2 2xl:p-3 rounded-xl ${
              isLoading && "py-5"
            }`}
          >
            {isLoading ? <FormSpinner /> : "Add Brand"}
          </button>
        </div>
      </form>
    </>
  );
}
