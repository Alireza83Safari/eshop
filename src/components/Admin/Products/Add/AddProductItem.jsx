import React, { useState, useContext } from "react";
import useFetch from "../../../../hooks/useFetch";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import { itemValidation } from "../../../../validators/itemValidation";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { CustomSelect } from "../../../SelectList";
import Input from "../../Input";

export default function AddProductItem({
  setShowProductFeature,
  setShowProductItem,
}) {
  const { fetchProductList, newProductId, setShowAddProductModal } =
    useContext(ProductsPanelContext);

  const [errors, setErrors] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [productItemInfo, setProductItemInfo] = useState({
    status: "",
    price: "",
    colorId: "",
    quantity: "",
    isMainItem: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { datas: colors } = useFetch("/color", adminAxios);
  const addItem = async (event) => {
    event.preventDefault();

    itemValidation(productItemInfo, errors, setErrors);

    let productItem = {
      colorId: productItemInfo?.colorId[0],
      isMainItem: productItemInfo?.isMainItem === "true" ? true : false,
      price: Number(productItemInfo?.price),
      productId: newProductId,
      quantity: Number(productItemInfo?.quantity),
      status: Number(productItemInfo?.status),
    };
    setIsLoading(true);
    try {
      const response = await adminAxios.post(`/productItem`, productItem);
      setIsLoading(false);
      if (response.status === 200) {
        setShowProductFeature(true);
        setShowProductItem(false);
        fetchProductList();
      }
    } catch (error) {
      setServerError(error?.response?.data);
      setIsLoading(false);
    }
  };

  const setProductItemInfos = (event) => {
    setProductItemInfo({
      ...productItemInfo,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <span className="mb-5 text-xl font-bold flex justify-center">
        Add New Product Item
      </span>

      <form
        onSubmit={addItem}
        className="w-full mx-auto lg:px-2 px-4 bg-white rounded-lg"
      >
        <div className={` grid grid-cols-1 gap-4 ${isLoading && "opacity-20"}`}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label
                htmlFor="colorId"
                className="block text-gray-800 dark:text-white-100 font-medium"
              >
                Color
              </label>
              <CustomSelect
                options={colors?.data.map((brand) => ({
                  value: brand.id,
                  label: brand.name,
                }))}
                onchange={(selectedOptions) => {
                  const selectedValues = selectedOptions.map(
                    (option) => option.value
                  );
                  setProductItemInfo({
                    ...productItemInfo,
                    colorId: selectedValues,
                  });
                  setErrors("");
                }}
                type="multiple"
              />
              <p className="text-red-700">{errors?.colorId}</p>
            </div>

            <div>
              <Input
                type="number"
                labelText="price"
                placeholder="Product price"
                name="price"
                value={productItemInfo?.price}
                onChange={setProductItemInfos}
                Error={errors?.price || serverError?.errors?.price}
                callback={() => {
                  setErrors("");
                  setServerError("");
                }}
              />
            </div>

            <div>
              <Input
                labelText="quantity"
                placeholder="Product quantity"
                name="quantity"
                value={productItemInfo?.quantity}
                onChange={setProductItemInfos}
                Error={errors?.quantity || serverError?.errors?.quantity}
                callback={() => {
                  setErrors("");
                  setServerError("");
                }}
              />
            </div>
            <div>
              <label
                htmlFor="status"
                className="block text-gray-800 dark:text-white-100 font-medium"
              >
                Product Status
              </label>
              <CustomSelect
                options={["true", "false"].map((status) => ({
                  value: status,
                  label: status,
                }))}
                onchange={(selectedOptions) => {
                  setProductItemInfo({
                    ...productItemInfo,
                    status: selectedOptions?.value,
                  });
                  setErrors("");
                }}
              />
              <p className="text-red-700">{errors?.status}</p>
            </div>

            <div>
              <label
                htmlFor="isMainItem"
                className="block text-gray-800 dark:text-white-100 font-medium"
              >
                isMainItem
              </label>
              <CustomSelect
                options={["true", "false"].map((isMain) => ({
                  value: isMain,
                  label: isMain,
                }))}
                onchange={(selectedOptions) => {
                  setProductItemInfo({
                    ...productItemInfo,
                    isMainItem: selectedOptions?.value,
                  });
                  setErrors("");
                }}
              />
              <p className="text-red-700">{errors?.isMainItem}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2"
          >
            {isLoading ? <FormSpinner /> : "Add Product Item"}
          </button>
          <button
            type="submit"
            className="w-full py-2 rounded-xl mr-2 border dark:text-white-100"
            onClick={() => {
              setShowProductItem(false);
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
