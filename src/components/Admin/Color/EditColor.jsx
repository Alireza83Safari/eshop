import React, { useEffect, useState } from "react";
import adminAxios from "../../../services/Axios/adminInterceptors";
import FormSpinner from "../../FormSpinner/FormSpinner";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";
export default function EditColor({
  colorEditId,
  fetchData,
  setShowEditColor,
}) {
  const [editColor, setEditColor] = useState({
    code: "",
    name: "",
    colorHex: "",
  });
  const [serverErrors, setServerErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const editColorHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await adminAxios.post(
        `/color/edit/${colorEditId?.id}`,
        editColor
      );
      if (response.status == 200) {
        setShowEditColor(false);
        toast.success("edit color is successfuly");
        setLoading(false);
        setEditColor({
          code: "",
          name: "",
        });
        setServerErrors("");
        fetchData();
      }
    } catch (error) {
      setServerErrors(error?.response?.data?.errors);
      setLoading(false);
    }
  };
  const { datas } = useFetch(`/color/${colorEditId?.id}`, adminAxios);

  useEffect(() => {
    setEditColor({
      name: datas?.name,
      code: datas?.code,
      colorHex: datas?.colorHex,
    });
  }, [datas]);

  const setEditColorHandler = (event) => {
    setEditColor({
      ...editColor,
      [event.target.name]: event.target.value,
    });
  };

  return ReactDOM.createPortal(
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400">
      <div className="w-1/3  bg-white-100  p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Edit Color
        </span>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-sm mx-auto bg-white rounded-lg"
        >
          <div
            className={` grid grid-cols-1 gap-4 mt-4 ${
              isLoading && "opacity-20"
            }`}
          >
            <div>
              <label htmlFor="name" className="block text-gray-800 font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="color name"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                onChange={setEditColorHandler}
                value={editColor?.name}
                onFocus={() => setServerErrors("")}
              />

              <p className="text-red-700">{serverErrors?.name}</p>
            </div>

            <div>
              <label htmlFor="code" className="block text-gray-800 font-medium">
                Code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                placeholder="color code"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                onChange={setEditColorHandler}
                value={editColor?.code}
                onBlur={() => setServerErrors("")}
                onFocus={() => setServerErrors("")}
              />

              <p className="text-red-700">{serverErrors?.code}</p>
            </div>

            <div>
              <label
                htmlFor="colorHex"
                className="block text-gray-800 font-medium"
              >
                colorHex
              </label>
              <input
                type="text"
                id="colorHex"
                name="colorHex"
                placeholder="colorHex"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                onChange={setEditColorHandler}
                value={editColor?.colorHex}
                onBlur={() => setServerErrors("")}
                onFocus={() => setServerErrors("")}
              />

              <p className="text-red-700">{serverErrors?.colorHex}</p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2"
              onClick={editColorHandler}
            >
              {isLoading ? <FormSpinner /> : "Edit Color"}
            </button>
            <button
              type="submit"
              className=" w-full py-2 rounded-xl border border-blue-600 ml-2"
              onClick={() => setShowEditColor(false)}
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
