import React, { useContext, useEffect, useState } from "react";
import ProductsPanelContext from "../../../../context/ProductsPanelContext";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import useFetch from "../../../../hooks/useFetch";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { CustomSelect } from "../../../SelectList";
import Input from "../../Input";
import productSchema from "../../../../validations/product";

export default function AddNewProduct({
  setShowProductItem,
  setShowAddProduct,
}) {
  const { fetchProductList, setShowAddProductModal, setNewProductId } =
    useContext(ProductsPanelContext);

  const initialState = {
    name: "",
    code: "",
    brandId: "",
    categoryId: "",
    description: "",
    shortDescription: "",
  };

  const [productInfo, setProductInfo] = useState(initialState);

  const [formIsValid, setFormIsValid] = useState(false);
  const [errors, setErrors] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const getFormValidation = async () => {
    setLoading(true);

    try {
      const isValid = await productSchema.validate(productInfo, {
        abortEarly: false,
      });
      setFormIsValid(isValid);
      setLoading(false);
    } catch (error) {
      let errors = error.inner.reduce(
        (acc, error) => ({
          ...acc,
          [error.path]: error.message,
        }),
        {}
      );
      setErrors(errors);
      setLoading(false);
    }
  };

  const addNewProducts = async () => {
    try {
      if (formIsValid) {
        setLoading(true);
        const response = await adminAxios.post("/product", productInfo);
        if (response.status === 200) {
          setNewProductId(response?.data.data);
          fetchProductList();
          setShowAddProduct(false);
          setShowProductItem(true);
          setProductInfo(initialState);

          setLoading(false);
        } else if (response.status === 422) {
          setErrors("Code Is Taken");
        }
      }
    } catch (error) {
      setServerError(error?.response?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formIsValid) {
      addNewProducts();
    }
  }, [formIsValid]);

  const setProductInfos = (event) => {
    const { name, value } = event.target;
    setProductInfo({
      ...productInfo,
      [name]: value,
    });
  };

  const { datas: category } = useFetch("/category", adminAxios);
  const { datas: brands } = useFetch("/brand", adminAxios);

  return (
    <div className="lg:w-[30rem] min-h-[27rem] max-w-10/12 bg-white-100 dark:bg-black-200 sm:p-4 p-2 rounded-xl relative">
      <span className="mb-5 text-xl font-bold flex justify-center dark:text-white-100">
        Add New Product
      </span>

      <form onSubmit={(e) => e.preventDefault()}>
        <div
          className={` grid grid-cols-2 gap-y-7 gap-x-3 mt-2 text-sm  dark:text-white-100 ${
            isLoading && "opacity-20"
          } `}
        >
          <div className="col-span-2">
            <Input
              labelText="name"
              placeholder="Product name"
              name="name"
              value={productInfo?.name}
              onChange={setProductInfos}
              Error={errors?.name || serverError?.errors?.name}
              callback={() => {
                setErrors("");
                setServerError("");
              }}
            />
          </div>

          <div>
            <label className="font-medium text-gray-800 dark:text-white-100">
              Brand
            </label>
            <CustomSelect
              options={brands?.data?.map((brand) => ({
                value: brand.id,
                label: brand.name,
              }))}
              onchange={(selectedOption) => {
                setProductInfo({
                  ...productInfo,
                  brandId: selectedOption?.value || "",
                });
                setErrors("");
                setServerError("");
              }}
            />
            <p className="text-sm text-red-700">
              {errors?.brandId}
              {serverError?.brandId}
            </p>
          </div>

          <div>
            <label className="font-medium text-gray-800 dark:text-white-100">
              Category
            </label>
            <CustomSelect
              options={category?.data?.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              onchange={(selectedOption) => {
                setProductInfo({
                  ...productInfo,
                  categoryId: selectedOption?.value || "",
                });
                setErrors("");
                setServerError("");
              }}
            />
            <p className="text-sm text-red-700">
              {errors?.categoryId}
              {serverError?.categoryId}
            </p>
          </div>

          <div>
            <Input
              labelText="shortDescription"
              placeholder="Short Description"
              name="shortDescription"
              value={productInfo?.shortDescription}
              onChange={setProductInfos}
              Error={
                errors?.shortDescription ||
                serverError?.errors?.shortDescription
              }
              callback={() => {
                setErrors("");
                setServerError("");
              }}
            />
          </div>
          <div>
            <Input
              labelText="code"
              placeholder="Product code"
              name="code"
              value={productInfo?.code}
              onChange={setProductInfos}
              Error={errors?.code || serverError?.errors?.code}
              callback={() => {
                setErrors("");
                setServerError("");
              }}
            />
          </div>
          <div className="col-span-2">
            <Input
              labelText="description"
              placeholder="Description"
              name="description"
              value={productInfo?.description}
              onChange={setProductInfos}
              Error={errors?.description || serverError?.errors?.description}
              callback={() => {
                setErrors("");
                setServerError("");
              }}
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white-100 w-full py-2 rounded-md mr-1"
            onClick={getFormValidation}
          >
            {isLoading ? <FormSpinner /> : "Add Product"}
          </button>
          <button
            type="submit"
            className="w-full py-2 rounded-md border border-blue-600 ml-1 dark:text-white-100"
            onClick={() => setShowAddProductModal(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
