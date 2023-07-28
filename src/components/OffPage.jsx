import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productsContext from "../Context/productsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../Style/Style.css";
import { ToastContainer, toast } from "react-toastify";
import Timer from "./Timer";

export default function OffPage() {
  const { getProducts, setCheckOut } = useContext(productsContext);
  const [currentProductIndex, setCurrentProductIndex] = useState(4);

  const productsPerSlide = 4;

  const goToNextProduct = () => {
    if (currentProductIndex === 20) {
      setCurrentProductIndex(0);
    }
    setCurrentProductIndex((prevIndex) =>
      prevIndex === getProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousProduct = () => {
    setCurrentProductIndex((prevIndex) =>
      prevIndex === 0 ? getProducts.length - 1 : prevIndex - 1
    );
    if (currentProductIndex === 0) {
      setCurrentProductIndex(20);
    }
  };

  const handleAddToCart = (productID) => {
    var findProduct = getProducts.find((product) => product.id === productID);
    toast.success(`${findProduct.name} added to cart!`, {
      position: "bottom-right",
    });

    const newProduct = {
      ...findProduct,
    };

    setCheckOut((prev) => [...prev, newProduct]);
  };

  return (
    <div className=" my-32">
      <div className="flex items-center md:px-8 px-2">
        <Timer days={2} />
        <div className="w-full h-1 bg-blue-600"></div>
      </div>

      <div className="lg:p-6 p-2 mt-5">
        <p className="pb-3 lg:text-xl font-bold text-center text-black-900 dark:text-white-100">
          Top selling Products
        </p>

        <div className="grid grid-cols-4 h-full border rounded-xl relative ">
          <button
            className="absolute top-48 w-12 h-12 left-2 z-10 bg-white-200 rounded-full"
            onClick={() => goToPreviousProduct()}
          >
            <FontAwesomeIcon icon={faAngleLeft} className="text-2xl" />
          </button>
          {getProducts
            .slice(currentProductIndex, currentProductIndex + productsPerSlide)
            .map((product, index) => (
              <div
                className={`  ${
                  index === productsPerSlide - 1 ? "" : "border-r"
                } overflow-hidden dark:bg-black-800 hover:opacity-70 duration-200 promotion  `}
                key={product.id}
              >
                <div className="">
                  <Link to={`/shop/products/${product.id}`}>
                    <img
                      src={product.img}
                      alt="Product"
                      className="lg:h-[300px] md:h-[240px] sm:h-[200px] h-[180px] w-full xl:p-10 p-4 relative object-contain product-img"
                    />
                  </Link>
                  <button
                    className="flex items-center justify-center absolute md:w-10 md:h-10 w-7 h-7 rounded-full xl:bottom-32 lg:bottom-24 md:bottom-20 bottom-16 right-4 z-10 border border-blue-600"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <FontAwesomeIcon
                      icon={faPlus}
                      className="md:text-xl text-lg text-blue-600"
                    />
                  </button>
                </div>
                <div className="lg:p-6 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <p className="font-bold dark:text-white-100 lg:text-lg md:text-xs text-[8px] whitespace-nowrap mr-4 line-through text-gray-200">
                        $ {product.price}
                      </p>
                      <p className="font-bold dark:text-white-100 lg:text-lg md:text-xs text-[8px] whitespace-nowrap">
                        $ {product.price / 2}
                      </p>
                    </div>
                    <span className="md:p-2 p-1 lg:text-sm md:text-xs text-[8px] text-white-100 bg-red-700 rounded-full">
                      %50
                    </span>
                  </div>
                </div>
              </div>
            ))}
          <button
            className="absolute top-48 w-12 h-12 right-2 z-10 bg-white-200 rounded-full"
            onClick={() => goToNextProduct()}
          >
            <FontAwesomeIcon icon={faAngleRight} className="text-2xl" />
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
