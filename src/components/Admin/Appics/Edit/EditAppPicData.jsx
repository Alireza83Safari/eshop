import React, { useEffect, useState } from "react";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import useFetch from "../../../../hooks/useFetch";
import Spinner from "../../../Spinner/Spinner";
import Input from "../../Input";

export default function EditAppPicData({
  editAppPicId,
  setShowEditAppPicData,
  fetchData,
  setShowEditAppPicFile,
  setShowEditAppPic,
}) {
  const [editAppPic, setEditAppPic] = useState({
    appPicType: 1,
    description: "",
    priority: 0,
    title: "",
    url: "",
  });
  const [serverErrors, setServerErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const editAppPicHandler = async () => {
    setLoading(true);
    try {
      const response = await adminAxios.post(`/appPic/edit/${editAppPicId}`, {
        ...editAppPic,
        priority: Number(editAppPic?.priority),
      });
      if (response.status == 200) {
        setShowEditAppPicData(false);
        setLoading(false);
        setShowEditAppPicFile(true);
        setServerErrors("");
        fetchData();
      }
    } catch (error) {
      setServerErrors(error?.response?.data?.errors);
      setLoading(false);
    }
  };
  const { datas, isLoading: appPicLoading } = useFetch(
    `/appPic/${editAppPicId}`,
    adminAxios
  );
  useEffect(() => {
    setEditAppPic({
      url: datas?.url,
      description: datas?.description,
      priority: datas?.priority,
      title: datas?.title,
      appPicType: datas?.appPicType,
    });
  }, [datas]);

  const setEditAppPicHandler = (event) => {
    setEditAppPic({
      ...editAppPic,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <span className="my-2 text-xl font-bold flex justify-center  dark:text-white-100">
        Edit AppPic
      </span>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full mx-auto relative rounded-lg"
      >
        {appPicLoading ? (
          <Spinner />
        ) : (
          <div
            className={` grid grid-cols-2 gap-4 mt-4 dark:text-white-100 ${
              isLoading && "opacity-20"
            }`}
          >
            <div>
              <Input
                labelText="url"
                placeholder="AppPic url"
                name="url"
                value={editAppPic?.url}
                onChange={setEditAppPicHandler}
                className="2xl:p-3 p-2 mt-1"
                Error={serverErrors?.url}
                callback={() => setServerErrors("")}
              />
            </div>

            <div>
              <Input
                labelText="priority"
                placeholder="AppPic priority"
                name="priority"
                value={editAppPic?.priority}
                onChange={setEditAppPicHandler}
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
                value={editAppPic?.title}
                onChange={setEditAppPicHandler}
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
                value={editAppPic?.description}
                onChange={setEditAppPicHandler}
                className="2xl:p-3 p-2 mt-1"
                Error={serverErrors?.description}
                callback={() => setServerErrors("")}
              />
            </div>
          </div>
        )}

        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className={`bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2 ${
              isLoading && "py-5"
            }`}
            onClick={editAppPicHandler}
          >
            {isLoading ? <FormSpinner /> : "Edit AppPic"}
          </button>
          <button
            type="submit"
            className="w-full py-2 rounded-xl border border-blue-600 ml-2 dark:text-white-100"
            onClick={() => {
              setShowEditAppPic(false);
              setShowEditAppPicData(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
