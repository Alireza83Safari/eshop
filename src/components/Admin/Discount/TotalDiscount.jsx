import React, { useContext } from "react";
import { DiscountContext } from "../../../context/discountContext";
import Spinner from "../../Spinner/Spinner";

export default function TotalDiscount() {
  const { total, paginatedProductsLoading } = useContext(DiscountContext);
  return (
    <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl text-center h-[10rem] mb-5 2xl:h-[15rem] relative">
      <span className="font-bold 2xl:text-3xl sm:text-xl text-2xl whitespace-nowrap dark:text-white-100">
        Total Discount
      </span>
      {paginatedProductsLoading ? (
        <Spinner />
      ) : (
        <h1 className="2xl:text-7xl text-5xl text-blue-600 font-bold my-8 2xl:my-10">
          {total}
        </h1>
      )}
    </div>
  );
}
