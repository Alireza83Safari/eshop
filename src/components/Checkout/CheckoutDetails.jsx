import React, { useState } from "react";
import { Link } from "react-router-dom";
import userAxios from "../../services/Axios/userInterceptors";
import FormSpinner from "../FormSpinner/FormSpinner";

export default function CheckoutDetails({ orders }) {
  const totalAmount = orders?.price || 0;
  const totalTax = totalAmount / 10;
  const totalDiscount = totalAmount / 20;
  const totalPayment = Math.floor(totalAmount - totalDiscount - totalTax);
  const totalQuantity = orders?.items.reduce(
    (total, order) => total + order.quantity,
    0
  );
  const [discountCode, setDiscountCode] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const discountCodeHandler = async () => {
    setLoading(true);
    try {
      await userAxios.get(`/discount/validate/code/${discountCode}`);
      setLoading(false);
    } catch (error) {
      setError(error?.response?.data?.message);
      setLoading(false);
    }
  };
  return (
    <>
      <div className="lg:w-[20rem] lg:block hidden h-[24rem] md:px-6 py-2 ml-8 border text-sm rounded-lg">
        <p className="py-2 text-xl font-bold text-center">Cart Total</p>

        <div className="flex justify-between pt-6 pb-2">
          <p>Items</p>
          <p className="text-blue-600 font-black">{totalQuantity}</p>
        </div>

        <div className="flex justify-between pt-8 pb-2">
          <p>Total(Tax Excl.)</p>
          <p>{totalAmount.toLocaleString()}$</p>
        </div>

        <div className="flex justify-between pt-8 font-black">
          <p>Total Payment</p>
          <p>{totalPayment}$</p>
        </div>
        <div
          className={` flex items-center justify-between pt-8 pb-2 relative ${
            isLoading && "opacity-20"
          }`}
        >
          <input
            type="text"
            className="border border-gray-50 w-full p-2 rounded-md outline-none placeholder:text-sm dark:bg-black-200"
            placeholder="discount code"
            onChange={(e) => setDiscountCode(e.target.value)}
            onFocus={() => setError(false)}
            onBlur={() => setError(false)}
          />
          <button
            className=" absolute -right-4 bg-blue-600 py-2 text-xs text-white-100 border-4 rounded-r-md border-blue-600"
            onClick={() => {
              discountCodeHandler();
              setDiscountCode("");
            }}
          >
            {isLoading ? <FormSpinner /> : "Add"}
          </button>
        </div>
        <span className="text-xs text-red-700">{error}</span>
        <Link to="/checkout/shipping">
          <button className="w-full mt-7 py-3 bg-blue-600 text-xs text-white-100 rounded-lg">
            Placing an Order
          </button>
        </Link>
      </div>
      <div className="lg:hidden block fixed bottom-16 bg-white-100 w-full px-6 dark:bg-black-600">
        <div className="flex items-center text-sm justify-between">
          <p className="whitespace-nowrap">discount code:</p>
          <span className="text-xs text-red-700">{error}</span>

          <input
            type="text"
            className="border border-gray-50 py-2 rounded-md outline-none"
            placeholder="discount code"
            onChange={(e) => setDiscountCode(e.target.value)}
            onFocus={() => setError(false)}
            onBlur={() => setError(false)}
          />

          <button
            className=" absolute right-3 bg-blue-600 py-2 text-xs text-white-100 border-4 rounded-r-md border-blue-600"
            onClick={() => {
              discountCodeHandler();
              setDiscountCode("");
            }}
          >
            {isLoading ? <FormSpinner /> : "Add"}
          </button>
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

      <div className="lg:hidden flex fixed bottom-0 w-full border-t py-3 bg-white-100  dark:bg-black-600">
        <Link
          to="/checkout/shipping"
          className="w-1/3 text-white-100 rounded-lg py-2 mx-4 bg-blue-600 flex justify-center"
        >
          Buy
        </Link>
        <div className="absolute flex items-center right-0">
          <p className="mr-1">Total Payment:</p>
          <span className="mr-5">{totalPayment}$</span>
        </div>
      </div>
    </>
  );
}
