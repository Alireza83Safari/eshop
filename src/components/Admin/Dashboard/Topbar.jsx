import React from "react";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import adminAxios from "../../../services/Axios/adminInterceptors";
import useFetch from "../../../hooks/useFetch";

export default function Topbar() {
  const { datas: totalOrder } = useFetch("/order", adminAxios);
  const { datas: totalProducts } = useFetch("/product/selectList", adminAxios);
  const { datas: totalBrand } = useFetch("/brand", adminAxios);
  const date = new Date();
  return (
    <>
      <div className="relative rounded-lg sm:col-span-1 col-span-3 bg-white-100 dark:bg-black-200 p-6 dark:text-white-100 text-black-900">
        <div className="flex items-center sm:justify-between text-xs 2xl:text-base lg:text-sm">
          <p className="xl:mr-4 whitespace-nowrap">Total Orders</p>
          <span className="mx-1 text-green-300 flex items-center font-bold sm:right-0 right-8 pr-3 absolute">
            <FontAwesomeIcon icon={faCaretUp} className="xl:mx-1" />
            12%
          </span>
        </div>
        <h1 className="font-bold xl:text-4xl text-2xl my-3 text-blue-600 text-center">
          {totalOrder?.total}
        </h1>
        <p className="text-sm text-gray-500">
          {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
        </p>
      </div>

      <div className="relative rounded-lg sm:col-span-1 col-span-3 bg-white-100 dark:bg-black-200 p-6 dark:text-white-100 text-black-900">
        <div className="flex items-center sm:justify-between text-xs 2xl:text-base lg:text-sm">
          <p className="xl:mr-4 whitespace-nowrap">Total Products</p>
          <span className="mx-1 text-green-300 flex items-center font-bold sm:right-0 right-8 pr-3 absolute">
            <FontAwesomeIcon icon={faCaretUp} className="xl:mx-1" />
            1%
          </span>
        </div>
        <h1 className="font-bold xl:text-4xl text-2xl my-3 text-blue-600 text-center">
          {totalProducts?.total}
        </h1>
        <p className="text-sm text-gray-500">
          {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
        </p>
      </div>

      <div className="relative rounded-lg sm:col-span-1 col-span-3 bg-white-100 dark:bg-black-200 p-6 dark:text-white-100 text-black-900">
        <div className="flex items-center sm:justify-between text-xs 2xl:text-base lg:text-sm">
          <p className="xl:mr-4 whitespace-nowrap">Total Brand</p>
          <span className="mx-1 text-green-300 flex items-center font-bold sm:right-0 right-8 pr-3 absolute">
            <FontAwesomeIcon icon={faCaretUp} className="xl:mx-1" />
            12%
          </span>
        </div>
        <h1 className="font-bold xl:text-4xl text-2xl my-3 text-blue-600 text-center">
          {totalBrand?.total}
        </h1>
        <p className="text-sm text-gray-500">
          {date.getFullYear()}/{date.getMonth() + 1}/{date.getDate()}
        </p>
      </div>
    </>
  );
}
