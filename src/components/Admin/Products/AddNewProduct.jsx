import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import productsContext from "../../../Context/productsContext";
import { useForm } from "react-hook-form";
import Spinner from "../../Spinner/Spinner";
import ProductsPanelContext from "./ProductsPanelContext";

export default function AddNewProduct() {
  const { getAllProducts } = useContext(productsContext);
  const {
    getProductsList,
    brands,
    category,
    showAddProduct,
    setShowAddProduct,
    setProductCode,
    setShowProductItem,
  } = useContext(ProductsPanelContext);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const addNewProducts = (data) => {
    console.log(data);
    setProductCode(data.code);
    setIsLoading(true);
    fetch("/api/v1/product", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      setIsLoading(false);
      console.log(res);
      if (res.ok) {
        setShowProductItem(true);
        setShowAddProduct(false);
        reset();
        getProductsList();
        getAllProducts();
      }
      if (res.status === 422) {
        setError("Code Is Taken");
      }
      res.json();
    });
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showAddProduct ? "visible" : "invisible"
      }`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-1/3  bg-white-100 p-5 rounded-xl">
          <span className="mb-5 text-xl font-bold flex justify-center">
            Add New Product
          </span>

          <form onSubmit={handleSubmit(addNewProducts)}>
            <div className="grid grid-cols-1 gap-2 mt-2">
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

              <div className="flex">
                <div className="w-1/2 pr-2">
                  <span className="font-medium text-gray-800">Code</span>
                  <input
                    type="number"
                    placeholder="Product Code"
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    {...register("code", {
                      required: "This field is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Please enter only numbers",
                      },
                    })}
                  />
                  {errors.code && (
                    <p className="text-red-700">{errors.code.message}</p>
                  )}
                  <p className="text-red-700">{error}</p>
                </div>

                <div className="w-1/2 pl-2">
                  <span className="font-medium text-gray-800">Brand</span>
                  <select
                    name="brandId"
                    id=""
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    {...register("brandId", {
                      required: "This field is required",
                    })}
                  >
                    <option value="">Select Brand</option>
                    {brands.map((brand) => (
                      <option value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                  {errors.brandId && (
                    <p className="text-red-700">{errors.brandId.message}</p>
                  )}
                </div>
              </div>
              <div className="">
                <span className="font-medium text-gray-800">Category</span>
                <select
                  name="categoryId"
                  id="categoryId"
                  placeholder=""
                  className="border py-2 px-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  {...register("categoryId", {
                    required: "This field is required",
                    validate: (value) =>
                      value !== "" || "Please select a category",
                  })}
                >
                  <option value="">Select Category</option>
                  {category.map((cate) => (
                    <option key={cate.id} value={cate.id}>
                      {cate.name}
                    </option>
                  ))}
                </select>

                {errors.categoryId && (
                  <p className="text-red-700">{errors.categoryId.message}</p>
                )}
              </div>

              <span className="font-medium text-gray-800">
                Short Description
              </span>
              <input
                type="text"
                placeholder="Product Short Decription"
                className="border py-2 px-2 rounded-lg outline-none focus:border-blue-600"
                {...register("shortDescription", {
                  required: "This field is required",
                  maxLength: {
                    value: 30,
                    message: "name cannot exceed 30 characters",
                  },
                })}
              />
              {errors.shortDescription && (
                <p className="text-red-700">
                  {errors.shortDescription.message}
                </p>
              )}

              <span className="font-medium text-gray-800">Decription</span>
              <input
                type="text"
                placeholder="Product Description"
                className="border py-6 px-2 rounded-lg outline-none focus:border-blue-600"
                {...register("description", {
                  required: "This field is required",
                  maxLength: {
                    value: 30,
                    message: "name cannot exceed 30 characters",
                  },
                })}
              />
              {errors.description && (
                <p className="text-red-700">{errors.description.message}</p>
              )}
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
      )}
    </div>,
    document.getElementById("portal")
  );
}
