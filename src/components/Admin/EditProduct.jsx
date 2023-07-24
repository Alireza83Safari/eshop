import React, { useContext } from "react";
import ReactDOM from "react-dom";
import productsContext from "../../Context/productsContext";

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
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full bg-gray-100 h-screen flex items-center justify-center transition duration-400 ${
        showEditModal ? "visible" : "invisible"
      }`}
    >
      <div className="relative w-1/3 bg-white-100 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Edit Product Infos
        </span>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 gap-2 mt-2">
            <span className="font-medium text-gray-800">Name</span>
            <input
              type="text"
              name="name"
              placeholder="name"
              className="border py-2 px-2 rounded-lg outline-none focus:border-blue-600"
              value={editProductInfos.name}
              onChange={newInfoHandler}
            />

            <span className="font-medium text-gray-800">Image Address</span>
            <input
              type="text"
              name="img"
              placeholder="img"
              className="border py-2 px-2 rounded-lg outline-none focus:border-blue-600"
              value={editProductInfos.img}
              onChange={newInfoHandler}
            />

            <span className="font-medium text-gray-800">Price</span>
            <input
              type="text"
              name="price"
              placeholder="price"
              className="border py-2 px-2 rounded-lg outline-none focus:border-blue-600"
              value={editProductInfos.price}
              onChange={newInfoHandler}
            />

            <span className="font-medium text-gray-800">Sold</span>
            <input
              type="text"
              name="sale"
              placeholder="sale"
              className="border py-2 px-2 rounded-lg outline-none focus:border-blue-600"
              value={editProductInfos.sale}
              onChange={newInfoHandler}
            />

            <div className="flex">
              <div className="mr-2 w-1/2">
                <span className="font-medium text-gray-800">Status</span>
                <select
                  name="status"
                  id=""
                  value={editProductInfos.status}
                  className="border py-2 px-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  onChange={newInfoHandler}
                >
                  <option value="">Status</option>
                  <option value="Publish">Publish</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="ml-2 w-1/2">
                <span className="font-medium text-gray-800">Category</span>
                <select
                  name="category"
                  id=""
                  value={editProductInfos.category}
                  placeholder=""
                  className="border py-2 px-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  onChange={newInfoHandler}
                >
                  <option value="">Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Fresh">Fresh</option>
                  <option value="Travel">Travel</option>
                  <option value="Cloths">Cloths</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2"
              onClick={postProduct}
            >
              Edit Product
            </button>

            <button
              type="submit"
              className="w-full py-2 rounded-xl border ml-2"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
