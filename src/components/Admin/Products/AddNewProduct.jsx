import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import ProductsPanelContext from "./ProductsPanelContext";
import adminAxios from "../../../api/adminInterceptors";
import useFetch from "../../../hooks/useFetch";
import { productFormValidation } from "../../../validators/productFormValidation";
import Spinner from "../../Spinner/Spinner";

export default function AddNewProduct() {
  const {
    fetchProductList,
    showAddProduct,
    setShowAddProduct,
    setNewProductId,
    setShowProductItem,
  } = useContext(ProductsPanelContext);

  const [productInfo, setProductInfo] = useState({
    name: "",
    code: "",
    brandId: "",
    categoryId: "",
    description: "",
    shortDescription: "",
  });
  const [errors, setErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const addNewProducts = async (data) => {
    data.preventDefault();
    productFormValidation(productInfo, errors, setErrors);

    setLoading(true);
    try {
      const response = await adminAxios.post("/product", productInfo);
      setNewProductId(response?.data.data);
      if (response.status === 200) {
        fetchProductList();
        setShowProductItem(true);
        setShowAddProduct(false);
        setLoading(false);
      } else if (response.status === 422) {
        setErrors("Code Is Taken");
      }
    } catch (error) {
      console.error("Error deleting the product:", error.message);
      setLoading(false);
    }
  };

  const setProductInfos = (event) => {
    setProductInfo({
      ...productInfo,
      [event.target.name]: event.target.value,
    });
  };

  const { datas: category } = useFetch("/api/v1/admin/category");

  const { datas: brands } = useFetch("/api/v1/admin/brand");

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

        {isLoading ? (
          <Spinner />
        ) : (
          <form onSubmit={addNewProducts}>
            <div className="grid grid-cols-1 gap-2 mt-2">
              <span className="font-medium text-gray-800">Name</span>
              <input
                type="text"
                placeholder="Product Name"
                className="border py-2 px-2 rounded-lg outline-none focus:border-blue-600"
                name="name"
                onChange={setProductInfos}
                value={productInfo?.name}
              />
              <p className="text-sm text-red-700">{errors?.name}</p>
              <div className="flex">
                <div className="w-1/2 pr-2">
                  <span className="font-medium text-gray-800">Code</span>
                  <input
                    type="number"
                    placeholder="Product Code"
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    name="code"
                    onChange={setProductInfos}
                    value={productInfo?.code}
                  />
                  <p className="text-sm text-red-700">{errors?.code}</p>
                </div>

                <div className="w-1/2 pl-2">
                  <span className="font-medium text-gray-800">Brand</span>
                  <select
                    name="brandId"
                    id=""
                    className="border p-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                    onChange={setProductInfos}
                    value={productInfo?.brandId}
                  >
                    <option value="">Select Brand</option>
                    {brands?.data.map((brand) => (
                      <option value={brand.id}>{brand.name}</option>
                    ))}
                  </select>
                  <p className="text-sm text-red-700">{errors?.brandId}</p>
                </div>
              </div>
              <div className="">
                <span className="font-medium text-gray-800">Category</span>
                <select
                  name="categoryId"
                  id="categoryId"
                  placeholder=""
                  className="border py-2 px-2 w-full rounded-lg outline-none mt-1 focus:border-blue-600"
                  onChange={setProductInfos}
                  value={productInfo?.categoryId}
                >
                  <option value="">Select Category</option>
                  {category?.data.map((cate) => (
                    <option key={cate.id} value={cate.id}>
                      {cate.name}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-red-700">{errors?.categoryId}</p>
              </div>
              <span className="font-medium text-gray-800">
                Short Description
              </span>
              <input
                type="text"
                placeholder="Product Short Decription"
                className="border py-2 px-2 rounded-lg outline-none focus:border-blue-600"
                name="shortDescription"
                onChange={setProductInfos}
                value={productInfo?.shortDescription}
              />
              <p className="text-sm text-red-700">{errors?.shortDescription}</p>
              <span className="font-medium text-gray-800">Decription</span>
              <input
                type="text"
                placeholder="Product Description"
                className="border py-6 px-2 rounded-lg outline-none focus:border-blue-600"
                name="description"
                onChange={setProductInfos}
                value={productInfo?.description}
              />
              <p className="text-sm text-red-700">{errors?.description}</p>
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
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
