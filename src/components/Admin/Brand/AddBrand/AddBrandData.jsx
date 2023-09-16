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
    <div>
      <span
        className={` my-3 text-xl font-bold flex justify-center ${
          !setShowAddBrand && "hidden"
        }`}
      >
        Add New Brand
      </span>

      <form
        onSubmit={addNewBrandHandler}
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
                placeholder="Brand name"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
                onChange={setNewBrandHandler}
                value={newBrand?.name}
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
                placeholder="Brand code"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
                onChange={setNewBrandHandler}
                value={newBrand?.code}
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
            className="bg-blue-600 text-white-100 w-full py-2 rounded-xl"
          >
            {isLoading ? <FormSpinner /> : "Add Brand"}
          </button>
        </div>
      </form>
    </div>
  );
}
