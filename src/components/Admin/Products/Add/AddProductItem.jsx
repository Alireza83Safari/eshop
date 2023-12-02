import React, { useState, useContext, useEffect } from "react";
import useFetch from "../../../../hooks/useFetch";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import FormSpinner from "../../../FormSpinner/FormSpinner";
import { CustomSelect } from "../../../SelectList";
import Input from "../../Input";
import Spinner from "../../../Spinner/Spinner";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import productItemSchema from "../../../../validations/productItem";

export default function AddProductItem({
  setShowProductFeature,
  setShowProductItem,
}) {
  const { fetchProductList, newProductId, setShowAddProductModal } =
    useContext(ProductsPanelContext);

  const [productItemInfo, setProductItemInfo] = useState({
    status: "",
    statusName: "",
    price: null,
    quantity: null,
    isMainItem: null,
    isMainName: null,
    productId: newProductId,
    colorId: "",
    color: "",
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [errors, setErrors] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [createItemInfo, setCreateItemInfo] = useState([]);

  const [isLoading, setLoading] = useState(false);
  const { datas: colors } = useFetch("/color", adminAxios);

  const getFormValidation = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const isValid = await productItemSchema.validate(productItemInfo, {
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
      setLoading(false);
      setErrors(errors);
    }
  };

  const addItem = async () => {
    try {
      let colneProductItemInfo = { ...productItemInfo };
      delete colneProductItemInfo.color;
      delete colneProductItemInfo.isMainName;
      delete colneProductItemInfo.statusName;
      setLoading(true);
      const response = await adminAxios.post(
        `/productItem`,
        colneProductItemInfo
      );
      if (response.status === 200) {
        fetchProductList();
        setCreateItemInfo([...createItemInfo, productItemInfo]);
        setProductItemInfo({
          status: "",
          statusName: "",
          price: 0,
          quantity: 0,
          isMainItem: null,
          isMainName: null,
          productId: newProductId,
          colorId: "",
          color: "",
        });
        setLoading(false);
      }
    } catch (error) {
      setServerError(error?.response?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formIsValid) {
      addItem();
    }
  }, [formIsValid]);

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
        <form
          onSubmit={getFormValidation}
          className="w-full mx-auto bg-white rounded-lg"
        >
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
                isMainItem
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
                Color
              </label>
              <CustomSelect
                options={colors?.data?.map((color) => ({
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
                      className="grid grid-cols-2 sm:gap-y-4 gap-y-3 md:text-base sm:text-sm text-xs border rounded-lg mb-6 px-10 py-4 relative dark:text-white-100 hover:bg-gray-50 duration-300"
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
        <div className="text-xl font-semibold flex justify-center items-center md:col-span-1 col-span-2 overflow-auto my-10 dark:text-white-100">
          there is no item
        </div>
      )}
    </div>
  );
}
