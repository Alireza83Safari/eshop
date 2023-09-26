import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Input from "../Input";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { CustomSelect } from "../../SelectList";
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-toastify";
import FormSpinner from "../../FormSpinner/FormSpinner";
import { itemValidation } from "../../../validators/itemValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function ShowProductItem({
  productFile,
  infosId,
  isLoading: dataLoading,
}) {
  const { datas: colors } = useFetch("/color", adminAxios);
  const [serverError, setServerError] = useState(null);
  const [totalProductItem, setTotalProductItem] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [editItemID, setEditItemID] = useState("");
  const [itemLength, setItemLength] = useState(null);
  const [colorName, setColorName] = useState("");

  const setProductInfos = (event) => {
    let value = event.target.value;

    if (event.target.type === "number") {
      value = parseFloat(value);
    }

    setEditItemValue({
      ...EditItemValue,
      [event.target.name]: value,
    });
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await adminAxios.get(`/productItem/product/${infosId}`);
      let $ = response.data;
      if (response.status === 200) {
        setItemLength(response?.data?.length);
        setTotalProductItem($);
        setEditItemValue({
          colorId: "",
          isMainItem: true,
          price: "",
          productId: infosId,
          quantity: "",
          status: "",
        });
        setColorName($.response.color);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (infosId) {
      fetchData();
    }
  }, []);

  const [EditItemValue, setEditItemValue] = useState({
    colorId: "",
    isMainItem: true,
    price: "",
    productId: infosId,
    quantity: null,
    status: null,
  });

  const editProductHandler = async (e) => {
    e.preventDefault();
    itemValidation(EditItemValue, errors, setErrors);
    setLoading(true);
    try {
      const response = await adminAxios.post(
        editItemID?.length ? `/productItem/edit/${editID}` : "/productItem",
        { ...EditItemValue, colorId: EditItemValue?.colorId[0] }
      );

      if (response.status === 200) {
        toast.success("Edit product is success");
        fetchData();
        setLoading(false);
      }
    } catch (error) {
      setServerError(error?.response?.data);
      setLoading(false);
    }
  };

  const [editID, setEditID] = useState(null);

  const editProductItemHandler = () => {
    let data = totalProductItem?.find((item) => item.id == editItemID);
    setEditItemValue({
      ...EditItemValue,
      colorId: data?.colorId,
      price: data?.price,
      quantity: data?.quantity,
      status: data?.status,
    });
    setColorName(data?.color);
    setEditID(data?.id);
  };
  useEffect(() => {
    if (editItemID?.length) {
      editProductItemHandler();
    }
  }, []);

  const deleteItemHandler = async (ID) => {
    const response = await adminAxios.post(`/productItem/delete/${ID}`);

    try {
      if (response.status == 200) {
        toast.success("delete is success");
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={editProductHandler}>
      <div
        className={`grid grid-cols-4 sm:overflow-hidden overflow-auto gap-x-10  ${
          (isLoading || dataLoading) && "opacity-10"
        }`}
      >
        <div className="sm:col-span-2 col-span-4">
          <div>
            {productFile?.length >= 1 ? (
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                {productFile?.map((img) => (
                  <SwiperSlide>
                    <div className="flex justify-center" key={img.id}>
                      <img
                        src={`http://127.0.0.1:6060/${img.fileUrl}`}
                        className="object-cover sm:h-[22rem] h-[18rem]"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full h-full bg-gray-50">
                <img src="/images/photo.jpg" className="object-cover" />
              </div>
            )}
          </div>

          <p className="text-red-700 text-center">{serverError?.message}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label
                htmlFor="colorId"
                className="block text-gray-800 font-medium"
              >
                color
              </label>
              <CustomSelect
                options={colors?.data.map((color) => ({
                  value: color.id,
                  label: color.name,
                }))}
                onchange={(selectedOptions) => {
                  const selectedValues = selectedOptions.map(
                    (option) => option.value
                  );
                  setEditItemValue({
                    ...EditItemValue,
                    colorId: selectedValues,
                  });
                  setErrors("");
                }}
                defaultValue={{
                  value: EditItemValue?.colorId,
                  label: colorName,
                }}
                type="multiple"
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
                onChange={setProductInfos}
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
                    status: selectedOptions?.value == "Publish" ? 0 : 1,
                  });
                  setErrors("");
                }}
                defaultValue={{
                  value: EditItemValue?.status,
                  label: EditItemValue?.status == 0 ? "in Active" : "Publish",
                }}
              />
              <p className="text-sm text-red-700">{errors?.status}</p>
            </div>

            <div>
              <Input
                type="number"
                labelText="price"
                placeholder="Product price"
                name="price"
                value={EditItemValue?.price}
                onChange={setProductInfos}
                Error={errors?.price || serverError?.errors?.price}
                callback={() => {
                  setErrors("");
                  setServerError("");
                }}
              />
            </div>

            <div className="col-span-2 mt-3">
              <button
                className={`bg-blue-600 py-2 w-full rounded-lg text-white-100 ${
                  (isLoading || dataLoading) && "py-4"
                }`}
                onClick={editProductHandler}
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

        <div className="sm:col-span-2 col-span-4">
          {itemLength != 0 ? (
            totalProductItem?.map((item) => (
              <div
                className="grid grid-cols-2 sm:gap-y-4 gap-y-3 md:text-base sm:text-sm text-xs border rounded-lg mb-6 px-10 py-4 relative hover:bg-gray-50 duration-300"
                onClick={() => {
                  setEditItemID(item.id);
                  editProductItemHandler(item.id);
                }}
              >
                <FontAwesomeIcon
                  icon={faX}
                  className=" absolute right-2 top-2 text-red-700 z-10"
                  onClick={() => deleteItemHandler(item.id)}
                />
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
            ))
          ) : (
            <p className="border rounded-lg my-6 px-10 py-20 font-bold text-lg">
              havent any product item for this
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
