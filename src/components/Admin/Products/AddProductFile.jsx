import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../../Spinner/Spinner";
import ProductsPanelContext from "../../../Context/ProductsPanelContext";
import userAxios from "../../../services/Axios/userInterceptors"

export default function AddProductFile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const { setShowFile, showFile, newProductId } =
    useContext(ProductsPanelContext);
  const addFile = async (data) => {
    const formData = new FormData();
    formData.append("fileUrl", data.image[0]);
    setIsLoading(true);

    try {
      const response = await userAxios.post(
        `/file/uploadImage/${newProductId}/1`,
        formData
      );
      if (response.status === 200) {
        //fetchData();
        reset();
        setIsLoading(false);
        setShowFile(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showFile ? "visible" : "invisible"
      }`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-1/3  bg-white-100 p-5 rounded-xl">
          <form onSubmit={handleSubmit(addFile)}>
            <div>
              <label
                htmlFor="image"
                className="block text-gray-800 font-medium"
              >
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
                className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2"
              >
                Add Product
              </button>
              <button
                type="submit"
                className="w-full py-2 rounded-xl border border-blue-600 ml-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
