import React, { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faX,
} from "@fortawesome/free-solid-svg-icons";
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

export default function ShowProductItem({
  setShowInfo,
  productInfos,
  productFile,
  infosId,
  isLoading: dataLoading,
}) {
  const { datas: colors } = useFetch("/color", adminAxios);
  const [serverError, setServerError] = useState(null);
  const [productItemInfo, setProductItemInfo] = useState({
    colorId: "",
    isMainItem: true,
    price: null,
    productId: infosId,
    quantity: null,
    status: null,
  });
  const [color, setColor] = useState("");
  const [currentItem, setCurrentItem] = useState(0);
  const [itemLength, setItemLength] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [itemID, setItemID] = useState(null);
  const setProductInfos = (event) => {
    let value = event.target.value;

    if (event.target.type === "number") {
      value = parseFloat(value);
    }

    setProductItemInfo({
      ...productItemInfo,
      [event.target.name]: value,
    });
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await adminAxios.get(`/productItem/product/${infosId}`);
      if (response.status === 200) {
        setItemLength(response?.data.length);
        setColor(response?.data[currentItem]?.color);
        setItemID(response?.data[currentItem]?.id);
        setProductItemInfo({
          ...productItemInfo,
          ...response?.data,
        });
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
  }, [currentItem]);
  const editProductHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await adminAxios.post(
        `/productItem/edit/${itemID}`,
        productItemInfo[currentItem]
      );
      if (response.status === 200) {
        toast.success("Edit product is success");
        setShowInfo(false);
        setLoading(false);
      }
    } catch (error) {
      setServerError(error?.response?.data);
      setLoading(false);
    }
  };
  const nextItem = () => {
    setLoading(true);
    setCurrentItem((prevIndex) =>
      prevIndex === itemLength - 1 ? prevIndex : prevIndex + 1
    );
    fetchData();
    setLoading(false);
  };
  const prevItem = () => {
    setLoading(true);
    setCurrentItem((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
    fetchData();
    setLoading(false);
  };
  return (
    <>
      <FontAwesomeIcon
        icon={faX}
        className="text-red-700 absolute right-2 top-2 text-xl"
        onClick={() => setShowInfo(false)}
      />

      {isLoading || dataLoading ? (
        <Spinner />
      ) : (
        <form onSubmit={editProductHandler}>
          <div className="grid grid-cols-4 sm:overflow-hidden overflow-auto">
            <div className="sm:col-span-2 col-span-4">
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
                        className="object-contain sm:h-[25rem] h-[18rem]"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="sm:col-span-2 col-span-4">
              {productInfos?.length ? (
                <div>
                  <div className="flex justify-between">
                    <h2 className="text-xl font-bold mb-4 sm:text-start text-center">
                      Product Item {currentItem + 1}
                    </h2>
                    {itemLength > 1 && (
                      <div className="text-xl">
                        <FontAwesomeIcon
                          icon={faAngleLeft}
                          className="mr-4"
                          onClick={prevItem}
                        />
                        <FontAwesomeIcon
                          icon={faAngleRight}
                          className="ml-4"
                          onClick={nextItem}
                        />
                      </div>
                    )}
                  </div>
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
                          setProductItemInfo({
                            ...productItemInfo,
                            colorId: selectedValues,
                          });
                          setErrors("");
                        }}
                        defaultValue={{
                          value: productItemInfo[currentItem]?.colorId,
                          label: color,
                        }}
                        type="multiple"
                      />
                      <p className="text-sm text-red-700">{errors?.colorId}</p>
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
                          setProductItemInfo({
                            ...productItemInfo,
                            status: selectedOptions?.value,
                          });
                          setErrors("");
                        }}
                        defaultValue={{
                          value: productItemInfo[currentItem]?.status,
                          label:
                            productItemInfo[currentItem]?.status == 0
                              ? "in Active"
                              : "Publish",
                        }}
                      />
                      <p className="text-sm text-red-700">{errors?.status}</p>
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="isMainItem"
                        className="block text-gray-800 font-medium"
                      >
                        isMainItem
                      </label>
                      <CustomSelect
                        options={["false", "true"].map((item) => ({
                          value: item,
                          label: item,
                        }))}
                        onchange={(selectedOptions) => {
                          setProductItemInfo({
                            ...productItemInfo,
                            isMainItem:
                              selectedOptions?.value == "true" ? true : false,
                          });
                        }}
                        defaultValue={{
                          value: productItemInfo[currentItem]?.isMainItem,
                          label:
                            productItemInfo[currentItem]?.isMainItem == true
                              ? "true"
                              : "false",
                        }}
                      />
                      <p className="text-sm text-red-700">
                        {errors?.isMainItem}
                      </p>
                    </div>

                    <div>
                      <Input
                        type="number"
                        labelText="price"
                        placeholder="Product price"
                        name="price"
                        value={productItemInfo[currentItem]?.price}
                        onChange={setProductInfos}
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
                        value={productItemInfo[currentItem]?.quantity}
                        onChange={setProductInfos}
                        Error={
                          errors?.quantity || serverError?.errors?.quantity
                        }
                        callback={() => {
                          setErrors("");
                          setServerError("");
                        }}
                      />
                    </div>
                    <div className="col-span-2 grid grid-cols-2 mt-3">
                      <button
                        className=" bg-blue-600 py-2 rounded-lg text-white-100 mr-2"
                        onClick={editProductHandler}
                      >
                        Save
                      </button>
                      <button
                        className="border border-blue-600 rounded-lg ml-2"
                        onClick={() => setShowInfo(false)}
                      >
                        cacel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="font-bold my-20">No item has been registered</p>
              )}
            </div>
          </div>
        </form>
      )}
    </>
  );
}
