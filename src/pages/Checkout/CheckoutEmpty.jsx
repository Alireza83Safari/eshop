import React from "react";

export default function CheckoutEmpty() {
  return (
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
      <p className="flex justify-center py-4 text-xl">Your Usercart is Empty</p>
    </>
  );
}
