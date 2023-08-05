import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function DeleteModal({
  showDeleteModal,
  setShowDeleteModal,
  productId,
  getProductsList,
}) {
  const cancelDeleteHandler = () => {
    setShowDeleteModal(false);
  };
  const deleteProductHandler = () => {
    fetch(`/api/v1/product/delete/${productId}`, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    })
      .then((res) => {
        res.json();
        setShowDeleteModal(false);
        getProductsList();
      })
      .catch((err) => console.log(err));
  };
  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full backdrop-blur-sm h-screen flex items-center justify-center transition duration-400 ${
        showDeleteModal ? "visible" : "invisible"
      }`}
    >
      <div className=" bg-gray-100 rounded-xl md:p-14 p-6 relative">
        <button
          className="absolute top-1 right-2 text-xl"
          onClick={cancelDeleteHandler}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <h2 className="md:text-2xl text-lg font-semibold mb-4">
          Are you sure you want to delete?
        </h2>
        <div className="flex justify-center">
          <button
            className="bg-red-700 text-white-100 m-3 px-4 py-2 rounded-md md:text-base text-sm"
            onClick={deleteProductHandler}
          >
            Delete
          </button>
          <button
            className="bg-gray-200 text-black-100 m-3 px-4 py-2 rounded-md md:text-base text-sm"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
