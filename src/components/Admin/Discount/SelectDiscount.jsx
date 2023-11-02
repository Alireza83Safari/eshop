import React, { useState } from "react";
import useAccess from "../../../hooks/useAccess";
import toast from "react-hot-toast";

export default function SelectDiscount({
  setShowProductDiscount,
  setShowUserDiscount,
  setShowSelectDiscount,
  setShowGlobalDiscount,
}) {
  const [btnValue, setBtnValue] = useState(null);
  const { userHaveAccess } = useAccess("action_discodunt_admin_create");

  const getButtonValueHandler = () => {
    if (userHaveAccess) {
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
    } else {
      toast.error("You Havent Access Create Discount");
    }
  };
  return (
    <>
      <span className="my-3 font-bold flex justify-center  2xl:text-2xl sm:text-xl text-[16px]">
        Add Discount
      </span>

      <div className="grid grid-cols-1 gap-10 sm:mt-8 mt-4">
        <button
          className="border 2xl:py-4 py-2 w-full rounded-lg outline-none focus:border-green-500 focus:text-white-100 focus:bg-green-300 mt-2 duration-200 sm:text-base text-sm"
          onClick={() => setBtnValue("user")}
        >
          User
        </button>
        <button
          className="border 2xl:py-4 py-2 w-full rounded-lg outline-none focus:border-green-500 focus:text-white-100 focus:bg-green-300 sm:mt-2 duration-200 sm:text-base text-sm"
          onClick={() => setBtnValue("product")}
        >
          Product
        </button>
        <button
          className="border 2xl:py-4 py-2 w-full rounded-lg outline-none focus:border-green-500 focus:text-white-100 focus:bg-green-300 sm:mt-2 duration-200 sm:text-base text-sm"
          onClick={() => setBtnValue("Global")}
        >
          Global
        </button>
      </div>

      <div className="flex justify-center lg:mt-12 mt-7">
        <button
          type="submit"
          className="bg-blue-600 text-white-100 w-full 2xl:py-4 py-2 rounded-xl disabled:bg-gray-200 sm:text-base text-sm"
          onClick={getButtonValueHandler}
          disabled={btnValue?.length == ""}
        >
          Next
        </button>
      </div>
    </>
  );
}
