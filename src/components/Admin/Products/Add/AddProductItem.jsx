import React, { useState, useContext } from "react";
import useFetch from "../../../../hooks/useFetch";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import { itemValidation } from "../../../../validators/itemValidation";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { CustomSelect } from "../../../SelectList";
import Input from "../../Input";
import Spinner from "../../../Spinner/Spinner";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

export default function AddProductItem({
  setShowProductFeature,
  setShowProductItem,
}) {
  const { fetchProductList, newProductId, setShowAddProductModal } =
    useContext(ProductsPanelContext);

  const [errors, setErrors] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [createItemInfo, setCreateItemInfo] = useState([]);
  const [productItemInfo, setProductItemInfo] = useState({
    status: "",
    price: "",
    colorId: [""],
    quantity: "",
    isMainItem: "",
    productId: newProductId,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { datas: colors } = useFetch("/color", adminAxios);

  const addItem = async (event) => {
    event.preventDefault();
    itemValidation(productItemInfo, errors, setErrors);

    setIsLoading(true);
    try {
      const response = await adminAxios.post(`/productItem`, {
        ...productItemInfo,
        colorId: productItemInfo.colorId[0],
      });
      setIsLoading(false);
      if (response.status === 200) {
        fetchProductList();
        setCreateItemInfo([...createItemInfo, productItemInfo]);
        setProductItemInfo({
          status: "",
          price: "",
          colorId: [""],
          quantity: "",
          isMainItem: "",
          productId: newProductId,
        });
      }
    } catch (error) {
      setServerError(error?.response?.data);
      setIsLoading(false);
    }
  };

  const setProductItemInfos = (event) => {
    let value = event.target.value;

    if (event.target.type === "number") {
      value = parseFloat(value);
    }

    setProductItemInfo({
      ...productItemInfo,
      [event.target.name]: value,
    });
  };

  const deleteItemHandler = async (ID) => {
    const response = await adminAxios.post(`/productItem/delete/${ID}`);

    try {
      if (response.status == 200) {
        toast.success("delete is success");
      }
    } catch (error) {}
  };

  return (
    <div
      className={`min-h-[31rem] max-h-[36rem] max-w-10/12 bg-white-100 dark:bg-black-200  p-5 rounded-xl relative grid grid-cols-2 gap-x-6 overflow-auto ${
        createItemInfo.length >= 1 ? "w-[64rem]" : "w-[30rem]"
      }`}
    >
      <div
        className={`${
          createItemInfo.length >= 1 ? "md:col-span-1 col-span-2" : "col-span-2"
        }`}
      >
        <span className="mb-5 text-xl font-bold flex justify-center dark:text-white-100">
          Add New Product Item
        </span>
        <p className="text-xs text-red-700 text-center">
          {serverError?.message}
        </p>
        <form onSubmit={addItem} className="w-full mx-auto bg-white rounded-lg">
          <div
            className={` grid grid-cols-1 gap-y-4 gap-x-3 ${
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
                options={["in Active", "Publish"].map((status) => ({
                  value: status,
                  label: status,
                }))}
                onchange={(selectedOptions) => {
                  setProductItemInfo({
                    ...productItemInfo,
                    status: selectedOptions?.status == "in Active" ? 1 : 0,
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
                    isMainItem: selectedOptions?.value == "true" ? true : false,
                  });
                  setErrors("");
                }}
              />
              <p className="text-red-700">{errors?.isMainItem}</p>
            </div>
            <div>
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

      <div className="md:col-span-1 col-span-2 overflow-auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {createItemInfo.length < 1 ? null : (
              <>
                <button
                  className="bg-blue-600 text-white-100 px-3 py-1 rounded-lg mb-2 text-sm"
                  onClick={() => {
                    setShowProductItem(false);
                    setShowProductFeature(true);
                  }}
                >
                  Click To Add Feature
                </button>
                {createItemInfo?.map((item) => (
                  <div className="grid grid-cols-2 sm:gap-y-4 gap-y-3 md:text-base sm:text-sm text-xs border rounded-lg mb-6 px-10 py-4 relative hover:bg-gray-50 duration-300">
                    <FontAwesomeIcon
                      icon={faX}
                      className=" absolute right-2 top-2 text-red-700 z-10"
                      onClick={() => deleteItemHandler(item.id)}
                    />

                    <div className="font-semibold">Product Color:</div>
                    <div>
                      {colors?.data
                        .filter((color) => color.id == item?.colorId)
                        ?.map((color) => color.name)}
                    </div>
                    <div className="font-semibold">Price:</div>
                    <div>{item?.price}$</div>
                    <div className="font-semibold">quantity:</div>
                    <div>{item?.quantity}</div>

                    <div className="font-semibold">status:</div>
                    <div>{item?.status == 0 ? "Publish" : "in Active"}</div>
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
