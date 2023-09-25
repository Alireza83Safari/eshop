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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import userAxios from "../../../services/Axios/userInterceptors";
import { toast } from "react-toastify";

export default function ProductInfo({
  setShowInfo,
  isLoading: dataLoading,
  productFile,
  infosId,
  setShowProduct,
  setShowItem,
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
  });

  const [categoryName, seCategoryName] = useState("");
  const [brandName, setBrandName] = useState("");
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
        const infos = await adminAxios.get(`/product/${infosId}`);
        let $ = infos?.data;
        setBrandName($.brandName);
        seCategoryName($.categoryName);
        setProductInfo({
          ...productInfo,
          ...infos.data,
        });
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
        setShowProduct(false);
        setShowItem(true);
      }
    } catch (error) {
      setLoading(false);
      setServerError(error?.response?.data);
    }
  };

  const deleteImage = async (ID) => {
    try {
      const response = await userAxios.post(`/file/delete/${ID}`);
      if (response.status === 200) {
        toast.success("dlete is success");
      }
    } catch (error) {}
  };

  return (
    <>
      {isLoading || dataLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-4 sm:overflow-hidden overflow-auto">
          <div className="sm:col-span-2 col-span-4 px-10">
            {dataLoading ? (
              <Spinner />
            ) : productFile?.length ? (
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
              >
                {productFile?.map((img) => (
                  <SwiperSlide>
                    <div className="flex justify-center" key={img.id}>
                      <button
                        onClick={() => {
                          deleteImage(img.id);
                        }}
                        className="text-red-700 absolute text-xl right-0 z-10"
                      >
                        <FontAwesomeIcon icon={faX} />
                      </button>

                      <img
                        src={`http://127.0.0.1:6060/${img.fileUrl}`}
                        className="object-contain sm:h-[25rem] h-[18rem] relative"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <img src="/images/photo.jpg" alt="" />
            )}
          </div>

          <div
            className={` sm:col-span-2 col-span-4 grid grid-cols-2 gap-4 text-sm dark:text-white-100 min-w-full ${
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
                  label: String(categoryName),
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
            <div className="col-span-2 grid grid-cols-2 mt-4">
              <button
                type="submit"
                className="bg-blue-600 disabled:bg-gray-100 text-white-100 w-full py-2 rounded-xl"
                onClick={editProductHandler}
              >
                {isLoading ? <FormSpinner /> : "Save Product"}
              </button>
              <button
                type="submit"
                className="w-full py-2 rounded-xl border dark:text-white-100"
                onClick={() => {
                  setShowInfo(false);
                  setShowProduct(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
