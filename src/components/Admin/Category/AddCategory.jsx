import React, { useState } from "react";
import adminAxios from "../../../services/Axios/adminInterceptors";
import FormSpinner from "../../FormSpinner/FormSpinner";
import { ToastContainer, toast } from "react-toastify";
export default function AddCategory({ fetchData }) {
  const [newCategory, setNewCategory] = useState({
    code: "",
    name: "",
  });
  const [serverErrors, setServerErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const addCategoryHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await adminAxios.post("/category", newCategory);
      if (response.status === 200) {
        setLoading(false);
        toast.success("add category is successfuly");
        setNewCategory({
          code: "",
          name: "",
        });
        fetchData();
        setServerErrors("");
      }
    } catch (error) {
      setServerErrors(error?.response?.data?.errors);
      setLoading(false);
    }
  };

  const setNewCategoryHandler = (event) => {
    setNewCategory({
      ...newCategory,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <div className="bg-white-100 sm:p-5 p-2 rounded-xl dark:bg-black-200 2xl:h-[33rem] dark:text-white-100 row-span-2 min-w-full mt-6 lg:mb-0 mb-5">
        <span className="my-3 font-bold flex justify-center 2xl:text-2xl sm:text-xl text-[16px]">
          Add New Category
        </span>

        <form
          onSubmit={addCategoryHandler}
          className="min-w-full mx-auto sm:p-4 p-1 rounded-lg"
        >
          <div
            className={` grid grid-cols-1 sm:gap-4 sm:mt-4 sm:text-base text-sm 2xl:gap-y-7 mt-4 2xl:mt-5 ${
              isLoading && "opacity-20"
            }`}
          >
            <div className="mt-3">
              <label htmlFor="name" className="block font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="category name"
                className="border 2xl:p-3 p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
                onChange={setNewCategoryHandler}
                value={newCategory?.name}
                onFocus={() => setServerErrors("")}
              />
              <p className="text-red-700">{serverErrors?.name}</p>
            </div>

            <div className="mt-3">
              <label htmlFor="code" className="block font-medium">
                Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                placeholder="category code"
                className="border 2xl:p-3 p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
                onChange={setNewCategoryHandler}
                value={newCategory?.code}
                onBlur={() => setServerErrors("")}
                onFocus={() => setServerErrors("")}
              />

              <p className="text-red-700">{serverErrors?.code}</p>
            </div>
          </div>

          <div className="flex justify-center 2xl:mt-16 sm:mt-10 mt-7 sm:mb-0 mb-4 sm:text-base text-sm">
            <button
              type="submit"
              className={` bg-blue-600 text-white-100 w-full 2xl:p-3 p-2 rounded-xl ${
                isLoading && "h-[2.4rem]"
              }`}
            >
              {isLoading ? <FormSpinner /> : "Add Category"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
