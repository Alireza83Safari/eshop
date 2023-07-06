import React, { useContext } from "react";
import ReactDOM from "react-dom";
import productsContext from "../../Context/productsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function EditProduct({
  editProductInfos,
  setEditProductInfos,
  productEditId,
  showEditModal,
  setShowEditModal,
}) {
  const { getAllProducts } = useContext(productsContext);

  const newInfoHandler = (e) => {
    setEditProductInfos((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const postProduct = (e) => {
    e.preventDefault();

    fetch(`http://localhost:9000/products/${productEditId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editProductInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        getAllProducts();
        setShowEditModal(false);
      });
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full backdrop-blur-sm h-screen flex items-center justify-center transition duration-400 ${
        showEditModal ? "visible" : "invisible"
      }`}
    >
      <div className="relative w-1/2 bg-gray-200 p-5 rounded-xl">
        <FontAwesomeIcon
          icon={faX}
          className=" absolute top-3 right-4"
          onClick={() => setShowEditModal(false)}
        />
        <span className="mb-5 text-xl font-bold flex justify-center">
          Edit Product Infos
        </span>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 gap-2 mt-2">
            <input
              type="text"
              name="name"
              placeholder="name"
              className="p-1 rounded-lg"
              value={editProductInfos.name}
              onChange={newInfoHandler}
            />
            <input
              type="text"
              name="img"
              placeholder="img"
              className="p-1 rounded-lg"
              value={editProductInfos.img}
              onChange={newInfoHandler}
            />
            <input
              type="text"
              name="price"
              placeholder="price"
              className="p-1 rounded-lg"
              value={editProductInfos.price}
              onChange={newInfoHandler}
            />
            <input
              type="text"
              name="sale"
              placeholder="sale"
              className="p-1 rounded-lg"
              value={editProductInfos.sale}
              onChange={newInfoHandler}
            />
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white-100 w-full py-2 rounded-xl"
              onClick={postProduct}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
