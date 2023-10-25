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
  const initialProductItemInfo = {
    status: "",
    statusName: "",
    price: "",
    quantity: "",
    isMainItem: null,
    isMainName: null,
    productId: newProductId,
    colorId: "",
    color: "",
  };

  const [productItemInfo, setProductItemInfo] = useState(
    initialProductItemInfo
  );

  const [errors, setErrors] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [createItemInfo, setCreateItemInfo] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const { datas: colors } = useFetch("/color", adminAxios);

  const addItem = async (event) => {
    event.preventDefault();
    itemValidation(productItemInfo, errors, setErrors);

    let colneProductItemInfo = { ...productItemInfo };
    delete colneProductItemInfo.color;
    delete colneProductItemInfo.isMainName;
    delete colneProductItemInfo.statusName;

    setIsLoading(true);

    try {
      const response = await adminAxios.post(
        `/productItem`,
        colneProductItemInfo
      );
      setIsLoading(false);
      if (response.status === 200) {
        fetchProductList();
        setCreateItemInfo([...createItemInfo, productItemInfo]);
        setProductItemInfo(initialProductItemInfo);
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
    <div className="min-h-[31rem] max-h-[36rem] max-w-10/12 bg-white-100 dark:bg-black-200  p-5 rounded-xl relative grid grid-cols-2 gap-x-6 overflow-auto w-[64rem]">
      <div className="md:col-span-1 col-span-2">
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
                Product Status<span className="text-red-700">*</span>
              </label>
              <CustomSelect
                options={["in Active", "Publish"].map((status) => ({
                  value: status,
                  label: status,
                }))}
                onchange={(selectedOptions) => {
                  setProductItemInfo({
                    ...productItemInfo,
                    status: selectedOptions?.value == "in Active" ? 1 : 0,
                    statusName: selectedOptions?.label,
                  });
                  setErrors("");
                }}
                defaultValue={{
                  value: productItemInfo?.status,
                  label: productItemInfo?.statusName,
                }}
              />
              <p className="text-red-700">{errors?.status}</p>
            </div>
            <div>
              <label
                htmlFor="isMainItem"
                className="block text-gray-800 dark:text-white-100 font-medium"
              >
                isMainItem<span className="text-red-700">*</span>
              </label>
              <CustomSelect
                options={[
                  { value: true, label: "true" },
                  { value: false, label: "false" },
                ]}
                onchange={(selectedOption) => {
                  setProductItemInfo({
                    ...productItemInfo,
                    isMainItem: selectedOption?.value,
                    isMainName: selectedOption?.label,
                  });
                  setErrors("");
                }}
                defaultValue={{
                  value: productItemInfo?.isMainItem,
                  label: productItemInfo?.isMainName,
                }}
              />
              <p className="text-red-700">{errors?.isMainItem}</p>
            </div>

            <div>
              <label
                htmlFor="colorId"
                className="block text-gray-800 dark:text-white-100 font-medium"
              >
                Color<span className="text-red-700">*</span>
              </label>
              <CustomSelect
                options={colors?.data.map((color) => ({
                  value: color.id,
                  label: color.name,
                }))}
                onchange={(selectedOptions) => {
                  setProductItemInfo({
                    ...productItemInfo,
                    colorId: selectedOptions?.value,
                    color: selectedOptions?.label,
                  });
                  setErrors("");
                }}
                onFocus={() => setErrors("")}
                defaultValue={{
                  value: productItemInfo?.colorId,
                  label: productItemInfo?.color,
                }}
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
      {createItemInfo?.length ? (
        <div className="md:col-span-1 col-span-2 overflow-auto">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {createItemInfo.length < 1 ? null : (
                <>
                  <button
                    className="bg-blue-600 text-white-100 px-3 py-1 rounded-md mb-2 text-sm"
                    onClick={() => {
                      setShowProductItem(false);
                      setShowProductFeature(true);
                    }}
                  >
                    Click To Add Feature
                  </button>
                  {createItemInfo?.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-2 sm:gap-y-4 gap-y-3 md:text-base sm:text-sm text-xs border rounded-lg mb-6 px-10 py-4 relative hover:bg-gray-50 duration-300"
                    >
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
      ) : (
        <div className="text-xl font-semibold flex justify-center items-center md:col-span-1 col-span-2 overflow-auto my-10">
          there is no item
        </div>
      )}
    </div>
  );
}
