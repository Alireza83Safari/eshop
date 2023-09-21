import React, { useState } from "react";
import userAxios from "../../../../services/Axios/userInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { toast } from "react-toastify";

export default function EditBrandFile({
  setShowEditBrandFile,
  brandEditId,
  setShowEditBrand,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [imageURL, setImageURL] = useState([]);
  const [errors, setErrors] = useState(null);

  const addFile = async () => {
    const formData = new FormData();
    formData.append("fileUrl", imageURL[0]);
    setIsLoading(true);

    try {
      const response = await userAxios.post(
        `/file/uploadImage/${brandEditId?.id}/2`,
        formData
      );
      if (response.status === 200) {
        setShowEditBrand(false);
        setIsLoading(false);
        setShowEditBrandFile(false);
        toast.success("edit brand is successfuly");
      }
    } catch (error) {
      setErrors(error?.response?.data?.message);
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

      setIsLoading(false);
    }
  };
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      setImageURL(files);
    }
  };
  return (
    <form
      className="bg-white-100 px-4 py-2 rounded-xl"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={` bg-white-100 ${isLoading && "opacity-20  "} `}>
        <label htmlFor="image" className="block text-center font-bold text-lg">
          Upload Image
        </label>
        <form method="post" className="mt-32">
          <input
            type="file"
            onChange={handleImageChange}
            onClick={() => setErrors("")}
          />
        </form>
        <p className="text-red-700 text-xs">{errors}</p>
      </div>
      <div className="flex justify-center mt-20">
        <button
          type="submit"
          className={`bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2 ${
            isLoading && "py-5"
          }`}
          onClick={addFile}
        >
          {isLoading ? <FormSpinner /> : "Edit Brand File"}
        </button>
        <button
          type="submit"
          className="border border-blue-600 w-full py-2 rounded-xl mr-2"
          onClick={() => {
            setShowEditBrandFile(false);
            setShowEditBrand(false);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
