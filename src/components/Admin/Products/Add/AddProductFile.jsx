import React, { useState, useContext } from "react";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";
import userAxios from "../../../../services/Axios/userInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function AddProductFile({ setShowFile }) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const { setShowAddProductModal, newProductId } =
    useContext(ProductsPanelContext);
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
        `/file/uploadImage/${newProductId}/1`,
        formData
      );
      if (response.status === 200) {
        setIsLoading(false);
        setShowFile(false);
        setShowAddProductModal(false);
        toast.success("create product is successfully");
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
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <h2 className="text-center mb-4">Upload images</h2>
          <span className="text-center text-red-700">{serverError}</span>
          {showUrl?.length ? (
            <div className="relative grid grid-cols-4">
              {showUrl?.map((imageUrl, index) => (
                <div key={index} className="w-ful p-2 relative">
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
            className="flex justify-center container absolute bottom-24"
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
          <button
            type="submit"
            className="w-11/12 py-2 rounded-xl border border-blue-600 md:mx-5 mx-2 outline-none"
            onClick={() => {
              setShowFile(false);
              setShowAddProductModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
