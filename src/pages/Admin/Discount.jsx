import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import adminAxios from "../../services/Axios/adminInterceptors";
import DiscountTable from "../../components/Admin/Discount/DiscountTable";
import TotalDiscount from "../../components/Admin/Discount/TotalDiscount";
import AddDiscount from "../../components/Admin/Discount/Add/AddDiscount";
import { useFetchPagination } from "../../hooks/useFetchPagination";
import DiscountContext from "../../Context/discountContext";

export default function Discount() {
  let url = "/discount";
  const {
    isLoading: paginatedProductsLoading,
    fetchData,
    paginations,
    total,
  } = useFetchPagination(url, adminAxios);

  return (
    <DiscountContext.Provider
      value={{
        paginations,
        fetchData,
        paginatedProductsLoading,
        total,
      }}
    >
      <section className="sm:p-6 p-3 float-right mt-16 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 col-span-12 lg:mr-6 lg:order-1 order-2  bg-white-100  dark:bg-black-200 dark:text-white-100 rounded-xl relative">
            <DiscountTable paginations={paginations} />
          </div>
          <div className="lg:col-span-4 col-span-12 lg:gap-x-12 gap-x-6 gap-y-6 lg:order-2 order-1">
            <TotalDiscount />
            <AddDiscount />
          </div>
        </div>
        <ToastContainer />
      </section>
    </DiscountContext.Provider>
  );
}
