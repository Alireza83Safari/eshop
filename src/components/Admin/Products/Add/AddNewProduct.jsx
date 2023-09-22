import React, { useContext, useState } from "react";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import useFetch from "../../../../hooks/useFetch";
import { productFormValidation } from "../../../../validators/productFormValidation";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { CustomSelect } from "../../../SelectList";

export default function AddNewProduct({
  setShowProductItem,
  setShowAddProduct,
}) {
  const { fetchProductList, setShowAddProductModal, setNewProductId } =
    useContext(ProductsPanelContext);

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
        setShowAddProduct(false);
        setShowProductItem(true);

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
  return (
    <>
      <span className="mb-5 text-xl font-bold flex justify-center dark:text-white-100">
        Add New Product
      </span>

      <form onSubmit={(e) => e.preventDefault()}>
        <div
          className={` grid grid-cols-2 gap-2 mt-2 text-sm  dark:text-white-100 ${
            isLoading && "opacity-20"
          } `}
        >
          <div className="col-span-2">
            <label
              className="font-medium text-gray-800 dark:text-white-100"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              placeholder="Product Name"
              className="block w-full border py-2 px-2 rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
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
            <label
              className="font-medium text-gray-800 dark:text-white-100"
              htmlFor="code"
            >
              Code
            </label>
            <input
              type="text"
              placeholder="Product Code"
              className="border p-2 block w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200 "
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
            <label className="font-medium text-gray-800 dark:text-white-100">
              Code
            </label>
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
            <label className="font-medium text-gray-800 dark:text-white-100">
              Category
            </label>
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
            <label className="font-medium text-gray-800 dark:text-white-100">
              Short Description
            </label>
            <input
              type="text"
              placeholder="Product Short Decription"
              className="block w-full border py-2 px-2 rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
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
            <label className="font-medium text-gray-800 dark:text-white-100">
              Decription
            </label>
            <input
              type="text"
              placeholder="Product Description"
              className="block w-full border py-6 px-2 rounded-lg outline-none focus:border-blue-600 dark:bg-black-200"
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
            className="w-full py-2 rounded-xl border border-blue-600 ml-2 dark:text-white-100"
            onClick={() => {
              // setShowAddProduct(false);
              setShowAddProductModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
