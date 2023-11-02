import React, { useState } from "react";
import adminAxios from "../../../services/Axios/adminInterceptors";
import FormSpinner from "../../FormSpinner/FormSpinner";
import Input from "../Input";
import useAccess from "../../../hooks/useAccess";
import toast, { Toaster } from "react-hot-toast";
export default function AddCategory({ fetchData }) {
  const [newCategory, setNewCategory] = useState({
    code: "",
    name: "",
  });
  const [serverErrors, setServerErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const { userHaveAccess } = useAccess("action_category_admin_create");

  const addCategoryHandler = async (e) => {
    if (userHaveAccess) {
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
    } else {
      toast.error("You Havent Access Create Category");
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
      <div className="bg-white-100 sm:p-4 p-2 rounded-xl dark:bg-black-200 2xl:h-[33rem] dark:text-white-100 row-span-2 min-w-full mt-6 lg:mb-0 mb-5">
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
              <Input
                labelText="name"
                placeholder="category name"
                name="name"
                className="2xl:p-3 p-2 mt-1"
                value={newCategory?.name}
                onChange={setNewCategoryHandler}
                Error={serverErrors?.name}
                callback={() => setServerErrors("")}
              />
            </div>

            <div className="mt-3">
              <Input
                labelText="code"
                placeholder="category code"
                name="code"
                className="2xl:p-3 p-2 mt-1"
                value={newCategory?.code}
                onChange={setNewCategoryHandler}
                Error={serverErrors?.code}
                callback={() => setServerErrors("")}
              />
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
      <Toaster />
    </>
  );
}
