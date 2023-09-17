import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const addFile = async (data) => {
    const formData = new FormData();
    formData.append("fileUrl", data.image[0]);
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
        reset();
        fetchData();
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

      setLoading(false);
    }
  };
  return (
    <form>
      <div className={` mt-10 p-5 rounded-xl ${isLoading && "opacity-20  "} `}>
        <label htmlFor="image" className="block text-center font-bold text-lg">
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
          className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2"
          onClick={handleSubmit(addFile)}
        >
          {isLoading ? <FormSpinner /> : "Add Product File"}
        </button>
      </div>
    </form>
  );
}
