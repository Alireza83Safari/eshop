import React, { useContext, useState, useEffect } from "react";
import Timer from "./Timer";
import productContext from "../Context/productsContext";

export default function Suggestion() {
  const { getProducts } = useContext(productContext);

  const [img, setImg] = useState({
    name: "iphone13 Pro max",
    img: "/images/iphone13.png",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * getProducts.length);

      setImg(getProducts[randomIndex]);
    }, 100000);

    return () => clearInterval(timer);
  }, [getProducts]);

  return (
    <div className="w-full xl:px-20 md:px-4 mt-52">
      <div className="grid grid-cols-2">
        <div className="text-black-900 dark:text-white-100">
          <h1 className="font-black text-5xl">Chance To Have An</h1>
          <h1 className="font-black text-5xl my-3">Amazing Morning</h1>
        </div>
        <div className="flex justify-end">
          <Timer days={12} />
        </div>
      </div>
      <div className="grid grid-cols-3 mt-12 text-black-900 dark:text-white-100">
        <div className="mt-16">
          <h2 className="text-3xl font-bold">Share Now Deal</h2>
          <p className="mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
            maiores?
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img src={img.img} alt="" />
        </div>
        <div className=" relative flex justify-center items-center">
          <button className=" absolute bottom-20 text-white-100 rounded-md py-3 px-14 bg-blue-600">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
