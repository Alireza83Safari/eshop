import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import adminAxios from "../../../services/Axios/adminInterceptors";
import FormSpinner from "../../FormSpinner/FormSpinner";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-toastify";
import Spinner from "../../Spinner/Spinner";

export default function EditCategory({
  showEditCategory,
  setShowEditCategory,
  categoryEditId,
  fetchData,
}) {
  const [editCategory, setEditCategory] = useState({
    code: "",
    name: "",
  });
  const [serverErrors, setServerErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const editCategoy = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await adminAxios.post(
        `/category/edit/${categoryEditId}`,
        editCategory
      );
      if (response.status === 200) {
        fetchData();
        toast.success("edit ctaedory is successfuly");
        setShowEditCategory(false);
        setLoading(false);
        setEditCategory({
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
  const { datas, isLoading: categoryLoading } = useFetch(
    `/category/${categoryEditId}`,
    adminAxios
  );

  useEffect(() => {
    setEditCategory({ name: datas?.name, code: datas?.code });
  }, [datas]);

  const setEditCategoryHandler = (event) => {
    setEditCategory({
      ...editCategory,
      [event.target.name]: event.target.value,
    });
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showEditCategory ? "visible" : "invisible"
      }`}
    >
      <div className="w-1/3  bg-white-100  p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Edit Category
        </span>

        {isLoading || categoryLoading ? (
          <Spinner />
        ) : (
          <form
            onSubmit={(e) => e.preventDefault()}
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
                    onChange={setEditCategoryHandler}
                    value={editCategory?.name}
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
                    onChange={setEditCategoryHandler}
                    value={editCategory?.code}
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
                className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2"
                onClick={editCategoy}
              >
                {isLoading ? <FormSpinner /> : "Add Category"}
              </button>
              <button
                type="submit"
                className=" w-full py-2 rounded-xl border border-blue-600 ml-2"
                onClick={() => setShowEditCategory(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
