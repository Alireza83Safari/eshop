import React, { useState } from "react";
import adminAxios from "../../../services/Axios/adminInterceptors";
import FormSpinner from "../../FormSpinner/FormSpinner";
import { toast } from "react-toastify";
import Input from "../Input";

export default function AddColor() {
  const [isLoading, setLoading] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
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
        setServerErrors("");
        setShowColorPicker(false);
        setNewColor({
          code: "",
          name: "",
          colorHex: "",
        });
      }
    } catch (error) {
      setServerErrors(error?.response?.data?.errors);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white-100 p-2 rounded-xl dark:bg-black-200 dark:text-white-100 min-w-full 2xl:h-[33rem]">
      <span className="my-3 font-bold flex justify-center 2xl:text-2xl sm:text-xl text-[16px]">
        Add New Color
      </span>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="min-w-full mx-auto sm:p-4 p-1 rounded-lg"
      >
        <div
          className={` grid grid-cols-1 sm:gap-4 sm:mt-4 sm:text-base text-sm ${
            isLoading && "opacity-20"
          }`}
        >
          <div className="relative flex items-center border p-2 rounded-lg">
            <label
              htmlFor="name"
              className="text-gray-800 dark:text-white-100 font-medium text-sm mr-5"
            >
              Select your color
              <span className="text-red-700">*</span>
            </label>
            <input
              type="color"
              placeholder="hex"
              name="colorHex"
              value={newColor?.colorHex}
              onChange={setNewColorHandler}
              className="2xl:p-3 p-2 border mr-4"
              Error={serverErrors?.colorHex}
              onFocus={() => setServerErrors("")}
            />
            <p className="text-sm">
              {newColor?.colorHex ? newColor?.colorHex : null}
            </p>
          </div>
          <div className="mt-3">
            <Input
              labelText="Color Name"
              placeholder="name"
              name="name"
              value={newColor?.name}
              onChange={setNewColorHandler}
              className="2xl:p-3 p-2 mt-1"
              Error={serverErrors?.name}
              callback={() => setServerErrors("")}
            />
          </div>

          <div className="mt-3">
            <Input
              labelText="Color Code"
              placeholder="code"
              name="code"
              value={newColor?.code}
              onChange={setNewColorHandler}
              className="2xl:p-3 p-2 mt-1"
              Error={serverErrors?.code}
              callback={() => setServerErrors("")}
            />
          </div>
        </div>

        <div className="flex justify-center sm:mt-10 mt-7 sm:mb-0 mb-4 sm:text-base text-sm">
          <button
            type="submit"
            className={`bg-blue-600 text-white-100 w-full 2xl:p-3 p-2 rounded-xl outline-none ${
              isLoading && "py-5"
            }`}
            onClick={addNewColorHandler}
          >
            {isLoading ? <FormSpinner /> : "Add Color"}
          </button>
        </div>
      </form>
    </div>
  );
}
