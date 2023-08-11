import React, { useContext } from "react";
import ReactDOM from "react-dom";
import productsContext from "../../../Context/productsContext";
import { useForm } from "react-hook-form";
import useFetch from "../../../hooks/useFetch";
import ProductsPanelContext from "./ProductsPanelContext";

export default function EditProduct() {
  const {
    setShowEditModal,
    showEditModal,
    productEditId,
    getProductsList,
    brands,
    category,
  } = useContext(ProductsPanelContext);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Accessing token from context
  const { token } = useContext(productsContext);

  // Fetching data for the product to be edited
  const { datas: editData } = useFetch(
    `/api/v1/admin/product/${productEditId}`
  );

  // Function to post edited product data
  const editProductHandler = (e) => {
    fetch(`/api/v1/product/edit/${productEditId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(e),
    })
      .then((res) => {
        res.json();
      })
      .then(() => {
        setShowEditModal(false);
        getProductsList();
        reset();
      });
  };

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full bg-gray-100 h-screen flex items-center justify-center transition duration-400 ${
        showEditModal ? "visible" : "invisible"
      }`}
    >
      <div className="w-1/3  bg-white-100 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Edit Product
        </span>

        <form
          onSubmit={handleSubmit(editProductHandler)}
          className="w-full max-w-sm mx-auto p-4 bg-white rounded-lg"
        >
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-800 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Product Name"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  {...register("name", {
                    required: "This field is required",
                  })}
                  defaultValue={editData?.name}
                />
                {errors.name && (
                  <p className="text-red-700 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="colorId"
                  className="block text-gray-800 font-medium"
                >
                  Category
                </label>
                <select
                  name="categoryId"
                  id="categoryId"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  {...register("categoryId", {
                    required: "Please select a Category",
                  })}
                  defaultValue={editData?.categoryId}
                >
                  <option value="">Select a Category</option>
                  {category &&
                    category.map((cate) => (
                      <option key={cate.id} value={cate.id}>
                        {cate.name}
                      </option>
                    ))}
                </select>
                {errors.categoryId && (
                  <p className="text-red-700 text-sm">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="brandId"
                  className="block text-gray-800 font-medium"
                >
                  Brand
                </label>
                <select
                  name="brandId"
                  id="brandId"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  {...register("brandId", {
                    required: "Please select a brand",
                  })}
                  defaultValue={editData?.brandId || ""}
                >
                  <option value="">Select a brand</option>
                  {brands &&
                    brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                </select>
                {errors.brandId && (
                  <p className="text-red-700 text-sm">
                    {errors.brandId.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="code"
                  className="block text-gray-800 font-medium"
                >
                  code
                </label>
                <input
                  type="number"
                  id="code"
                  name="code"
                  placeholder="Product Code"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  {...register("code", {
                    required: "This field is required",
                  })}
                  defaultValue={editData?.code}
                />
                {errors.code && (
                  <p className="text-red-700 text-sm">{errors.code.message}</p>
                )}
              </div>
            </div>

            <div className="">
              <div>
                <label
                  htmlFor="shortDescription"
                  className="block text-gray-800 font-medium"
                >
                  Short Description
                </label>
                <input
                  type="text"
                  id="shortDescription"
                  name="shortDescription"
                  placeholder="Product Short Description"
                  className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  {...register("shortDescription", {
                    required: "This field is required",
                  })}
                  defaultValue={editData?.shortDescription}
                />
                {errors.shortDescription && (
                  <p className="text-red-700 text-sm">
                    {errors.shortDescription.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-800 font-medium"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Product Description"
                  className="border py-4 px-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  {...register("description", {
                    required: "This field is required",
                  })}
                  defaultValue={editData?.description}
                />
                {errors.description && (
                  <p className="text-red-700 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white-100 w-1/2 py-2 rounded-xl mr-2"
            >
              Edit Product
            </button>
            <button
              type="submit"
              className="w-1/2 py-2 rounded-xl border ml-2"
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
