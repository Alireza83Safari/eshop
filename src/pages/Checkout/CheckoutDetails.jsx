import React from "react";
import { Link } from "react-router-dom";

export default function CheckoutDetails({ orders }) {
  const totalAmount = orders?.price || 0;
  const totalTax = totalAmount / 10;
  const totalDiscount = totalAmount / 20;
  const totalPayment = Math.floor(totalAmount - totalDiscount - totalTax);
  const totalQuantity = orders?.items.reduce(
    (total, order) => total + order.quantity,
    0
  );

  return (
    <>
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

        <Link to="/checkout/shipping">
          <button className=" w-full mt-3 py-2 bg-blue-600 text-xs text-white-100 rounded-lg">
            Placing an Order
          </button>
        </Link>
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
    </>
  );
}
