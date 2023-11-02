import React, { useState, useContext } from "react";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";
import userAxios from "../../../../services/Axios/userInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function EditProductFile({ setShowEditFile }) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const { setShowEditModal, editProductID } = useContext(ProductsPanelContext);
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
        `/file/uploadImage/${editProductID}/1`,
        formData
      );
      if (response.status === 200) {
        setIsLoading(false);
        setShowEditFile(false);
        setShowEditModal(false);
        toast.success("edit product is successfully");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setServerError("You haven't access to add an image");
      } else if (error?.response.data.message) {
        setServerError(error.response.data.message);
      } else {
        setServerError("An error occurred while uploading the file.");
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
    <>
      <div>
        <h2 className="text-center mb-4 dark:text-white-100 text-lg font-bold">
          Upload images
        </h2>
        <span className="text-center text-red-700">{serverError}</span>
        <div className="grid grid-cols-4">
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
        <div className="flex flex-wrap"></div>
        <form
          method="post"
          className="flex justify-center container absolute bottom-24 dark:text-white-100"
        >
          <input type="file" onChange={handleImageChange} multiple />
        </form>
      </div>

      <div className="grid grid-cols-2 w-full px-4 absolute bottom-5">
        <button
          type="submit"
          className="bg-blue-600 text-white-100 py-2 rounded-xl outline-none mr-2"
          onClick={addFile}
        >
          {isLoading ? <FormSpinner /> : "Add Product Files"}
        </button>
        <button
          type="submit"
          className="py-2 rounded-xl border border-blue-600 outline-none ml-2 dark:text-white-100"
          onClick={() => {
            setShowEditFile(false);
            setShowEditModal(false);
          }}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
