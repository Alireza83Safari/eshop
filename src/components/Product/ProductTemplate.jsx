import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import userAxios from "../../services/Axios/userInterceptors";

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
    <section key={product.id} className="p-2">
      <div className="bg-white rounded-lg shadow-lg hover:shadow-2xl overflow-hidden dark:bg-black-800 hover:opacity-70 duration-300 lg:h-[30rem] sm:h-[26rem] h-[22rem] relative">
        <Link to={`/products/${product.name}`}>
          <img
            src={`http://127.0.0.1:6060/${product.fileUrl}`}
            alt="Product"
            className="object-contain w-full lg:h-[18rem] sm:h-[14rem] h-[11rem]"
          />
        </Link>
        <div className="p-6">
          <Link to={`/products/${product.id}`}>
            <div className="flex justify-center">
              <button className="text-gray-700 mb-4 p-1 text-xs rounded-lg bg-green-400">
                {product.categoryName}
              </button>
            </div>
            <h2 className="font-bold mb-2 md:text-base sm:text-sm whitespace-pre-line dark:text-white-100 text-center">
              {product.name}
            </h2>
          </Link>
          <div className="flex items-center justify-between pt-2 absolute bottom-0 right-0 left-0 p-4 bg-white-100 dark:bg-black-800">
            <p className="text-gray-900 font-bold dark:text-white-100 md:texs-base text-sm">
              $ {product.price}
            </p>
            <button
              className="md:px-4 px-2 md:py-2 py-2 bg-blue-600 text-white-100 rounded-lg hover:bg-blue-900 duration-200 md:texs-base text-xs"
              onClick={() => {
                BasketHandler(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
