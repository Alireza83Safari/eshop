import React from "react";
import ReactDOM from "react-dom";
import Spinner from "../../Spinner/Spinner";

export default function ProductInfo({
  setShowInfo,
  isLoading,
  productInfos,
  productFile,
}) {
  return ReactDOM.createPortal(
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white-100 rounded-md p-6 shadow-lg max-w-sm px-10">
        <h2 className="text-xl font-semibold mb-10 text-center">
          Product Information
        </h2>
        {isLoading ? (
          <Spinner />
        ) : productInfos?.length ? (
          <div>
            <div>
              {productFile?.map((img) => (
                <img src={img.fileUrl} />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-20">
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
              <div>{productInfos && productInfos[0]?.color ? "Yes" : "No"}</div>
            </div>
          </div>
        ) : (
          <p className="font-bold my-20">No item has been registered</p>
        )}

        <button
          onClick={() => setShowInfo(false)}
          className="mt-6 px-4 py-2 rounded-md w-full font-bold text-blue-600 border border-blue-600"
        >
          Close
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
