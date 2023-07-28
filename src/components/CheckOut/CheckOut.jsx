import React, { useContext } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import productsContext from "../../Context/productsContext";

export default function CheckOut() {
  const { checkOut, setCheckOut } = useContext(productsContext);

  const removeProduct = (ID) => {
    const updatedCheckOut = checkOut.filter((product) => product.id !== ID);
    setCheckOut(updatedCheckOut);
  };

  return (
    <div className="usercart mr-10 hidden top-16 w-72 h-96 bg-white z-10 overflow-auto border-x">
      <div className="relative">
        <div className="relative">
          <div className="flex justify-between py-4 bg-blue-600 px-4 text-white-100">
            <p className="">All Carts</p>
            <span className="bg-white text-black px-2 font-bold rounded-md">
              {checkOut.length}
            </span>
          </div>

          <div className="py-4">
            {!checkOut.length ? (
              <p className="text-blue-600 z-10 text-center text-xl mt-16">
                This is empty!
              </p>
            ) : (
              checkOut.map((product) => (
                <div
                  className="flex justify-between items-center border-b p-1"
                  key={product.name}
                >
                  <img src={product.img} alt="" className="w-20" />
                  <div className="text-center">
                    <p className="py-1">{product.name}</p>
                    <p className="py-1">{product.price}$</p>
                  </div>
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-red-700 text-xl"
                    onClick={() => removeProduct(product.id)}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        <Link
          to="checkout"
          className=" absolute left-0 right-0 top-80 flex justify-center"
        >
          <button className="w-64 bg-blue-600 text-white-100 rounded-lg py-2">
            Shop now
          </button>
        </Link>
      </div>
    </div>
  );
}
