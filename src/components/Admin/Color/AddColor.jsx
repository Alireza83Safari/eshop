import React, { useState } from "react";
import adminAxios from "../../../services/Axios/adminInterceptors";
import FormSpinner from "../../FormSpinner/FormSpinner";
import { toast } from "react-toastify";
import { HexColorPicker } from "react-colorful";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

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
          <div className="mt-3">
            <label htmlFor="name" className="block font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="color name"
              className="border 2xl:p-3 p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
              onChange={setNewColorHandler}
              value={newColor?.name}
              onFocus={() => setServerErrors("")}
            />

            <p className="text-red-700">{serverErrors?.name}</p>
          </div>
          <div className="relative mt-3">
            <label htmlFor="colorHex" className="block font-medium">
              Color Hex
            </label>
            <input
              type="text"
              id="colorHex"
              name="colorHex"
              placeholder="colorHex"
              className="border 2xl:p-3 p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
              onChange={setNewColorHandler}
              value={newColor?.colorHex}
              onBlur={() => setServerErrors("")}
              onFocus={() => setServerErrors("")}
            />
            <button
              className=" absolute right-0 top-9"
              onClick={() => setShowColorPicker(true)}
            >
              color picker
            </button>
            <div
              className={`absolute right-0 top-1  ${
                showColorPicker ? "visible" : "invisible"
              }`}
            >
              <FontAwesomeIcon
                icon={faX}
                className="text-lg"
                onClick={() => setShowColorPicker(false)}
              />
              <HexColorPicker
                color={newColor.colorHex}
                onChange={(color) =>
                  setNewColor({
                    ...newColor,
                    colorHex: color,
                  })
                }
              />
            </div>
            <p className="text-red-700">{serverErrors?.colorHex}</p>
          </div>
          <div className="mt-3">
            <label htmlFor="code" className="block font-medium">
              Code
            </label>
            <input
              type="text"
              id="code"
              name="code"
              placeholder="color code"
              className="border 2xl:p-3 p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
              onChange={setNewColorHandler}
              value={newColor?.code}
              onBlur={() => setServerErrors("")}
              onFocus={() => setServerErrors("")}
            />

            <p className="text-red-700">{serverErrors?.code}</p>
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
