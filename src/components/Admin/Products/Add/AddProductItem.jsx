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
    colorId: [""],
    quantity: "",
    isMainItem: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { datas: colors } = useFetch("/color", adminAxios);
  const addItem = async (event) => {
    event.preventDefault();

    itemValidation(productItemInfo, errors, setErrors);

    // colorId: productItemInfo?.colorId.map((colorId) => ({ colorId })),
    let productItem = {
      colorId: productItemInfo?.colorId[0],
      isMainItem: productItemInfo?.isMainItem === "true" ? true : false,
      price: Number(productItemInfo?.price),
      productId: newProductId,
      quantity: Number(productItemInfo?.quantity),
      status: productItemInfo?.status == "false" ? 1 : 0,
    };

    setIsLoading(true);
    try {
      const response = await adminAxios.post(`/productItem`, productItem);
      setIsLoading(false);
      if (response.status === 200) {
        fetchProductList();
        setCreateItemInfo(productItem);
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
  const [createItemInfo, setCreateItemInfo] = useState([]);

  return (
    <div className="lg:w-[60rem] min-h-[27rem] max-w-10/12 bg-white-100 dark:bg-black-200  p-5 rounded-xl relative grid grid-cols-2">
      <div className="grid grid-cols-2 sm:gap-y-6 gap-y-3 gap-x-20 md:text-base sm:text-sm text-xs">
        <div className="font-semibold">Product Title:</div>
        <div>{createItemInfo && createItemInfo[0]?.productTitle}</div>
        <div className="font-semibold">Product price:</div>
        <div>{createItemInfo && createItemInfo[0]?.price}</div>
        <div className="font-semibold">Price:</div>
        <div>${createItemInfo && createItemInfo[0]?.quantity}</div>
        <div className="font-semibold">quantity:</div>
        <div>{createItemInfo && createItemInfo[0]?.quantity}</div>
        <div className="font-semibold">Color:</div>
        <div>{createItemInfo && createItemInfo[0]?.isMainItem}</div>
        <div className="font-semibold">isMainItem:</div>
        <div
          className={` " font-bold " ${
            createItemInfo && createItemInfo[0]?.status === 0
              ? "text-green-300"
              : "text-red-700"
          }`}
        >
          {createItemInfo && createItemInfo[0]?.status === 0
            ? "In Stock"
            : "Out of Stock"}
        </div>
        <div className="font-semibold">Is Main Item:</div>
        <div>{createItemInfo && createItemInfo[0]?.color ? "Yes" : "No"}</div>
      </div>

      <div>
        <span className="mb-5 text-xl font-bold flex justify-center dark:text-white-100">
          Add New Product Item
        </span>

        <form
          onSubmit={addItem}
          className="w-full mx-auto lg:px-2 px-4 bg-white rounded-lg"
        >
          <div
            className={` grid grid-cols-1 gap-y-7 gap-x-3 ${
              isLoading && "opacity-20"
            }`}
          >
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
                type="number"
                labelText="quantity"
                placeholder="Product quantity"
                name="quantity"
                className=""
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
          </div>

          <div className="grid grid-cols-2 mt-9">
            <button
              type="submit"
              className="bg-blue-600 text-white-100 w-full py- rounded-xl mr-2"
            >
              {isLoading ? <FormSpinner /> : "Add Product Item"}
            </button>
            <button
              type="submit"
              className="w-full py-2 rounded-xl ml-2 border dark:text-white-100"
              onClick={() => {
                setShowProductItem(false);
                setShowAddProductModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
