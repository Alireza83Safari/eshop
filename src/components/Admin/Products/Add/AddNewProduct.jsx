import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import useFetch from "../../../../hooks/useFetch";
import { productFormValidation } from "../../../../validators/productFormValidation";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { CustomSelect } from "../../../SelectList";

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
  const [serverErrors, setServerErrors] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const addNewProducts = async () => {
    productFormValidation(productInfo, errors, setErrors);

    setLoading(true);
    try {
      const response = await adminAxios.post("/product", productInfo);
      if (response.status === 200) {
        setNewProductId(response?.data.data);
        fetchProductList();
        setShowProductItem(true);
        setShowAddProduct(false);
        setLoading(false);
      } else if (response.status === 422) {
        setErrors("Code Is Taken");
      }
    } catch (error) {
      setServerErrors(error?.response?.data?.errors);
      setLoading(false);
    }
  };

  const setProductInfos = (event) => {
    setProductInfo({
      ...productInfo,
      [event.target.name]: event.target.value,
    });
  };

  const { datas: category } = useFetch("/category", adminAxios);
  const { datas: brands } = useFetch("/brand", adminAxios);
  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showAddProduct ? "visible" : "invisible"
      }`}
    >
      <div className="lg:w-[30rem] bg-white-100 p-5 rounded-xl">
        <span className="mb-5 text-xl font-bold flex justify-center">
          Add New Product
        </span>

        <form onSubmit={(e) => e.preventDefault()}>
          <div
            className={` grid grid-cols-2 gap-2 mt-2 text-sm ${
              isLoading && "opacity-20"
            } `}
          >
            <div className="col-span-2">
              <label className="font-medium text-gray-800" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                placeholder="Product Name"
                className="block w-full border py-2 px-2 rounded-lg outline-none focus:border-blue-600"
                name="name"
                onChange={setProductInfos}
                value={productInfo?.name}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />
              <p className="text-sm text-red-700">
                {errors?.name}
                {serverErrors?.name}
              </p>
            </div>

            <div>
              <label className="font-medium text-gray-800" htmlFor="code">
                Code
              </label>
              <input
                type="text"
                placeholder="Product Code"
                className="border p-2 block w-full rounded-lg outline-none focus:border-blue-600"
                name="code"
                onChange={setProductInfos}
                value={productInfo?.code}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />
              <p className="text-sm text-red-700">{errors?.code}</p>
            </div>

            <div>
              <label className="font-medium text-gray-800">Code</label>
              <CustomSelect
                options={brands?.data.map((brand) => ({
                  value: brand.id,
                  label: brand.name,
                }))}
                onchange={(selectedOption) => {
                  setProductInfo({
                    ...productInfo,
                    brandId: selectedOption?.value || "",
                  });
                  setErrors("");
                  setServerErrors("");
                }}
              />
              <p className="text-sm text-red-700">
                {errors?.brandId}
                {serverErrors?.brandId}
              </p>
            </div>

            <div>
              <label className="font-medium text-gray-800">Category</label>
              <CustomSelect
                options={category?.data.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
                onchange={(selectedOption) => {
                  setProductInfo({
                    ...productInfo,
                    categoryId: selectedOption?.value || "",
                  });
                  setErrors("");
                  setServerErrors("");
                }}
              />
              <p className="text-sm text-red-700">
                {errors?.brandId}
                {serverErrors?.brandId}
              </p>
            </div>

            <div>
              <label className="font-medium text-gray-800">
                Short Description
              </label>
              <input
                type="text"
                placeholder="Product Short Decription"
                className="block w-full border py-2 px-2 rounded-lg outline-none focus:border-blue-600"
                name="shortDescription"
                onChange={setProductInfos}
                value={productInfo?.shortDescription}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />
              <p className="text-sm text-red-700">
                {errors?.shortDescription}
                {serverErrors?.shortDescription}
              </p>
            </div>

            <div className="col-span-2">
              <label className="font-medium text-gray-800">Decription</label>
              <input
                type="text"
                placeholder="Product Description"
                className="block w-full border py-6 px-2 rounded-lg outline-none focus:border-blue-600"
                name="description"
                onChange={setProductInfos}
                value={productInfo?.description}
                onFocus={() => {
                  setErrors("");
                  setServerErrors("");
                }}
              />
              <p className="text-sm text-red-700">
                {errors?.description}
                {serverErrors?.description}
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2"
              onClick={addNewProducts}
            >
              {isLoading ? <FormSpinner /> : "Add Product"}
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
