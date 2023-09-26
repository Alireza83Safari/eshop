import React, { useState } from "react";
import userAxios from "../../../services/Axios/userInterceptors";
import FormSpinner from "../../FormSpinner/FormSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function ProductImage({ infosId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const [imageURLs, setImageURLs] = useState([]);
  const [showUrl, setShowUrl] = useState([]);

  const addFile = async () => {
    if (imageURLs.length === 0) {
      setServerError("Please select at least one file.");
      return;
    }

    const formData = new FormData();
    imageURLs.forEach((img) => formData.append(`fileUrl`, img));
    try {
      const response = await userAxios.post(
        `/file/uploadImage/${infosId}/1`,
        formData
      );
      if (response.status === 200) {
        setIsLoading(false);
        toast.success("create product is successfully");
        setImageURLs("");
        setShowUrl("");
      }
    } catch (error) {
      setServerError(error?.response.data.message);
      if (error.response && error.response.status === 403) {
        setServerError("You haven't access to add an image");
      }
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const formData = new FormData();
      const newImageURLs = Array.from(files).map((file, index) => {
        formData.append(`file-${index}`, file);
        const imageUrl = URL.createObjectURL(file);
        return imageUrl;
      });
      setImageURLs((prevImageURLs) => [...prevImageURLs, ...Array.from(files)]);
      setShowUrl((prev) => [...prev, ...newImageURLs]);
    }
  };

  const deleteImage = (index) => {
    const newImageURLs = [...imageURLs];
    const newShowUrl = [...showUrl];

    newImageURLs.splice(index, 1);
    newShowUrl.splice(index, 1);

    setImageURLs(newImageURLs);
    setShowUrl(newShowUrl);
  };

  return (
    <div className="lg:w-[46rem] min-h-[34rem] max-w-10/12 bg-white-100 dark:bg-black-200  p-5 rounded-xl relative">
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <h2 className="text-center mb-4 dark:text-white-100">
            Upload images
          </h2>
          <span className="text-center text-red-700">{serverError}</span>
          {showUrl?.length ? (
            <div className="relative grid grid-cols-4">
              {showUrl?.map((imageUrl, index) => (
                <div key={imageUrl} className="w-ful p-2 relative">
                  <img
                    src={imageUrl}
                    className="mb-4 border w-96 h-44 object-contain"
                  />
                  <button
                    className="absolute top-2 right-2 text-red-700 p-1 rounded-full cursor-pointer"
                    onClick={() => deleteImage(index)}
                  >
                    <FontAwesomeIcon icon={faX} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <img
                src="/images/empty.jpg"
                className=" object-contain h-72 rounded-xl"
              />
            </div>
          )}
          <form
            method="post"
            className="flex justify-center container absolute bottom-24 dark:text-white-100"
          >
            <input type="file" onChange={handleImageChange} multiple />
          </form>
        </div>

        <div className="flex justify-center w-full absolute bottom-4">
          <button
            type="submit"
            className="bg-blue-600 text-white-100 w-full py-2 md:mx-5 mx-2 rounded-xl outline-none"
            onClick={addFile}
          >
            {isLoading ? <FormSpinner /> : "Add Product Files"}
          </button>
        </div>
      </form>
    </div>
  );
}
