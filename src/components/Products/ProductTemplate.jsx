import React from "react";
import { Link } from "react-router-dom";
import userAxios from "../../services/Axios/userInterceptors";
import toast from "react-hot-toast";

export default function ProductTemplate({ product }) {
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
    <div className="p-2" key={product.id}>
      <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden dark:bg-black-800 hover:opacity-70 duration-300 lg:h-[27rem] sm:h-[24rem] h-[22rem] relative">
        <Link to={`/product/${product?.id}`}>
          <img
            src={product.fileUrl}
            alt="Product"
            className="object-contain m-auto w-10/12 lg:h-[18rem] sm:h-[15rem] h-[11rem]"
          />
        </Link>
        <div className="p-2">
          <Link to={`/product/${product?.id}`}>
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
              <div className="flex mt-2">
                <p
                  className={`mr-4 text-sm ${
                    product?.discountValue
                      ? `text-red-700`
                      : `text-gray-900 dark:text-white-100`
                  }`}
                >
                  {product?.discountValue
                    ? (
                        product?.price -
                        (product?.discountValue / 100) * product?.price
                      ).toFixed(1)
                    : product?.price}
                </p>
                <p className="line-through text-sm">
                  {product?.discountValue ? `$ ${product?.price}` : ""}
                </p>
              </div>
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
  );
}
