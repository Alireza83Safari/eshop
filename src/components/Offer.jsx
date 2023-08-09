import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import productContext from "../Context/productsContext";
import usePost from "../hooks/usePost";

export default function Offer() {
  const [count, setCount] = useState(1);
  const { getProducts, token } = useContext(productContext);

  const [newProduct, setNewProduct] = useState({
    id: "ae0ed272-feb1-41af-bbc4-d14f03f58992",
    brandName: "Apple",
    price: 1299,
    fileUrl: "uploads/product/01bc03af-9404-4c88-95f5-5dfc6db79634.png",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * getProducts.length);

      setNewProduct(getProducts[randomIndex]);
    }, 10000);

    return () => clearInterval(timer);
  }, [getProducts]);

  const { doPost } = usePost();

  const handleAddToCart = (productID) => {
    let findProduct = getProducts.find((product) => product.id === productID);

    let productData = {
      productItemId: findProduct.itemId,
      quantity: 1,
    };

    
    doPost("/api/v1/orderItem", productData, {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    });

    toast.success(`${findProduct.name} added to cart!`, {
      position: "bottom-right",
    });
  };

  return (
    <section className="w-full xl:px-20 md:px-4 lg:mt-52 mt-36">
      <div className="grid grid-cols-2 relative">
        <div className="text-black-900 dark:text-white-100">
          <h1 className="font-black xl:text-5xl lg:text-4xl md:text-3xl text-2xl">
            we offer you the
          </h1>
          <h1 className="font-black xl:text-5xl lg:text-4xl md:text-3xl text-2xl my-3">
            best we have
          </h1>
        </div>
        <p className="px-4 text-black-900 dark:text-white-100 lg:text-base text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, vitae
          placeat? officia, accusamus excepturi sequi nemo illum officiis facere
          vel.
        </p>
        <h2 className="my-5 text-2xl text-blue-600 font-black">20.45$</h2>

        <div className="flex justify-end mr-10 my-5 text-black-900 dark:text-white-100">
          <FontAwesomeIcon icon={faArrowUp} />
        </div>

        <div className="w-full bg-gray-100 flex items-center justify-center">
          <img
            src={`http://127.0.0.1:6060/${newProduct?.fileUrl}`}
            className="p-10 object-cover"
            alt=""
          />
        </div>
        <div className="ml-5">
          <p className="font-black text-black-900 dark:text-white-100">
            Choose Your Coffee
          </p>
          <div className="grid grid-cols-3 py-3">
            <img
              src={`http://127.0.0.1:6060/${newProduct?.fileUrl}`}
              className="p-1"
              alt=""
            />
            <img
              src={`http://127.0.0.1:6060/${newProduct?.fileUrl}`}
              className="p-1"
              alt=""
            />
            <img
              src={`http://127.0.0.1:6060/${newProduct?.fileUrl}`}
              className="p-1"
              alt=""
            />
          </div>
          <div className="w-full bg-gray-200 my-5">
            <span className="mx-5 text-sm">{newProduct?.price}$</span>
            <span className="mx-5 text-sm">{newProduct?.price}$</span>
            <span className="mx-5 text-sm">{newProduct?.price}$</span>
          </div>

          <div className="text-black-900 dark:text-white-100">
            <p className="font-black lg:mt-10 md:mt-4">Select Best Color</p>
            <div className="flex my-4">
              <div className="lg:w-12 lg:h-12 w-8 h-8 bg-red-700 lg:mr-4 md:mr-1 rounded-lg"></div>
              <div className="lg:w-12 lg:h-12 w-8 h-8 bg-blue-600 lg:mr-4 md:mr-1 rounded-lg"></div>
              <div className="lg:w-12 lg:h-12 w-8 h-8 bg-gray-800 lg:mr-4 md:mr-1 rounded-lg"></div>
              <div className="lg:w-12 lg:h-12 w-8 h-8 bg-orange-400 lg:mr-4 md:mr-1 rounded-lg"></div>

              <div className="flex items-center mx-10">
                <button
                  onClick={() => setCount(count - 1)}
                  className="lg:px-4 lg:py-2 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
                >
                  -
                </button>
                <span className="px-5">{count}</span>
                <button
                  onClick={() => setCount(count + 1)}
                  className="lg:px-4 lg:py-2 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
                >
                  +
                </button>
              </div>
            </div>

            <p className="font-black lg:mt-10 md:mt-4">spaciousness</p>
            <div className="flex justify-between my-4 lg:text-base md:text-sm">
              <p>1.Better quality</p>
              <p>2.Variety Color</p>
              <p>3.Best Products</p>
            </div>

            <button
              className="lg:px-12 lg:py-3 md:px-9 py-2 bg-blue-600 text-white-100 rounded-md"
              onClick={() => handleAddToCart(newProduct.id)} // Step 1: Call the addToCart function with the selected product
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
