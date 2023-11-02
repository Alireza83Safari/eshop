import React, { useState } from "react";
import userAxios from "../../../../services/Axios/userInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import toast from "react-hot-toast";

export default function EditAppPicFile({
  setShowEditAppPicFile,
  editAppPicId,
  fetchData,
  setShowEditAppPic,
}) {
  const [image, setImage] = useState(null);
  const [serverErrors, setServerErrors] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const addFile = async (data) => {
    const formData = new FormData();
    formData.append("fileUrl", image[0]);
    setLoading(true);
    try {
      const response = await userAxios.post(
        `/file/uploadImage/${editAppPicId}/3`,
        formData
      );
      if (response.status === 200) {
        setShowEditAppPic(false);
        setLoading(false);
        fetchData();
        setShowEditAppPicFile(false);
        toast.success("Edit appPic is successfuly");
      }
    } catch (error) {
      setServerErrors(error?.response.data.message);
      switch (error.status) {
        case 403:
          {
            toast.error("You Havent Access to add image");
          }
          break;
        case 500: {
          toast.error("please try again later");
        }
        default:
          break;
      }

      setLoading(false);
    }
  };

  const imageHandler = (e) => {
    const files = e.target.files;
    setImage(files);
  };

  return (
    <form
      className="bg-white-100  dark:bg-black-200 px-4 py-2 rounded-xl"
      onSubmit={(e) => e.preventDefault()}
      method="post"
    >
      <div className={`p-5 rounded-xl ${isLoading && "opacity-20"} `}>
        <label
          htmlFor="image"
          className="block text-center font-bold text-xl dark:text-white-100"
        >
          Upload Image
        </label>
        <p className="text-xs text-red-700">{serverErrors}</p>
        <input
          type="file"
          onChange={imageHandler}
          className="mt-28 bg-white-100"
        />
      </div>
      <div className="flex justify-center mt-36">
        <button
          type="submit"
          className={`bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2 disabled:bg-gray-100 disabled:text-black-900 ${
            isLoading && "py-5"
          }`}
          onClick={addFile}
          disabled={!image}
        >
          {isLoading ? <FormSpinner /> : "Edit Product File"}
        </button>

        <button
          type="submit"
          className={`w-full py-2 rounded-xl mr-2 border text-black-900 dark:text-white-100 ${
            isLoading && "py-5"
          }`}
          onClick={() => {
            setShowEditAppPicFile(false);
            setShowEditAppPic(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
