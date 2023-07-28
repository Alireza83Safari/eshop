import React, { useContext, useState } from "react";
import { faCartShopping, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import productsContext from "../Context/productsContext";
import Breadcrumb from "../components/Breadcrumb";

export default function CheckOut() {
  const { checkOut, setCheckOut } = useContext(productsContext);
  const [quantities, setQuantities] = useState(
    checkOut.reduce((acc, product) => {
      acc[product.id] = 1;
      return acc;
    }, {})
  );

  const totalAmount = checkOut.reduce(
    (acc, product) => acc + product.price * quantities[product.id],
    0
  );

  const handleIncrement = (productId) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: prevQuantities[productId] + 1,
    }));
  };

  const handleDecrement = (productId) => {
    if (quantities[productId] > 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: prevQuantities[productId] - 1,
      }));
    } else if (quantities[productId] === 1) {
      // If the quantity is 1, remove the product from the checkout
      const updatedCheckOut = checkOut.filter(
        (product) => product.id !== productId
      );
      setCheckOut(updatedCheckOut);
    }
  };

  const removeProductHandler = (id) => {
    let filterCheckOut = checkOut.filter((product) => product.id !== id);
    setCheckOut(filterCheckOut);
  };

  return (
    <div className="bg-white-300 dark:bg-black-200 text-black-900 my-32 dark:text-white-100">
      <div className="flex justify-center mb-5">
        <Breadcrumb
          links={[
            { id: 1, title: "Home", to: "shop/products" },
            {
              id: 2,
              title: "Check out",
              to: "shop/checkout",
            },
          ]}
        />
      </div>
      <div className="flex justify-center">
        <div>
          <div className="relative">
            <div className="flex items-center px-4 py-2 border-t border-x text-black-900 dark:text-white-100">
              <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
              <p className="ml-2 text-lg">Shopping Cart</p>
            </div>

            <div className="border px-5 lg:w-[40rem] w-screen">
              {!checkOut.length ? (
                <>
                  <div className="flex justify-center items-center">
                    <div className="w-80 h-80">
                      <img
                        src="https://www.digikala.com/statics/img/svg/empty-cart.svg"
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <p className="flex justify-center py-4 text-xl">
                    Your Usercart is Empty
                  </p>
                </>
              ) : (
                <>
                  {Array.from(
                    new Set(checkOut.map((product) => product.id))
                  ).map((productId) => {
                    const product = checkOut.find((p) => p.id === productId);
                    return (
                      <div
                        key={product.id}
                        className="flex items-center border-b h-36"
                      >
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-24 mx-4"
                        />
                        <div className="ml-4">
                          <p className="pb-2 text-sm">{product.name}</p>
                          <p className="py-1 text-sm text-gray-800">
                            ${product.price}
                          </p>
                          <p className="py-1 text-sm text-gray-800">
                            Color: White
                          </p>
                        </div>

                        <div className="absolute flex items-center right-10">
                          <p className="text-sm">
                            ${product.price * quantities[product.id]}
                          </p>

                          <div className="flex items-center mx-10">
                            <button
                              onClick={() => handleDecrement(product.id)}
                              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
                            >
                              -
                            </button>
                            <span className="px-5">
                              {quantities[product.id]}
                            </span>
                            <button
                              onClick={() => handleIncrement(product.id)}
                              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
                            >
                              +
                            </button>
                          </div>
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="text-red-700"
                            onClick={() => {
                              removeProductHandler(product.id);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="lg:w-[20rem] lg:block hidden h-[20rem] px-6 py-2 ml-8 border text-sm">
          <p className="py-2 text-xl font-bold text-center">Cart Total</p>

          <p className="py-2 text-gray-800">{checkOut.length} Items</p>
          <div className="flex justify-between border-b pt-2 pb-4">
            <p>Subtotal</p>
            <p>$94.00</p>
          </div>
          <div className="flex justify-between pt-4 pb-2">
            <p className="">Total(Tax Excl.)</p>
            <p className="">{totalAmount.toLocaleString()}$</p>
          </div>

          <div className="flex justify-between pt-4 pb-2">
            <p className="">Discount Amount</p>
            <p className="text-green-300">{totalAmount / 20}$ (20%)</p>
          </div>

          <div className="flex justify-between py-2 text-red-700">
            <p>Taxes</p>
            <p>{totalAmount / 10}$</p>
          </div>
          <button className=" w-full mt-3 py-2 bg-blue-600 text-xs text-white-100 rounded-lg">
            <Link>Proceed to checkout</Link>
          </button>
        </div>
        <div className="lg:hidden block fixed bottom-20 bg-white-100 w-full px-12 pt-2">
          <div className="flex text-sm justify-between py-2">
            <p>product price:({checkOut.length})</p>
            <p>{totalAmount}</p>
          </div>
          <div className="flex text-sm justify-between py-2">
            <p>Total Price</p>
            <p>{totalAmount}</p>
          </div>
          <div className="flex text-sm justify-between py-2 text-red-700">
            <p>Your profit from the purchase:</p>
            <p>{totalAmount / 10}</p>
          </div>
        </div>
        <div className="lg:hidden flex fixed bottom-0 w-full border-t py-3 bg-white-100">
          <button className=" w-1/2 text-white-100 rounded-lg py-2 mx-4 bg-blue-600">
            Buy
          </button>
          <div className="absolute flex items-center right-0 text-lg">
            <p className="mr-10">Total price:</p>
            <span className="mr-5">5454$</span>
          </div>
        </div>
      </div>
    </div>
  );
}
