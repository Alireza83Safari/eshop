import React, { useContext } from "react";
import ReactDOM from "react-dom";
import productsContext from "../../Context/productsContext";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

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

  const addNewProducts = (data) => {
    fetch("http://localhost:9000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      reset(); // Clear all form fields
      setShowAddProduct(false);
      getAllProducts();
    });
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 backdrop-blur-sm -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showAddProduct ? "visible" : "invisible"
      }`}
    >
      <div className="w-1/2 bg-gray-200 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Add New Product
        </span>

        <form onSubmit={handleSubmit(addNewProducts)}>
          <div className="grid grid-cols-1 gap-2 mt-2">
            <input
              type="text"
              className="hidden invisible"
              value={uuidv4()}
              {...register("id", {})}
            />
            <input
              type="text"
              placeholder="Product Name"
              className="border py-2 px-2 rounded-lg outline-none"
              {...register("name", {
                required: "This field is required",
                maxLength: {
                  value: 30,
                  message: "name cannot exceed 30 characters",
                },
              })}
            />
            {errors.name && <p className="text-red">{errors.name.message}</p>}
            <input
              type="text"
              placeholder="Product Image"
              className="border py-2 px-2 rounded-lg outline-none"
              {...register("img", { required: "This field is required" })}
            />
            {errors.img && <p className="text-red">{errors.img.message}</p>}
            <input
              type="number"
              placeholder="Product Price"
              className="border py-2 px-2 rounded-lg outline-none"
              {...register("price", {
                required: "This field is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Please enter only numbers",
                },
              })}
            />

            {errors.price && <p className="text-red">{errors.price.message}</p>}
            <input
              type="number"
              placeholder="Product Sold"
              className="border py-2 px-2 rounded-lg outline-none"
              {...register("sale", { required: "This field is required" })}
            />
            {errors.sale && <p className="text-red">{errors.sale.message}</p>}
          </div>

          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-600 text-white-100 w-full py-2 rounded-xl"
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



