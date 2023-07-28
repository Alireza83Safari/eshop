import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState, useEffect } from "react";
import Timer from "./Timer";
import productContext from "../Context/productsContext";
export default function Offer() {
  const [count, setCount] = useState(0);
  const { getProducts } = useContext(productContext);

  const [img, setImg] = useState({
    name: "iphone13 Pro max",
    img: "/images/iphone13.png",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      // Generate a random index within the range of products array
      const randomIndex = Math.floor(Math.random() * getProducts.length);

      // Update the img state with the random product's image
      setImg(getProducts[randomIndex]);
    }, 10000); // Fetch a random image every 5 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, [getProducts]);

  return (
    <div className="w-full xl:px-20 md:px-4 mt-52">
      <div className="grid grid-cols-2 relative">
        <div className="text-black-900 dark:text-white-100">
          <h1 className="font-black text-5xl">we offer you the</h1>
          <h1 className="font-black text-5xl my-3">best we have</h1>
        </div>
        <p className="px-4 text-black-900 dark:text-white-100">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, vitae
          placeat? officia, accusamus excepturi sequi nemo illum officiis facere
          vel.
        </p>
        <h2 className="my-5 text-2xl text-blue-600 font-black">20.45$</h2>

        <div className="flex justify-end mr-10 my-5 text-black-900 dark:text-white-100">
          <FontAwesomeIcon icon={faArrowUp} />
        </div>

        <div className="w-full bg-gray-200">
          <img src="/images/iphone13.png" className="p-10" alt="" />
        </div>
        <div className="ml-5">
          <p className="font-black text-black-900 dark:text-white-100">Choose Your Coffee</p>
          <div className="grid grid-cols-3 py-3">
            <img src="/images/iphone13.png" className="p-1" alt="" />
            <img src="/images/iphone13.png" className="p-1" alt="" />
            <img src="/images/iphone13.png" className="p-1" alt="" />
          </div>
          <div className="w-full bg-gray-200 my-5">
            <span className="mx-5 text-sm">1199$</span>
            <span className="mx-5 text-sm">1299$</span>
            <span className="mx-5 text-sm">1399$</span>
          </div>

          <div className="text-black-900 dark:text-white-100">
            <p className="font-black mt-10">Select Best Color</p>
            <div className="flex my-4">
              <div className="w-12 h-12 bg-red-700 mr-4 rounded-lg"></div>
              <div className="w-12 h-12 bg-blue-600 mr-4 rounded-lg"></div>
              <div className="w-12 h-12 bg-gray-800 mr-4 rounded-lg"></div>
              <div className="w-12 h-12 bg-orange-400 mr-4 rounded-lg"></div>

              <div className="flex items-center mx-10">
                <button
                  onClick={() => setCount(count - 1)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
                >
                  -
                </button>
                <span className="px-5">{count}</span>
                <button
                  onClick={() => setCount(count + 1)}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
                >
                  +
                </button>
              </div>
            </div>

            <p className="font-black mt-10">spaciousness</p>
            <div className="flex justify-between my-4">
              <p>1.Better quality</p>
              <p>2.Variety Color</p>
              <p>3.Best Products</p>
            </div>

            <button className="px-12 py-3 bg-blue-600 text-white-100 rounded-md">
              Add To Cart
            </button>
          </div>
        </div>
      </div>

     
    </div>
  );
}
