import React from "react";

export default function MostViewd() {
  return (
    <div className="col-span-3 pr-8 mt-7">
      <div className="bg-white-100 dark:bg-black-200 py-6 px-6 rounded-xl dark:text-white-100">
        <span className="font-bold whitespace-nowrap dark:text-white-100">
          Most Viewed Product Today
        </span>
        <div className="py-8 h-52 w-full">
          <img
            src="https://storage-asset.msi.com/event/2022/cnd/ANZ-Powered-By-MSI/images/mnt/Optix-MAG281URF.png"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex justify-between px-1 text-sm mt-4">
          <p>price: $229.9</p>
          <p>View: 12,844</p>
        </div>
        <div className="w-full">
          <button className="bg-blue-600 w-full rounded-lg text-white-300 mt-7 py-1">
            Show Details
          </button>
        </div>
      </div>
    </div>
  );
}
