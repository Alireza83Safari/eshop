import React, { useState } from "react";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { toast } from "react-toastify";
import Input from "../../Input";
import useAccess from "../../../../hooks/useAccess";
export default function AddAppPicData({
  setAddAppPicId,
  setShowAddAppPic,
  setShowAddAppPicFile,
}) {
  const [isLoading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(false);

  const [newAppPic, setNewAppPic] = useState({
    appPicType: 3,
    description: "",
    priority: null,
    title: "",
    url: "",
  });
  const setNewAppPicHandler = (event) => {
    const { name, value, type } = event.target;
    setNewAppPic({
      ...newAppPic,
      [name]: type === "number" ? +value : value,
    });
  };

  const { userHaveAccess: userHaveAccessAdd } = useAccess(
    "action_app_pic_admin_create"
  );

  const addNewAppPicHandler = async (e) => {
    e.preventDefault();
    if (userHaveAccessAdd) {
      setLoading(true);
      try {
        const response = await adminAxios.post("/appPic", {
          ...newAppPic,
          priority: Number(newAppPic?.priority),
        });

        if (response.status == 200) {
          setShowAddAppPicFile(true);
          setShowAddAppPic(false);
          setAddAppPicId(response?.data?.data);
          setLoading(false);
          setServerErrors("");
        }
      } catch (error) {
        setServerErrors(error?.response?.data?.errors);
        setLoading(false);
      }
    } else {
      toast.error("You Havent Access Delete AppPic");
    }
  };

  return (
    <div>
      <span className="my-2 mt-3 font-bold flex justify-center 2xl:text-2xl sm:text-xl text-[16px]">
        Add New AppPic
      </span>

      <form
        onSubmit={addNewAppPicHandler}
        className="w-full mx-auto sm:p-4 p-1 bg-white rounded-lg sm:text-base text-sm"
      >
        <div
          className={` grid grid-cols-2 gap-4 2xl:gap-y-7 mt-4 2xl:mt-5 ${
            isLoading && "opacity-20"
          }`}
        >
          <div className="sm:col-span-1 col-span-2">
            <Input
              labelText="url"
              placeholder="AppPic url"
              name="url"
              value={newAppPic?.url}
              onChange={setNewAppPicHandler}
              className="2xl:p-3 p-2 mt-1"
              Error={serverErrors?.url}
              callback={() => setServerErrors("")}
            />
          </div>

          <div className="sm:col-span-1 col-span-2">
            <Input
              type="number"
              labelText="priority"
              placeholder="AppPic priority"
              name="priority"
              value={newAppPic?.priority}
              onChange={setNewAppPicHandler}
              className="2xl:p-3 p-2 mt-1"
              Error={serverErrors?.priority}
              callback={() => setServerErrors("")}
            />
          </div>

          <div className="col-span-2">
            <Input
              labelText="title"
              placeholder="AppPic title"
              name="title"
              value={newAppPic?.title}
              onChange={setNewAppPicHandler}
              className="2xl:p-3 p-2 mt-1"
              Error={serverErrors?.title}
              callback={() => setServerErrors("")}
            />
          </div>

          <div className="col-span-2">
            <Input
              labelText="description"
              placeholder="AppPic Description"
              name="description"
              value={newAppPic?.description}
              onChange={setNewAppPicHandler}
              className="2xl:p-3 p-2 mt-1"
              Error={serverErrors?.description}
              callback={() => setServerErrors("")}
            />
          </div>
        </div>

        <div className="flex justify-center sm:mt-8 mt-5">
          <button
            type="submit"
            className={`bg-blue-600 text-white-100 w-full  2xl:p-3 p-2  rounded-xl ${
              isLoading && "py-5"
            }`}
          >
            {isLoading ? <FormSpinner /> : "Add AppPic"}
          </button>
        </div>
      </form>
    </div>
  );
}
