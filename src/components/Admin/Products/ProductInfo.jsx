import React from "react";
import ReactDOM from "react-dom";
import Spinner from "../../Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function ProductInfo({
  setShowInfo,
  isLoading,
  productInfos,
  productFile,
}) {
  return ReactDOM.createPortal(
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400">
      <div className="lg:w-8/12 w-11/12 sm:h-[29rem] dark:bg-black-200 dark:text-white-100 bg-white-100 rounded-xl sm:p-8 px-3 py-2 relative">
        <FontAwesomeIcon
          icon={faX}
          className="text-red-700 absolute right-2 top-2 text-xl"
          onClick={() => setShowInfo(false)}
        />

        {isLoading ? (
          <Spinner />
        ) : (
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
                    <div className="flex justify-center">
                      <img
                        src={`http://127.0.0.1:6060/${img.fileUrl}`}
                        className="object-contain sm:h-[25rem] h-[18rem]"
                      />
                    </div>
                  </SwiperSlide>
                ))}
                ...
              </Swiper>
            </div>
            <div className="sm:col-span-2 col-span-4">
              {productInfos?.length ? (
                <div>
                  <h2 className="text-xl font-bold sm:mb-10 mb-4 sm:text-start text-center">
                    Product Information
                  </h2>
                  <div className="grid grid-cols-2 sm:gap-y-6 gap-y-3 gap-x-20 md:text-base sm:text-sm text-xs">
                    <div className="font-semibold">Product Title:</div>
                    <div>{productInfos && productInfos[0]?.productTitle}</div>
                    <div className="font-semibold">Product Code:</div>
                    <div>{productInfos && productInfos[0]?.productCode}</div>
                    <div className="font-semibold">Price:</div>
                    <div>${productInfos && productInfos[0]?.price}</div>
                    <div className="font-semibold">Quantity:</div>
                    <div>{productInfos && productInfos[0]?.quantity}</div>
                    <div className="font-semibold">Color:</div>
                    <div>{productInfos && productInfos[0]?.color}</div>
                    <div className="font-semibold">Status:</div>
                    <div
                      className={` " font-bold " ${
                        productInfos && productInfos[0]?.status === 0
                          ? "text-green-300"
                          : "text-red-700"
                      }`}
                    >
                      {productInfos && productInfos[0]?.status === 0
                        ? "In Stock"
                        : "Out of Stock"}
                    </div>
                    <div className="font-semibold">Is Main Item:</div>
                    <div>
                      {productInfos && productInfos[0]?.color ? "Yes" : "No"}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="font-bold my-20">No item has been registered</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
}

{
  /* <img
  src={`http://127.0.0.1:6060/${img.fileUrl}`}
  className="object-contain h-full"
/>;
 */
}
