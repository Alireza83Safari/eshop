import React, { useState } from "react";
import userAxios from "../../../../services/Axios/userInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { toast } from "react-toastify";

export default function AddAppPicFile({
  addAppPicId,
  setShowAddAppPicFile,
  setShowAddAppPic,
  fetchData,
}) {
  const [isLoading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState(false);
  const [image, setImage] = useState(null);

  const addFile = async () => {
    const formData = new FormData();
    formData.append("fileUrl", image[0]);
    setLoading(true);
    try {
      const response = await userAxios.post(
        `/file/uploadImage/${addAppPicId}/3`,
        formData
      );
      if (response.status === 200) {
        setShowAddAppPicFile(false);
        setShowAddAppPic(true);
        setLoading(false);
        toast.success("add appPic is successfuly");
        fetchData();
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
    <form method="post" onSubmit={(e) => e.preventDefault()}>
      <div className={`p-5 rounded-xl ${isLoading && "opacity-20"} `}>
        <label htmlFor="image" className="block text-center font-bold text-lg">
          Upload Image
        </label>
        <p className="text-xs text-red-700">{serverErrors}</p>
        <input type="file" onChange={imageHandler} className="mt-28" />
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
          {isLoading ? <FormSpinner /> : "Add AppPic File"}
        </button>
      </div>
    </form>
  );
}
