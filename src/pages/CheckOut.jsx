import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import { faCartShopping, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import Header from "./Header/Header";
import Footer from "./Footer";
import productsContext from "../Context/productsContext";
import Spinner from "../components/Spinner/Spinner";
import useFetch from "../hooks/useFetch";

export default function Orders() {
  const { token } = useContext(productsContext);
  const [orders, setOrders] = useState([]);
  const { datas, fetchData, isLoading } = useFetch("/api/v1/user/order");
  useEffect(() => {
    if (datas && datas.items) {
      setOrders(datas.items);
    }
  }, [datas]);

  const totalAmount = datas?.price || 0;
  const totalTax = totalAmount / 10;
  const totalDiscount = totalAmount / 20;
  const totalPayment = Math.floor(totalAmount - totalDiscount - totalTax);
  const totalQuantity = orders.reduce(
    (total, order) => total + order.quantity,
    0
  );

  const handleIncrement = (productId) => {
    changeIncrementQuantity(productId.productItemId, productId.id);
  };

  const handleDecrement = (productId) => {
    changeDecrementQuantity(productId.productItemId, productId.id);
  };

  const removeProductHandler = async (id) => {
    try {
      const response = await fetch(`/api/v1/user/orderItem/delete/${id}`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete the product.");
      }
      fetchData();
    } catch (error) {
      console.error("Error deleting the product:", error.message);
    }
  };

  const changeIncrementQuantity = async (itemId, id) => {
    try {
      let newQuantity = orders.find((order) => order.id === id).quantity + 1;
      const response = await fetch("/api/v1/orderItem", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ productItemId: itemId, quantity: newQuantity }),
      });
      if (!response.ok) {
        throw new Error("Failed to update the quantity.");
      }
      fetchData();
    } catch (error) {
      console.log("Error updating quantity:", error.message);
    }
  };

  const changeDecrementQuantity = async (itemId, id) => {
    try {
      let newQuantity = orders.find((order) => order.id === id).quantity - 1;
      const response = await fetch("/api/v1/orderItem", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ productItemId: itemId, quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the quantity.");
      }
      fetchData();
    } catch (error) {
      console.log("Error updating quantity:", error.message);
    }
  };

  return (
    <>
      <Header />

      <section className="bg-white-100  dark:bg-black-200 text-black-900 mt-4 mb-8 z-10 dark:text-white-100">
        <div className="flex justify-center mb-5">
          <Breadcrumb
            links={[
              { id: 1, title: "Home", to: "products" },
              { id: 2, title: "Check out", to: "orders" },
            ]}
          />
        </div>

        <div className="flex justify-center">
          <div className="relative max-h-[34rem] overflow-x-auto">
            <div className="flex items-center px-4 py-2 border-t border-x text-black-900 dark:text-white-100">
              <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
              <p className="ml-2 text-lg">Shopping Cart</p>
            </div>

            <div className="border md:px-5 lg:w-[40rem] w-[90vw]">
              {!orders.length ? (
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
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex items-center border-b h-36"
                      >
                        <img
                          src={`http://127.0.0.1:6060/${order.fileUrl}`}
                          className="w-24 h-24 object-contain md:mx-4"
                        />
                        <div className="md:ml-4 md:text-sm text-xs">
                          <p className="pb-2">{order.productName}</p>
                          <p className="py-1 text-gray-800">${order.price}</p>
                          <p className="py-1m text-gray-800">Color: White</p>
                        </div>

                        <div className="absolute flex items-center right-10 md:text-sm text-xs">
                          <p>${order.price * order.quantity}</p>

                          <div className="flex items-center md:mx-10 mx-4">
                            <button
                              onClick={() => {
                                handleDecrement(order);
                              }}
                              className="md:px-4 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
                            >
                              -
                            </button>
                            <span className="md:px-5 px-2">
                              {order.quantity}
                            </span>
                            <button
                              onClick={() => handleIncrement(order)}
                              className="md:px-4 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
                            >
                              +
                            </button>
                          </div>
                          <FontAwesomeIcon
                            icon={faTrashAlt}
                            className="text-red-700"
                            onClick={() => {
                              {
                                removeProductHandler(order.productItemId);
                              }
                            }}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>

          <div className="lg:w-[20rem] lg:block hidden h-[24rem] px-6 py-2 ml-8 border text-sm z-10 rounded-lg">
            <p className="py-2 text-xl font-bold text-center">Cart Total</p>

            <div className="flex justify-between pt-6 pb-2">
              <p>Items</p>
              <p className="text-blue-600 font-black">{totalQuantity}</p>
            </div>

            <div className="flex justify-between pt-6 pb-2">
              <p>Total(Tax Excl.)</p>
              <p>{totalAmount.toLocaleString()}$</p>
            </div>

            <div className="flex justify-between pt-6 pb-2">
              <p>Discount Amount</p>
              <p className="text-green-300">{totalDiscount}(20%)</p>
            </div>

            <div className="flex justify-between py-4 text-red-700">
              <p>Taxes</p>
              <p>{totalTax}$</p>
            </div>

            <div className="flex justify-between py-4 font-black">
              <p>Total Payment</p>
              <p>{totalPayment}$</p>
            </div>

            <button className=" w-full mt-3 py-2 bg-blue-600 text-xs text-white-100 rounded-lg">
              <Link>Proceed to orders</Link>
            </button>
          </div>
          <div className="lg:hidden block fixed bottom-16 bg-white-100 w-full px-12">
            <div className="flex text-sm justify-between py-2">
              <p>Products Discount :</p>
              <p className="text-green-300 font-black">{totalDiscount}$</p>
            </div>
            <div className="flex text-sm justify-between py-2">
              <p>Total Tax :</p>
              <p className="text-red-700 font-black">{totalTax}$</p>
            </div>

            <div className="flex text-sm justify-between py-2">
              <p>Total Amount :</p>
              <p className="font-black">{totalAmount}$</p>
            </div>
          </div>

          <div className="lg:hidden flex fixed bottom-0 w-full border-t py-3 bg-white-100">
            <button className="w-1/3 text-white-100 rounded-lg py-2 mx-4 bg-blue-600">
              Buy
            </button>
            <div className="absolute flex items-center right-0 text-lg">
              <p className="mr-1-">Total Payment:</p>
              <span className="mr-5">{totalPayment}$</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
