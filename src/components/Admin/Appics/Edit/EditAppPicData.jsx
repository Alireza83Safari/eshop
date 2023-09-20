import React, { useEffect, useState } from "react";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import useFetch from "../../../../hooks/useFetch";
import Spinner from "../../../Spinner/Spinner";

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
              <label htmlFor="url" className="block font-medium">
                url
              </label>
              <input
                type="text"
                id="url"
                name="url"
                placeholder="AppPic url"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
                onChange={setEditAppPicHandler}
                value={editAppPic?.url}
                onBlur={() => setServerErrors("")}
                onFocus={() => setServerErrors("")}
              />

              <p className="text-red-700">{serverErrors?.url}</p>
            </div>

            <div>
              <label htmlFor="priority" className="block font-medium">
                priority
              </label>
              <input
                type="number"
                id="priority"
                name="priority"
                placeholder="AppPic priority"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
                onChange={setEditAppPicHandler}
                value={editAppPic?.priority}
                onBlur={() => setServerErrors("")}
                onFocus={() => setServerErrors("")}
              />

              <p className="text-red-700">{serverErrors?.priority}</p>
            </div>

            <div className="col-span-2">
              <div>
                <label htmlFor="title" className="block font-medium">
                  title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="AppPic title"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
                  onChange={setEditAppPicHandler}
                  value={editAppPic?.title}
                  onFocus={() => setServerErrors("")}
                />

                <p className="text-red-700">{serverErrors?.title}</p>
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="description" className="block font-medium">
                description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                placeholder="AppPic description"
                className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600 dark:bg-black-200"
                onChange={setEditAppPicHandler}
                value={editAppPic?.description}
                onBlur={() => setServerErrors("")}
                onFocus={() => setServerErrors("")}
              />

              <p className="text-red-700">{serverErrors?.description}</p>
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
