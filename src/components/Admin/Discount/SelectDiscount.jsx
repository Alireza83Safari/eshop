import React, { useState } from "react";

export default function SelectDiscount({
  setShowProductDiscount,
  setShowUserDiscount,
  setShowSelectDiscount,
  setShowGlobalDiscount,
}) {
  const [btnValue, setBtnValue] = useState(null);
  const getButtonValueHandler = () => {
    if (btnValue === "user") {
      setShowSelectDiscount(false);
      setShowUserDiscount(true);
    } else if (btnValue === "product") {
      setShowSelectDiscount(false);
      setShowProductDiscount(true);
    } else if (btnValue === "Global") {
      setShowSelectDiscount(false);
      setShowGlobalDiscount(true);
    }
  };
  return (
    <>
      <span className="mb-5 text-xl font-bold flex justify-center">
        Add Discount
      </span>

      <div className="grid grid-cols-1 gap-10 mt-8">
        <button
          className="border p-2 w-full rounded-lg outline-none focus:border-green-500 focus:text-white-100 focus:bg-green-300 mt-2 duration-200"
          onClick={() => setBtnValue("user")}
        >
          User
        </button>
        <button
          className="border p-2 w-full rounded-lg outline-none focus:border-green-500 focus:text-white-100 focus:bg-green-300 mt-2 duration-200"
          onClick={() => setBtnValue("product")}
        >
          Product
        </button>
        <button
          className="border p-2 w-full rounded-lg outline-none focus:border-green-500 focus:text-white-100 focus:bg-green-300 mt-2 duration-200"
          onClick={() => setBtnValue("Global")}
        >
          Global
        </button>
      </div>

      <div className="flex justify-center mt-12">
        <button
          type="submit"
          className="bg-blue-600 text-white-100 w-full py-2 rounded-xl mr-2 disabled:bg-gray-200"
          onClick={getButtonValueHandler}
          disabled={btnValue?.length == ""}
        >
          Next
        </button>
      </div>
    </>
  );
}
