import React from "react";

export default function MostViewed() {
  return (
    <div className="md:mt-6 mr-7">
      <div className="bg-white-100 dark:bg-black-200 py-6 px-5 ml-3 rounded-xl dark:text-white-100">
      <span className="flex justify-center font-bold whitespace-nowrap dark:text-white-100 lg:text-base md:text-xs text-center">
          Most Viewed Product Today
        </span>
        <div className="pt-4 h-56">
          <img
            src="https://storage-asset.msi.com/event/2022/cnd/ANZ-Powered-By-MSI/images/mnt/Optix-MAG281URF.png"
            className="w-full h-full lg:mt-4 mt-0 object-contain"
          />
        </div>
        <div className="flex justify-between md:px-1 px-10 xl:text-base md:text-xs text-sm mt-4">
          <p className="py-1 lg:py-0">price: $229.9</p>
          <p className="py-1 lg:py-0">View: 12,844</p>
        </div>
        <div className="w-full">
          <button className="bg-blue-600 w-full rounded-lg text-white-300 lg:mt-7 mt-3 md:py-1 py-2 lg:text-base text-xs">
            Show Details
          </button>
        </div>
      </div>
    </div>
  );
}
