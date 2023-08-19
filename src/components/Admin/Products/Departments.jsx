import React from "react";
import ProgressBar from "../ProgressBar";

export default function Departments() {
  return (
    <div className="mt-4 p-4 dark:bg-black-200 dark:text-white-100 bg-white-100 rounded-xl">
      <div className="mb-4">Revenue By Departments</div>
      <div className="py-2">
        <div className="flex justify-between text-xs mb-4">
          <p>Mobile & Game</p>
          <p>$44,767.56</p>
        </div>
        <div className=" text-blue-600">
          <ProgressBar value={82} maxValue={100} />
        </div>
      </div>

      <div className="py-2">
        <div className="flex justify-between text-xs mb-4">
          <p>Laptop</p>
          <p>$64,805.00</p>
        </div>
        <div className=" text-blue-600">
          <ProgressBar value={44} maxValue={100} />
        </div>
      </div>

      <div className="py-2">
        <div className="flex justify-between text-xs mb-4">
          <p>Home & Kitchen</p>
          <p>$9,805.00</p>
        </div>
        <div className=" text-blue-600">
          <ProgressBar value={70} maxValue={100} />
        </div>
      </div>

      <div className="py-2">
        <div className="flex justify-between text-xs mb-4">
          <p>Television</p>
          <p>$1,575.00</p>
        </div>
        <div className=" text-blue-600">
          <ProgressBar value={52} maxValue={100} />
        </div>
      </div>
    </div>
  );
}
