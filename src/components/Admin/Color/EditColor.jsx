import React, { useEffect, useState } from "react";
import adminAxios from "../../../services/Axios/adminInterceptors";
import FormSpinner from "../../FormSpinner/FormSpinner";
import useFetch from "../../../hooks/useFetch";
import ReactDOM from "react-dom";
import Input from "../Input";
import toast from "react-hot-toast";
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
      <div className="md:w-1/3 sm:w-2/3 w-5/6 bg-white-100 dark:bg-black-200 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center dark:text-white-100">
          Edit Color
        </span>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full mx-auto bg-white rounded-lg"
        >
          <div
            className={` grid grid-cols-1 gap-4 mt-4 dark:text-white-100 ${
              isLoading && "opacity-20"
            }`}
          >
            <div>
              <Input
                labelText="Color Name"
                placeholder="name"
                name="name"
                value={editColor?.name}
                onChange={setEditColorHandler}
                className="2xl:p-3 p-2 mt-1"
                Error={serverErrors?.name}
                callback={() => setServerErrors("")}
              />
            </div>

            <div>
              <Input
                labelText="Color Code"
                placeholder="code"
                name="code"
                value={editColor?.code}
                onChange={setEditColorHandler}
                className="2xl:p-3 p-2 mt-1"
                Error={serverErrors?.code}
                callback={() => setServerErrors("")}
              />
            </div>

            <div>
              <Input
                labelText="Color Hex"
                placeholder="hex"
                name="colorHex"
                value={editColor?.colorHex}
                onChange={setEditColorHandler}
                className="2xl:p-3 p-2 mt-1"
                Error={serverErrors?.colorHex}
                callback={() => setServerErrors("")}
              />
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
              className=" w-full py-2 rounded-xl border border-blue-600 ml-2 dark:text-white-100"
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
