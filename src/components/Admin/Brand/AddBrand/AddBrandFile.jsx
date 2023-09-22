import React, { useState } from "react";
import userAxios from "../../../../services/Axios/userInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { toast } from "react-toastify";

export default function AddBrandFile({
  addBrandId,
  setShowAddBrandFile,
  setShowAddBrand,
  fetchData,
}) {
  const [isLoading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState([]);
  const [errors, setErrors] = useState(null);
  const addFile = async () => {
    const formData = new FormData();
    formData.append("fileUrl", imageURL[0]);
    setLoading(true);

    try {
      const response = await userAxios.post(
        `/file/uploadImage/${addBrandId}/2`,
        formData
      );
      if (response.status === 200) {
        setShowAddBrandFile(false);
        setShowAddBrand(true);
        setLoading(false);
        toast.success("add brand is successfuly");
        fetchData();
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

      setLoading(false);
    }
  };
  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      setImageURL(files);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className={`p-5 rounded-xl ${isLoading && "opacity-20  "} `}>
        <label
          htmlFor="image"
          className="block text-center font-bold text-lg 2xl:text-xl"
        >
          Upload Image
        </label>
        <form method="post" className="mt-32">
          <div className="flex justify-center">
            <input
              type="file"
              onChange={handleImageChange}
              onClick={() => setErrors("")}
            />
          </div>
        </form>
        <p className="text-red-700 text-xs">{errors}</p>
      </div>
      <div className="flex justify-center mt-20">
        <button
          type="submit"
          className={`bg-blue-600 text-white-100 w-full 2xl:p-3 py-2 rounded-xl mr-2 2xl:mt-28 ${
            isLoading && "py-5"
          }`}
          onClick={addFile}
        >
          {isLoading ? <FormSpinner /> : "Add Brand File"}
        </button>
      </div>
    </form>
  );
}
