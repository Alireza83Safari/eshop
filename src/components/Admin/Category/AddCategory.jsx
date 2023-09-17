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
        toast.success("add ctaedory is successfuly");
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
      <div className="bg-white-100 p-5 rounded-xl dark:bg-black-200 dark:text-white-100 row-span-2 min-w-full">
        <span className="my-3 text-xl font-bold flex justify-center">
          Add New Category
        </span>

        <form
          onSubmit={addCategoryHandler}
          className="w-full mx-auto p-4 bg-white rounded-lg"
        >
          <div
            className={` grid grid-cols-1 gap-4 mt-4 ${
              isLoading && "opacity-20"
            }`}
          >
            <div>
              <div>
                <label htmlFor="name" className="block font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="category name"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
                  onChange={setNewCategoryHandler}
                  value={newCategory?.name}
                  onFocus={() => setServerErrors("")}
                />

                <p className="text-red-700">{serverErrors?.name}</p>
              </div>
            </div>

            <div className="mt-3">
              <div>
                <label htmlFor="code" className="block font-medium">
                  Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  placeholder="category code"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
                  onChange={setNewCategoryHandler}
                  value={newCategory?.code}
                  onBlur={() => setServerErrors("")}
                  onFocus={() => setServerErrors("")}
                />

                <p className="text-red-700">{serverErrors?.code}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className={` bg-blue-600 text-white-100 w-full py-2 rounded-xl ${
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
