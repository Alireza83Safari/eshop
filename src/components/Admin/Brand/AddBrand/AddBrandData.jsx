import React, { useState } from "react";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import Input from "../../Input";
import useAccess from "../../../../hooks/useAccess";
import toast from "react-hot-toast";

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

  const { userHaveAccess: userHaveAccessEdit } = useAccess(
    "action_brand_admin_create"
  );

  const addNewBrandHandler = async (e) => {
    e.preventDefault();
    if (userHaveAccessEdit) {
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
    } else {
      toast.error("You Havent Access Delete Brand");
    }
  };

  return (
    <>
      <span className="my-3 font-bold flex justify-center 2xl:text-2xl sm:text-xl text-[16px]">
        Add New Brand
      </span>

      <form
        onSubmit={addNewBrandHandler}
        className="w-full mx-auto sm:p-4 p-1 bg-white rounded-lg sm:text-base text-sm"
      >
        <div
          className={` grid grid-cols-1 sm:text-base text-sm gap-4 2xl:gap-y-7 mt-4 2xl:mt-5 ${
            isLoading && "opacity-20"
          }`}
        >
          <div>
            <Input
              labelText="name"
              placeholder="Brand name"
              name="name"
              className="2xl:p-3 p-2 mt-1"
              value={newBrand?.name}
              onChange={setNewBrandHandler}
              Error={serverErrors?.name}
              callback={() => setServerErrors("")}
            />
          </div>

          <div>
            <Input
              labelText="code"
              placeholder="Brand code"
              name="code"
              className="2xl:p-3 p-2 mt-1"
              value={newBrand?.code}
              onChange={setNewBrandHandler}
              Error={serverErrors?.code}
              callback={() => setServerErrors("")}
            />
          </div>
        </div>

        <div className="flex justify-center sm:mt-10 mt-7 sm:mb-0 sm:text-base text-sm 2xl:mt-16">
          <button
            type="submit"
            className={`bg-blue-600 text-white-100 w-full p-2 2xl:p-3 rounded-xl ${
              isLoading ? "py-5" : `py-2`
            }`}
          >
            {isLoading ? <FormSpinner /> : "Add Brand"}
          </button>
        </div>
      </form>
    </>
  );
}
