import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Input from "../Input";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { CustomSelect } from "../../SelectList";
import useFetch from "../../../hooks/useFetch";
import FormSpinner from "../../FormSpinner/FormSpinner";
import productItemSchema from "../../../validators/productItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../Spinner/Spinner";
import toast from "react-hot-toast";

export default function ShowProductItem({
  infosId,
  isLoading: dataLoading,
  fetchProductList,
}) {
  const { datas: colors } = useFetch("/color", adminAxios);
  const [serverError, setServerError] = useState(null);
  const [totalProductItem, setTotalProductItem] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [editItemID, setEditItemID] = useState("");
  const [totalItemLength, setTotalItemLength] = useState(null);
  const initialProductItemInfo = {
    colorId: "",
    isMainItem: true,
    price: null,
    productId: infosId,
    quantity: null,
    status: null,
    color: "",
    statusName: "",
  };

  const [EditItemValue, setEditItemValue] = useState(initialProductItemInfo);
  const [editID, setEditID] = useState(null);
  const [formIsValid, setFormIsValid] = useState(false);

  const setInputValues = (event) => {
    let value = event.target.value;

    if (event.target.type === "number") {
      value = parseFloat(value);
    }

    setEditItemValue({
      ...EditItemValue,
      [event.target.name]: value,
    });
  };

  const fetchProductItem = async () => {
    setLoading(true);
    try {
      const response = await adminAxios.get(`/productItem/product/${infosId}`);
      if (response.status === 200) {
        setTotalItemLength(response.data?.length);
        setTotalProductItem(response.data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (infosId) {
      fetchProductItem();
    }
  }, []);

  const editItemData = async () => {
    setLoading(true);
    let data = await totalProductItem?.find((item) => item.id == editItemID);
    setEditItemValue({
      ...EditItemValue,
      colorId: data?.colorId,
      price: data?.price,
      quantity: data?.quantity,
      status: data?.status,
      color: data?.color,
    });

    setEditID(data?.id);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    editItemData();
  }, [editItemID]);

  const deleteItemHandler = async (ID) => {
    const response = await adminAxios.post(`/productItem/delete/${ID}`);

    try {
      if (response.status == 200) {
        fetchProductItem();
        toast.success("delete is success");
      }
    } catch (error) {}
  };

  const editProductItemHandler = async () => {
    setLoading(true);

    try {
      const isValid = await productItemSchema.validate(EditItemValue, {
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

    try {
      setLoading(true);
      if (formIsValid) {
        const response = await adminAxios.post(
          editItemID?.length ? `/productItem/edit/${editID}` : "/productItem",
          EditItemValue
        );

        if (response.status === 200) {
          toast.success("Add product Item is success");
          fetchProductItem();
          fetchProductList();
          setLoading(false);
          setEditItemValue(initialProductItemInfo);
        }
      }
      setLoading(false);
    } catch (error) {
      setServerError(error?.response?.data);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {isLoading || dataLoading ? (
        <Spinner />
      ) : (
        <div
          className={`grid grid-cols-4  overflow-auto gap-x-10 ${
            (isLoading || dataLoading) && "opacity-10"
          }`}
        >
          <div className="md:col-span-2 col-span-4 order-2">
            <p className="text-red-700 text-center">{serverError?.message}</p>
            <div className="grid grid-cols-2 gap-y-6">
              <div className="col-span-2">
                <label
                  htmlFor="colorId"
                  className="block text-gray-800 font-medium"
                >
                  color
                </label>

                <CustomSelect
                  options={colors?.data?.map((color) => ({
                    value: color.id,
                    label: color.name,
                  }))}
                  onchange={(selectedOptions) => {
                    setEditItemValue({
                      ...EditItemValue,
                      colorId: selectedOptions?.value,
                      color: selectedOptions?.label,
                    });
                  }}
                  onFocus={() => {
                    setErrors("");
                    setServerError("");
                  }}
                  defaultValue={{
                    value: EditItemValue?.colorId,
                    label: EditItemValue?.color,
                  }}
                />
                <p className="text-sm text-red-700">{errors?.colorId}</p>
              </div>

              <div className="col-span-2">
                <Input
                  type="number"
                  labelText="quantity"
                  placeholder="Product quantity"
                  name="quantity"
                  value={EditItemValue?.quantity}
                  onChange={setInputValues}
                  Error={errors?.quantity || serverError?.errors?.quantity}
                  callback={() => {
                    setErrors("");
                    setServerError("");
                  }}
                />
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="status"
                  className="block text-gray-800 font-medium"
                >
                  status
                </label>
                <CustomSelect
                  options={["Publish", "in Active"].map((item) => ({
                    value: item,
                    label: item,
                  }))}
                  onchange={(selectedOptions) => {
                    setEditItemValue({
                      ...EditItemValue,
                      status: selectedOptions?.value === "Publish" ? 0 : 1,
                    });
                  }}
                  defaultValue={{
                    value: EditItemValue?.status,
                    label: EditItemValue?.status == 0 ? "Publish" : "in Active",
                  }}
                />
                <p className="text-sm text-red-700">{errors?.status}</p>
              </div>

              <div className="col-span-2">
                <Input
                  type="number"
                  labelText="price"
                  placeholder="Product price"
                  name="price"
                  value={EditItemValue?.price}
                  onChange={setInputValues}
                  Error={errors?.price || serverError?.errors?.price}
                  callback={() => {
                    setErrors("");
                    setServerError("");
                  }}
                />
              </div>

              <div className="col-span-2 mt-6">
                <button
                  className={`bg-blue-600 py-2 w-full rounded-lg text-white-100 ${
                    (isLoading || dataLoading) && "py-4"
                  }`}
                  onClick={editProductItemHandler}
                >
                  {isLoading || dataLoading ? (
                    <FormSpinner />
                  ) : editItemID?.length ? (
                    "Edit Item"
                  ) : (
                    "Add Item"
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 col-span-4 md:order-2">
            {totalItemLength != 0 ? (
              totalProductItem?.map((item) => (
                <div className="relative">
                  <div className="z-10">
                    <FontAwesomeIcon
                      icon={faX}
                      className="absolute right-2 top-2 text-red-700 z-20 "
                      onClick={() => deleteItemHandler(item.id)}
                    />
                  </div>
                  <div
                    className="grid grid-cols-2 sm:gap-y-4 gap-y-3 md:text-base text-sm border rounded-lg mb-6 px-10 py-4 relative hover:bg-gray-50 duration-300"
                    onClick={() => {
                      setEditItemID(item.id);
                      editItemData(item.id);
                    }}
                  >
                    <div className="font-semibold">productTitle :</div>
                    <div>{item?.productTitle}</div>
                    <div className="font-semibold">Product Color:</div>
                    <div>{item?.color}</div>
                    <div className="font-semibold">Price:</div>
                    <div>${item?.price}</div>
                    <div className="font-semibold">quantity:</div>
                    <div>{item?.quantity}</div>
                    <div className="font-semibold">productCode:</div>
                    <div>{item?.productCode}</div>
                    <div className="font-semibold">status:</div>
                    <div>{item?.status}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="border rounded-lg my-6 px-10 py-20 font-bold text-lg">
                havent any product item for this
              </p>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
