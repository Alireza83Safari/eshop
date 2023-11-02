import React, { useEffect, useState } from "react";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { productFormValidation } from "../../../validators/productFormValidation";
import useFetch from "../../../hooks/useFetch";
import FormSpinner from "../../FormSpinner/FormSpinner";
import { CustomSelect } from "../../SelectList";
import Input from "../Input";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Spinner from "../../Spinner/Spinner";
import toast from "react-hot-toast";

export default function ProductInfo({
  isLoading: dataLoading,
  productFile,
  infosId,
  fetchProductList,
}) {
  const [serverError, setServerError] = useState(false);
  const [productInfo, setProductInfo] = useState({
    brandId: "",
    name: "",
    categoryId: "",
    code: "",
    shortDescription: "",
    description: "",
    topFeatures: [" "],
    categoryName: "",
  });

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

  const fetchData = async () => {
    setLoading(true);
    try {
      const infos = await adminAxios.get(`/product/${infosId}`);
      let $ = infos?.data;

      setProductInfo($);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (infosId) {
      fetchData();
    }
  }, [infosId]);
  const editProductHandler = async () => {
    productFormValidation(productInfo, errors, setErrors);
    setLoading(true);
    try {
      const response = await adminAxios.post(
        `/product/edit/${infosId}`,
        productInfo
      );
      if (response.status === 200) {
        setLoading(false);
        fetchProductList();
        toast.success("edit product is success");
      }
    } catch (error) {
      setLoading(false);
      setServerError(error?.response?.data);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-4 sm:overflow-hidden overflow-auto max-h-[100%]">
          <div
            className={`md:col-span-2 col-span-4 px-10 ${
              (isLoading || dataLoading) && "opacity-10"
            }`}
          >
            {productFile?.length ? (
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                {productFile?.map((img) => (
                  <SwiperSlide key={img.id}>
                    <div className="flex justify-center">
                      <div className="h-full w-full">
                        <img
                          src={`http://127.0.0.1:6060/${img.fileUrl}`}
                          className="object-contain max-w-full h-auto"
                          alt=""
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img src="/images/photo.jpg" alt="empty" />
            )}
          </div>

          <div
            className={` md:col-span-2 col-span-4 grid grid-cols-2 gap-4 text-sm dark:text-white-100 min-w-full ${
              isLoading && "opacity-20"
            }`}
          >
            <div>
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
                    categoryName: selectedOptions?.label,
                  });
                }}
                defaultValue={{
                  value: productInfo?.categoryId,
                  label: productInfo?.categoryName,
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
                    brandName: selectedOptions?.label,
                  });
                }}
                defaultValue={{
                  value: productInfo?.brandId,
                  label: productInfo?.brandName,
                }}
              />

              <p className="text-sm text-red-700">
                {errors?.brandId} {serverError?.errors?.brandId}
              </p>
            </div>

            <div className="col-span-2">
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
              <label
                htmlFor="name"
                className="block text-gray-800 dark:text-white-100 font-medium"
              >
                description
              </label>
              <textarea
                placeholder="Description"
                rows={5}
                className="border p-2 w-full rounded-lg outline-none focus:border-blue-600 dark:bg-black-200 dark:text-white-100 placeholder:text-sm placeholder:text-black-900 dark:placeholder:text-white-100"
                name="description"
                value={productInfo?.description}
                onChange={setProductInfos}
              />
            </div>
            <div className="col-span-2 mt-4">
              <button
                type="submit"
                className={`bg-blue-600 disabled:bg-gray-100 text-white-100 w-full py-2 rounded-xl ${
                  (isLoading || dataLoading) && "py-5"
                }`}
                onClick={editProductHandler}
              >
                {isLoading || dataLoading ? <FormSpinner /> : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
