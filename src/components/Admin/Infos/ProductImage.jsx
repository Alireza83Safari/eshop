import React, { useEffect, useState } from "react";
import userAxios from "../../../services/Axios/userInterceptors";
import FormSpinner from "../../FormSpinner/FormSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function ProductImage({
  infosId,
  fetchProductList,
  productFile,
  setShowInfo,
  getProductFile,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [imageURLs, setImageURLs] = useState([]);
  const [newUrl, setNewUrl] = useState([]);
  const [showUrl, setShowUrl] = useState([]);

  //------- start drag drop -------////
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dropIndex, setDropIndex] = useState(null);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", `image-${index}`);
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDropIndex(index);
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || dropIndex === null) {
      return;
    }

    const draggedImageId = e.dataTransfer.getData("text/plain");
    const draggedImageIndex = parseInt(draggedImageId.split("-")[1]);

    const newShowUrl = [...showUrl];
    const newImageURLs = [...imageURLs];
    const [draggedImageUrl] = newShowUrl.splice(draggedImageIndex, 1);
    const [draggedImage] = newImageURLs.splice(draggedImageIndex, 1);
    if (draggedImageUrl) {
      let fileId = productFile.find(
        (product) => product.fileUrl == draggedImageUrl
      );

      if (fileId) {
        userAxios.post(`/file/changePriority/${fileId}/${infosId}/1`);
      }
    }

    newShowUrl.splice(index, 0, draggedImageUrl);
    newImageURLs.splice(index, 0, draggedImage);

    setShowUrl(newShowUrl);
    setImageURLs(newImageURLs);

    setDraggedIndex(null);
    setDropIndex(null);
  };

  useEffect(() => {
    const endIndices = productFile?.map((img) => img?.fileUrl);
    setShowUrl(endIndices);
  }, [productFile]);
  useEffect(() => {
    const endIndices = productFile?.map((img) => img?.fileUrl);
    setImageURLs(endIndices);
  }, []);
  //------- finish drag drop -------////

  const addFile = async () => {
    if (imageURLs.length === 0) {
      setServerError("Please select at least one file.");
      return;
    }
    const formData = new FormData();
    newUrl?.forEach((img) => formData.append(`fileUrl`, img));
    try {
      const response = await userAxios.post(
        `/file/uploadImage/${infosId}/1`,
        formData
      );

      if (response.status === 200) {
        getProductFile();
        setIsLoading(false);
        fetchProductList();
        toast.success("create product is successfully");
        setShowInfo(false);
      }
    } catch (error) {
      setServerError(error?.response.data.message);
      if (error.response && error.response.status === 403) {
        setServerError("You haven't access to add an image");
      }
      setIsLoading(false);
    }

    userAxios.post(`/file/changePriority/${productFile[0]?.id}/${infosId}/1`);
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
      setNewUrl((prevImageURLs) => [...prevImageURLs, ...Array.from(files)]);
      setShowUrl((prev) => [...prev, ...newImageURLs]);
    }
  };

  const deleteImage = async (ID, index) => {
    const newImageURLs = [...imageURLs];
    const newShowUrl = [...showUrl];

    newImageURLs.splice(index, 1);
    newShowUrl.splice(index, 1);

    setImageURLs(newImageURLs);
    setShowUrl(newShowUrl);
    let findDelete = productFile?.find((product) => product.fileUrl == ID);
    try {
      const response = await userAxios.post(`/file/delete/${findDelete?.id}`);
      if (response.status === 200) {
        getProductFile();
        toast.success("dlete is success");
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="lg:w-[46rem] max-h-[44rem] max-w-10/12 bg-white-100 dark:bg-black-200 p-5 rounded-xl overflow-auto">
        <div className="grid grid-cols-1 overflow-auto">
          <h2 className="text-center mb-4 dark:text-white-100">
            Upload images
          </h2>
          <span className="text-center text-red-700">{serverError}</span>
          {showUrl?.length ? (
            <div className="relative grid md:grid-cols-4 grid-cols-2">
              {showUrl?.map((imageUrl, index) => (
                <div key={imageUrl} className="w-ful p-2 relative">
                  <img
                    src={
                      imageUrl?.includes("uploads")
                        ? `http://127.0.0.1:6060/${imageUrl}`
                        : imageUrl
                    }
                    className="mb-4 border w-96 h-44 object-contain"
                    draggable="true"
                    id={`image-${index}`}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                  />

                  <button
                    className="absolute top-2 right-2 text-red-700 p-1 rounded-full cursor-pointer"
                    onClick={() => deleteImage(imageUrl, index)}
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
                className="object-contain h-72 rounded-xl"
              />
            </div>
          )}
          <div className="flex justify-center w-full mt-16">
            <input type="file" onChange={handleImageChange} multiple />
          </div>
          <div className="flex justify-center w-full mt-16">
            <button
              type="submit"
              className="bg-blue-600 text-white-100 w-full py-2 md:mx-5 mx-2 rounded-xl outline-none disabled:bg-gray-50"
              onClick={addFile}
              disabled={newUrl?.length < 1}
            >
              {isLoading ? <FormSpinner /> : "Add Product Files"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
