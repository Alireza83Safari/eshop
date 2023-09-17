import React, { useContext } from "react";
import discountContext from "../../../Context/discountContext";

export default function TotalDiscount() {
  const { total } = useContext(discountContext);
  return (
    <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl text-center h-[9rem]">
      <span className="font-bold text-xl text-[11px] whitespace-nowrap dark:text-white-100">
        Total Discount
      </span>
      <h1 className="text-5xl text-blue-600 font-bold mt-6">{total}</h1>
    </div>
  );
}
