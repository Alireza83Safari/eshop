import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../../Spinner/Spinner";
import ReactDOM from "react-dom";
import userAxios from "../../../services/Axios/userInterceptors";

export default function AddAppPicFile({ appPicId, setShowFileAppPic }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const AddAppicFileHandler = async (data) => {
    const formData = new FormData();
    formData.append("fileUrl", data.image[0]);
    setIsLoading(true);
    try {
      const response = await userAxios.post(
        `/file/uploadImage/${appPicId}/3`,
        formData
      );
      if (response.status === 200) {
        setShowFileAppPic(false);
        reset();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };
  return ReactDOM.createPortal(
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400">
      <div className="lg:w-2/5 md:w-3/5 w-4/5 bg-white-100 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Add AppPic File
        </span>

        <form onSubmit={handleSubmit(AddAppicFileHandler)}>
          <div
            className={` grid grid-cols-1 gap-2 mt-2 ${
              isLoading && "opacity-30"
            } `}
          >
            <label htmlFor="image" className="block text-gray-800 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
              {...register("image", {
                required: "please add your image",
                validate: {
                  acceptedFormats: (value) => {
                    const acceptedFormats = ["image/jpeg", "image/png"];
                    return (
                      acceptedFormats.includes(value[0]?.type) ||
                      "Only JPG or PNG formats are allowed"
                    );
                  },
                },
              })}
            />
            {errors.image && (
              <p className="text-red-700">{errors.image.message}</p>
            )}
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className={` bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2 ${
                isLoading && "bg-gray-200"
              }`}
            >
              {isLoading ? <Spinner /> : "Add AppPic"}
            </button>
            <button
              type="submit"
              className="w-full py-2 rounded-xl border border-blue-600 ml-2"
              onClick={() => setShowFileAppPic(false)}
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
