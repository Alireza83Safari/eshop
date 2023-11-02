import React from "react";
import { Link } from "react-router-dom";
import userAxios from "../../services/Axios/userInterceptors";
import toast from "react-hot-toast";

export default function ProductTemplate({ mapData }) {
  const BasketHandler = async (data) => {
    let userBasketHandler = {
      productItemId: data?.itemId,
      quantity: 1,
    };
    try {
      const response = await userAxios.post("/orderItem", userBasketHandler);
      if (response?.status === 200) {
        toast.success(`${data?.name} added to cart!`, {
          position: "bottom-right",
        });
      }
    } catch (error) {}
  };

  return (
    <div className=" grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 col-span-12 mt-8 pb-14">
      {mapData?.length >= 1 ? (
        mapData?.map((product) => (
          <div className="p-2">
            <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden dark:bg-black-800 hover:opacity-70 duration-300 lg:h-[29rem] sm:h-[26rem] h-[22rem] relative">
              <Link to={`/product/${product.name?.replace(/ /g, "_")}`}>
                <img
                  src={`http://127.0.0.1:6060/${product.fileUrl}`}
                  alt="Product"
                  className="object-contain w-full lg:h-[18rem] sm:h-[15rem] h-[11rem]"
                />
              </Link>
              <div className="p-2">
                <Link to={`/product/${product.name?.replace(/ /g, "_")}`}>
                  <div className="flex justify-center">
                    <button className="text-gray-700 mb-4 mt-2 p-1 text-xs rounded-lg bg-green-400">
                      {product.categoryName}
                    </button>
                  </div>
                  <h2 className="font-bold mb-1 text-xs whitespace-pre-line dark:text-white-100 text-center">
                    {product.name}
                  </h2>
                </Link>
                <div className="flex items-center justify-between pt-1 absolute bottom-0 right-0 left-0 p-4 bg-white-100 dark:bg-black-800">
                  <p className="text-gray-900 font-bold dark:text-white-100 md:texs-base text-sm">
                    $ {product.price.toLocaleString()}
                  </p>
                  <button
                    className="md:px-4 sm:px-2 px-1 sm:py-2 py-1 bg-blue-600 text-white-100 rounded-lg hover:bg-blue-900 duration-200 md:texs-base text-xs"
                    onClick={() => {
                      BasketHandler(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center mt-32 lg:col-span-4 sm:col-span-3 col-span-2">
          <div>
            <img src="/images/not-found-product.svg" alt="" />
            <p className="text-center mt-8 text-lg font-bold dark:text-white-100">
              Product Not Found
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
