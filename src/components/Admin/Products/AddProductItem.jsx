import React, { useEffect, useState, useContext } from "react";
import ReactDOM from "react-dom";

import { useForm } from "react-hook-form";
import useFetch from "../../../hooks/useFetch";
import Spinner from "../../Spinner/Spinner";
import ProductsTable from "./ProductsTable";
import ProductsPanelContext from "./ProductsPanelContext";

export default function AddProductItem() {
  //console.log(findProduct);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
    getProductsList,
    setShowFile,
    findProduct,
    setShowProductItem,
    showProductItem,
  } = useContext(ProductsPanelContext);
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { datas: colorsData } = useFetch("/api/v1/color");
  useEffect(() => {
    if (colorsData && colorsData.data) {
      setColors(colorsData.data);
    }
  }, [colorsData]);

  const addItem = (data) => {
    let productItem = {
      colorId: data.colorId,
      isMainItem: true,
      price: Number(data.price),
      productId: findProduct.id,
      quantity: Number(data.quantity),
      status: data.status == "0" ? 0 : 1,
    };

    setIsLoading(true);
    fetch("/api/v1/productItem", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productItem),
    })
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        if (res.ok) {
          setShowProductItem(false);
          setShowFile(true);
        }
        reset();

        getProductsList();
        res.json();
      })
      .catch((err) => console.log(err));
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
            onSubmit={handleSubmit(addItem)}
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
                    {...register("price", {
                      required: "This field is required",
                    })}
                  />
                  {errors.quantity && (
                    <p className="text-red-700">{errors.price.message}</p>
                  )}
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
                    {...register("colorId", {
                      required: "Please select a color",
                    })}
                  >
                    <option value="">Select Color</option>
                    {colors.map((color) => (
                      <option key={color.id} value={color.id}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                  {errors.colorId && (
                    <p className="text-red-700">{errors.colorId.message}</p>
                  )}
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
                    {...register("quantity", {
                      required: "This field is required",
                    })}
                  />
                  {errors.quantity && (
                    <p className="text-red-700">{errors.quantity.message}</p>
                  )}
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
                    {...register("status", {
                      required: "Please select a status",
                    })}
                  >
                    <option value="">Select a status</option>

                    <option value="0">Publish</option>
                    <option value="1">InActive</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-700">{errors.status.message}</p>
                  )}
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
