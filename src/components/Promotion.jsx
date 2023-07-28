import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import productsContext from "../Context/productsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "../Style/Style.css";
import { ToastContainer, toast } from "react-toastify";

export default function Promotion() {
  const { getProducts , setCheckOut } = useContext(productsContext);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

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
    <div className="lg:p-6 p-2 mt-20">
      <p className="pb-3 lg:text-xl font-bold text-center">
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
              <Link to={`/shop/products/${product.id}`}>
                <img
                  src={product.img}
                  alt="Product"
                  className="lg:h-[300px] md:h-[240px] sm:h-[200px] h-[180px] w-full xl:p-10 p-4 relative object-contain product-img"
                />
              </Link>
              <div className="lg:p-6 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-bold dark:text-white-100 lg:text-sm md:text-xs text-[8px] whitespace-nowrap">
                    $ {product.price}
                  </p>
                  <button
                    className="md:px-4 sm:px-2 px-1 md:py-2 py-1 bg-blue-600 text-white-100 lg:text-sm md:text-xs text-[7px] whitespace-nowrap rounded-lg hover:bg-black-700 transition "
                    onClick={() => handleAddToCart(product.id)}
                  >
                    Add to Cart
                  </button>
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
  );
}
