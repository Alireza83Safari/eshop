import React, { useContext, useState, useEffect } from "react";
import Timer from "./Timer";
import productContext from "../Context/productsContext";
import { ToastContainer, toast } from "react-toastify";

export default function Suggestion() {
  const { getProducts, setCheckOut } = useContext(productContext);

  const [suggestionProduct, setSuggestionProduct] = useState({
    fileUrl: "uploads/product/459f7e5a-49b8-4ed9-96df-23ab36b6dd6a.png",
  });
  console.log(getProducts);
  useEffect(() => {
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * getProducts.length);

      setSuggestionProduct(getProducts[randomIndex]);
    }, 10000);

    return () => clearInterval(timer);
  }, [getProducts]);

  const addToCart = (product) => {
    setCheckOut((prevCheckOut) => [...prevCheckOut, product]);

    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
    });
  };

  return (
    <section className="w-full px-4 lg:px-20 mt-52">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="text-black-900 dark:text-white-100 mx-auto">
          <h1 className="sm:text-3xl lg:text-5xl md:font-4xl text-2xl font-black md:mb-0 md:text-start text-center mb-10">
            Chance To Have An Amazing Morning
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <Timer days={12} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-black-900 dark:text-white-100">
        <div className="mt-6 md:mt-16 md:block hidden">
          <h2 className="text-2xl font-bold">Share Now Deal</h2>
          <p className="mt-4 md:mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
            maiores?
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={`http://127.0.0.1:6060/${suggestionProduct.fileUrl}`}
            alt=""
            className="md:w-full w-[40%]"
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            className="text-white-100 rounded-md py-3 px-20 md:px-14 bg-blue-600 md:mt-0 mt-10"
            onClick={() => addToCart(suggestionProduct)}
          >
            Buy Now
          </button>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
