import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import ProductsPanelContext from "../../../Context/ProductsPanelContext";
import adminAxios from "../../../services/Axios/adminInterceptors";
import FormSpinner from "../../FormSpinner/FormSpinner";

export default function AddCategory() {
  const { showAddCategory, setShowAddCategory } =
    useContext(ProductsPanelContext);

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
        setShowAddCategory(false);
        setLoading(false);
        setNewCategory({
          code: "",
          name: "",
        });

        setServerErrors("");
      }
    } catch (error) {
      console.log(error);
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

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showAddCategory ? "visible" : "invisible"
      }`}
    >
      <div className="w-1/3  bg-white-100 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Add New Category
        </span>

        <form
          onSubmit={addCategoryHandler}
          className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg"
        >
          <div
            className={` grid grid-cols-1 gap-4 mt-4 ${
              isLoading && "opacity-20"
            }`}
          >
            <div className="">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-800 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="category name"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  onChange={setNewCategoryHandler}
                  value={newCategory?.name}
                  onFocus={() => setServerErrors("")}
                />

                <p className="text-red-700">{serverErrors?.name}</p>
              </div>
            </div>

            <div className="">
              <div>
                <label
                  htmlFor="code"
                  className="block text-gray-800 font-medium"
                >
                  Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  placeholder="category code"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  onChange={setNewCategoryHandler}
                  value={newCategory?.code}
                  onBlur={() => setServerErrors("")}
                  onFocus={() => setServerErrors("")}
                />

                <p className="text-red-700">{serverErrors?.code}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white-100 w-full py-2 rounded-xl"
            >
              {isLoading ? <FormSpinner /> : "Add Category"}
            </button>
            <button
              type="submit"
              className=" w-full py-2 rounded-xl border border-blue-600"
              onClick={() => setShowAddCategory(false)}
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
