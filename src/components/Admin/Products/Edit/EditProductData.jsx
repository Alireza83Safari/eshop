import React, { useContext, useEffect, useState } from "react";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import { productFormValidation } from "../../../../validators/productFormValidation";
import useFetch from "../../../../hooks/useFetch";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { CustomSelect } from "../../../SelectList";
import Input from "../../Input";

export default function EditProductData({
  setShowEditProduct,
  setShowEditFile,
}) {
  const { setShowEditModal, showEditModal, editProductID, fetchProductList } =
    useContext(ProductsPanelContext);
  const [serverError, setServerError] = useState(false);
  const [productInfo, setProductInfo] = useState({
    brandId: "",
    name: "",
    categoryId: "",
    code: "",
    shortDescription: "",
    description: "",
    topFeatures: [" "],
  });
  const [categoryName, seCategoryName] = useState(null);
  const [brandName, setBrandName] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const setProductInfos = (event) => {
    setProductInfo({
      ...productInfo,
      [event.target.name]: event.target.value,
    });
  };
  const { datas: brands } = useFetch("/brand", adminAxios);
  const { datas: category } = useFetch("/category", adminAxios);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        adminAxios.get(`/product/${editProductID}`).then((infos) => {
          let $ = infos?.data;
          seCategoryName($.categoryName);
          setProductInfo({
            ...productInfo,
            brandId: $.brandId,
            name: $.name,
            categoryId: $.categoryId,
            code: $.code,
            shortDescription: $.shortDescription,
            description: $.description,
            topFeatures: $.topFeatures,
          });
          setBrandName($.brandName);
          seCategoryName($.categoryName);
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
  }, [showEditModal]);

  const editProductHandler = async () => {
    productFormValidation(productInfo, errors, setErrors);
    setLoading(true);
    try {
      const response = await adminAxios.post(
        `/product/edit/${editProductID}`,
        productInfo
      );
      if (response.status === 200) {
        setShowEditFile(true);
        setShowEditProduct(false);
        fetchProductList();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setServerError(error?.response?.data);
    }
  };

  return (
    <div className=" px-5">
      <span className="text-xl font-bold flex justify-center dark:text-white-100">
        Edit Product
      </span>

      <form
        className="w-full mx-auto bg-white rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <div
          className={` grid grid-cols-2 gap-4 text-sm mt-4 dark:text-white-100 ${
            isLoading && "opacity-20"
          }`}
        >
          <div className="col-span-2">
            <Input
              labelText="name"
              placeholder="Product Name"
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
            <Input
              labelText="topFeatures"
              placeholder="Product topFeatures"
              name="topFeatures"
              value={productInfo?.topFeatures}
              onChange={setProductInfos}
              Error={errors?.topFeatures || serverError?.errors?.topFeatures}
              callback={() => {
                setErrors("");
                setServerError("");
              }}
            />
          </div>

          <div>
            <label
              htmlFor="categoryId"
              className="block text-gray-800 dark:text-white-100 font-medium"
            >
              Category
            </label>
            <CustomSelect
              options={category?.data.map((category) => ({
                value: category.id,
                label: category.name,
              }))}
              onchange={(selectedOptions) => {
                setProductInfo({
                  ...productInfo,
                  categoryId: selectedOptions?.value,
                });
              }}
              defaultValue={{
                value: productInfo?.categoryId,
                label: categoryName,
              }}
            />
            <p className="text-sm text-red-700">
              {errors?.categoryId} {serverError?.errors?.categoryId}
            </p>
          </div>

          <div>
            <label
              htmlFor="brandId"
              className="block text-gray-800 dark:text-white-100 font-medium"
            >
              Brand
            </label>
            <CustomSelect
              options={brands?.data.map((brand) => ({
                value: brand.id,
                label: brand.name,
              }))}
              onchange={(selectedOptions) => {
                setProductInfo({
                  ...productInfo,
                  brandId: selectedOptions?.value,
                });
              }}
              defaultValue={{
                value: productInfo?.brandId,
                label: brandName,
              }}
            />

            <p className="text-sm text-red-700">
              {errors?.brandId} {serverError?.errors?.brandId}
            </p>
          </div>

          <div>
            <Input
              labelText="code"
              placeholder="Product Code"
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

          <div className="col-span-2">
            <Input
              labelText="description"
              placeholder="Description"
              name="description"
              value={productInfo?.description}
              onChange={setProductInfos}
              Error={errors?.description || serverError?.errors?.description}
            />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-blue-600 disabled:bg-gray-100 text-white-100 w-1/2 py-2 rounded-xl mr-2"
            onClick={editProductHandler}
          >
            {isLoading ? <FormSpinner /> : "Edit Product"}
          </button>
          <button
            type="submit"
            className="w-1/2 py-2 rounded-xl border ml-2 dark:text-white-100"
            onClick={() => {
              setShowEditModal(false);
              setShowEditFile(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
