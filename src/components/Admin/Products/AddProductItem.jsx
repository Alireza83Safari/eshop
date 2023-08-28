import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import useFetch from "../../../hooks/useFetch";
import Spinner from "../../Spinner/Spinner";
import ProductsPanelContext from "./ProductsPanelContext";
import adminAxios from "../../../api/adminInterceptors";
import { itemValidation } from "../../../validators/itemValidation";

export default function AddProductItem({}) {
  const {
    fetchProductList,
    setShowFile,
    setShowProductItem,
    newProductId,
    showProductItem,
  } = useContext(ProductsPanelContext);

  const [errors, setErrors] = useState();
  const [productItemInfo, setProductItemInfo] = useState({
    status: "",
    price: "",
    colorId: "",
    quantity: "",
    isMainItem: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { datas: colors } = useFetch("/color", adminAxios);

  const addItem = async (event) => {
    event.preventDefault();

    itemValidation(productItemInfo, errors, setErrors);

    setIsLoading(true);
    let productItem = {
      colorId: productItemInfo?.colorId,
      isMainItem: productItemInfo?.isMainItem === "true" ? true : false,
      price: Number(productItemInfo?.price),
      productId: newProductId,
      quantity: Number(productItemInfo?.quantity),
      status: Number(productItemInfo?.status),
    };

    try {
      const response = await adminAxios.post(`/productItem`, productItem);
      setIsLoading(false);
      if (response.status === 200) {
        setShowProductItem(false);
        setShowFile(true);
        fetchProductList();
      }
    } catch (error) {
      console.error("Error deleting the product:", error);
      setIsLoading(false);
    }
  };

  const setProductItemInfos = (event) => {
    setProductItemInfo({
      ...productItemInfo,
      [event.target.name]: event.target.value,
    });
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showProductItem ? "visible" : "invisible"
      }`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-1/3  bg-white-100 p-5 rounded-xl">
          <span className="mb-5 text-xl font-bold flex justify-center">
            Add New Product Item
          </span>

          <form
            onSubmit={addItem}
            className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg"
          >
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-gray-800 font-medium"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Product Price"
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    onChange={setProductItemInfos}
                    value={productItemInfo?.price}
                  />

                  <p className="text-red-700">{errors?.price}</p>
                </div>

                <div>
                  <label
                    htmlFor="colorId"
                    className="block text-gray-800 font-medium"
                  >
                    Color
                  </label>
                  <select
                    name="colorId"
                    id="colorId"
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    onChange={setProductItemInfos}
                    value={productItemInfo?.colorId}
                  >
                    <option value="">Select Color</option>
                    {colors?.data.map((color) => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-red-700">{errors?.colorId}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="quantity"
                    className="block text-gray-800 font-medium"
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="Product Quantity"
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    onChange={setProductItemInfos}
                    value={productItemInfo?.quantity}
                  />

                  <p className="text-red-700">{errors?.quantity}</p>
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block text-gray-800 font-medium"
                  >
                    Product Status
                  </label>
                  <select
                    name="status"
                    id="status"
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    onChange={setProductItemInfos}
                    value={productItemInfo?.status}
                  >
                    <option value="">Select a status</option>

                    <option value="0">Publish</option>
                    <option value="1">InActive</option>
                  </select>
                  <p className="text-red-700">{errors?.status}</p>
                </div>

                <div>
                  <label
                    htmlFor="isMainItem"
                    className="block text-gray-800 font-medium"
                  >
                    isMainItem
                  </label>
                  <select
                    name="isMainItem"
                    id="isMainItem"
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    onChange={setProductItemInfos}
                    value={productItemInfo?.isMainItem}
                  >
                    <option value="">Select a isMainItem</option>

                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                  <p className="text-red-700">{errors?.isMainItem}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8">
              <button
                type="submit"
                className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>,
    document.getElementById("portal")
  );
}
