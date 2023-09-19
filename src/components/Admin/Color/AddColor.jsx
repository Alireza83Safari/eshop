import React, { useState } from "react";
import adminAxios from "../../../services/Axios/adminInterceptors";
import FormSpinner from "../../FormSpinner/FormSpinner";
import { toast } from "react-toastify";

export default function AddColor() {
  const [isLoading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(false);
  const [newColor, setNewColor] = useState({
    code: "",
    name: "",
    colorHex: "",
  });
  const setNewColorHandler = (event) => {
    setNewColor({
      ...newColor,
      [event.target.name]: event.target.value,
    });
  };
  const addNewColorHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await adminAxios.post("/color", newColor);

      if (response.status == 200) {
        setLoading(false);
        toast.success("color is created");
        setNewColor({
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
    <div className="bg-white-100 rounded-xl dark:bg-black-200 dark:text-white-100">
      <span className="my-3 text-xl font-bold flex justify-center">
        Add New Color
      </span>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full mx-auto p-4 bg-white rounded-lg"
      >
        <div
          className={` grid grid-cols-1 gap-4 mt-4 ${
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
              placeholder="color name"
              className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
              onChange={setNewColorHandler}
              value={newColor?.name}
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
              placeholder="color code"
              className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
              onChange={setNewColorHandler}
              value={newColor?.code}
              onBlur={() => setServerErrors("")}
              onFocus={() => setServerErrors("")}
            />

            <p className="text-red-700">{serverErrors?.code}</p>
          </div>

          <div>
            <label htmlFor="colorHex" className="block font-medium">
              Color Hex
            </label>
            <input
              type="text"
              id="colorHex"
              name="colorHex"
              placeholder="colorHex"
              className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
              onChange={setNewColorHandler}
              value={newColor?.colorHex}
              onBlur={() => setServerErrors("")}
              onFocus={() => setServerErrors("")}
            />

            <p className="text-red-700">{serverErrors?.colorHex}</p>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="bg-blue-600 text-white-100 w-full py-2 rounded-xl outline-none"
            onClick={addNewColorHandler}
          >
            {isLoading ? <FormSpinner /> : "Add Color"}
          </button>
        </div>
      </form>
    </div>
  );
}
