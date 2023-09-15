import React from "react";
import ProgressBar from "../ProgressBar";
import useFetch from "../../../hooks/useFetch";
import adminAxios from "../../../services/Axios/adminInterceptors"

export default function Departments() {
  const { datas: infos } = useFetch("/report/revenueByCategory", adminAxios);
  return (
    <div className="mt-4 p-4 dark:bg-black-200 dark:text-white-100 bg-white-100 rounded-xl min-h-full">
      <div className="mb-4">Revenue By Departments</div>
      {infos?.map((info) => (
        <div className="py-2" key={info.id}>
          <div className="flex justify-between text-xs mb-4">
            <p>{info?.categoryName}</p>
            <p>{info?.price}$</p>
          </div>
          <div className=" text-blue-600">
            <ProgressBar value={info?.percentage} maxValue={100} />
          </div>
        </div>
      ))}
    </div>
  );
}
