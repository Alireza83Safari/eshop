import React, { useState } from "react";
import { useForm } from "react-hook-form";
import userAxios from "../../../../services/Axios/userInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { toast } from "react-toastify";

export default function EditBrandFile({
  setShowEditBrandFile,
  brandEditId,
  setShowEditBrand,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const addFile = async (data) => {
    const formData = new FormData();
    formData.append("fileUrl", data.image[0]);
    setIsLoading(true);

    try {
      const response = await userAxios.post(
        `/file/uploadImage/${brandEditId?.id}/2`,
        formData
      );
      if (response.status === 200) {
        reset();
        setShowEditBrand(false);
        setIsLoading(false);
        setShowEditBrandFile(false);
        toast.success("add brand is successfuly");
      }
    } catch (error) {
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
  return (
    <form
      className="bg-white-100 px-4 py-2 rounded-xl"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={` bg-white-100 ${isLoading && "opacity-20  "} `}>
        <label
          htmlFor="image"
          className="block text-center font-bold text-lg mb-20"
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
        {errors.image && <p className="text-red-700">{errors.image.message}</p>}
      </div>
      <div className="flex justify-center mt-36">
        <button
          type="submit"
          className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2 outline-none"
          onClick={handleSubmit(addFile)}
        >
          {isLoading ? <FormSpinner /> : "Add Product File"}
        </button>
        <button
          type="submit"
          className="w-full py-2 rounded-xl border border-blue-600 ml-2"
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
