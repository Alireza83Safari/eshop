import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import productsContext from "../../Context/productsContext";
import { useForm } from "react-hook-form";

export default function AddNewProduct({ showAddProduct, setShowAddProduct }) {
  const { getAllProducts } = useContext(productsContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  /* close modal when user scroll */
  window.addEventListener("scroll", () => {
    setShowAddProduct(false);
  });

  const addNewProducts = async (data) => {
    try {
      await fetch("http://localhost:9000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      reset(); // Clear all form fields
      setShowAddProduct(false);
      getAllProducts();
    } catch (error) {
      console.error("Error adding new product:", error);
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showAddProduct ? "visible" : "invisible"
      }`}
    >
      <div className="w-1/3  bg-white-100 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Add New Product
        </span>

        <form onSubmit={handleSubmit(addNewProducts)}>
          <div className="grid grid-cols-1 gap-2 mt-2">
            <input
              type="text"
              className="hidden invisible"
              value={crypto.randomUUID()}
              {...register("id", {})}
            />
            {/*  */}
            <span className="font-medium text-gray-800">Name</span>
            <input
              type="text"
              placeholder="Product Name"
              className="border py-2 px-2 rounded-lg outline-none focus:border-blue-600"
              {...register("name", {
                required: "This field is required",
                maxLength: {
                  value: 30,
                  message: "name cannot exceed 30 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-700">{errors.name.message}</p>
            )}
            <span className="font-medium text-gray-800">Image Address</span>
            <input
              type="text"
              placeholder="Product Image"
              className="border py-2 px-2 rounded-lg outline-none focus:border-blue-600"
              {...register("img", { required: "This field is required" })}
            />
            {errors.img && <p className="text-red-700">{errors.img.message}</p>}

            <div className="flex">
              <div className="pr-2">
                <span className="font-medium text-gray-800">Price</span>
                <input
                  type="number"
                  placeholder="Product Price"
                  className="border py-2 rounded-lg outline-none mt-1 focus:border-blue-600"
                  {...register("price", {
                    required: "This field is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter only numbers",
                    },
                  })}
                />
                {errors.price && (
                  <p className="text-red-700">{errors.price.message}</p>
                )}
              </div>

              <div className="pl-2">
                <span className="font-medium text-gray-800">Sold</span>
                <input
                  type="number"
                  placeholder="Product Sold"
                  className="border py-2 rounded-lg outline-none mt-1 focus:border-blue-600"
                  {...register("sale", { required: "This field is required" })}
                />
                {errors.sale && (
                  <p className="text-red-700">{errors.sale.message}</p>
                )}
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2 pr-2">
                <span className="font-medium text-gray-800">Status</span>
                <select
                  name="status"
                  id=""
                  className="border py-2 px-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  {...register("status", {
                    required: "This field is required",
                  })}
                >
                  <option value="">Status</option>
                  <option value="Publish">Publish</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-red-700">{errors.status.message}</p>
                )}
              </div>
              <div className="w-1/2 pl-2">
                <span className="font-medium text-gray-800">Category</span>
                <select
                  name="category"
                  id=""
                  placeholder=""
                  className="border py-2 px-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  {...register("category", {
                    required: "This field is required",
                  })}
                >
                  <option value="">Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Home & Kitchen">Home & Kitchen</option>
                  <option value="Fresh">Fresh</option>
                  <option value="Travel">Travel</option>
                  <option value="Clothes">Clothes</option>
                </select>

                {errors.category && (
                  <p className="text-red-700">{errors.category.message}</p>
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
            <button
              type="submit"
              className="w-full py-2 rounded-xl border border-blue-600 ml-2"
              onClick={() => setShowAddProduct(false)}
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
