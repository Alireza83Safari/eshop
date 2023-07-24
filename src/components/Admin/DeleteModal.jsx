import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import productsContext from "../../Context/productsContext";

export default function DeleteModal({
  showDeleteModal,
  setShowDeleteModal,
  productId,
}) {
  const { getAllProducts } = useContext(productsContext);
  const cancelDeleteHandler = () => {
    setShowDeleteModal(false);
  };
  const deleteProductHandler = () => {
    setShowDeleteModal(true);
    fetch(`http://localhost:9000/products/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        getAllProducts();
      })
      .catch((err) => console.log(err));
    setShowDeleteModal(false);
  };
  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full backdrop-blur-sm h-screen flex items-center justify-center transition duration-400 ${
        showDeleteModal ? "visible" : "invisible"
      }`}
    >
      <div className=" bg-gray-100 rounded-xl p-14 relative">
        <button
          className="absolute top-1 right-2 text-xl"
          onClick={cancelDeleteHandler}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <h2 className="text-2xl font-semibold mb-4">
          Are you sure you want to delete?
        </h2>
        <div className="flex justify-center">
          <button
            className="bg-red text-white-100 m-3 px-4 py-2 rounded-md"
            onClick={deleteProductHandler}
          >
            Delete
          </button>
          <button
            className="bg-gray-200 text-black-100 m-3 px-4 py-2 rounded-md"
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
