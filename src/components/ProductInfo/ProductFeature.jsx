import {
  faMoneyBill,
  faShieldAlt,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function ProductFeature() {
  return (
    <>
      <div className="relative lg:my-5">
        <div className="flex">
          <div className="mr-4">
            <FontAwesomeIcon
              icon={faTruck}
              className="block sm:text-xl text-2xl my-2 mr-2 text-blue-600"
            />
          </div>
          <div>
            <p className="sm:text-xs my-1">FREE SHIPPING</p>
            <p className="sm:text-[10px] text-sm text-gray-800">
              Free shipping on all
            </p>
          </div>
        </div>
        <span className="sm:text-[10px] text-xs absolute top-9 text-gray-800">
          orders
        </span>
      </div>

      <div className="relative lg:my-12 sm:my-0 my-12">
        <div className="flex">
          <div className="mr-4">
            <FontAwesomeIcon
              icon={faMoneyBill}
              className="block sm:text-xl text-2xl my-2 mr-2 text-green-300"
            />
          </div>
          <div>
            <p className="sm:text-xs sm:my-1 mt-2 sm:whitespace-normal whitespace-nowrap">
              MONEY BACK <br className="sm:flex hidden" /> GUARANTEE
            </p>
          </div>
        </div>
        <span className="sm:text-[10px] text-xs absolute top-10 text-gray-800 whitespace-nowrap">
          100% money back guarantee.
        </span>
      </div>

      <div className="relative lg:my-12 sm:my-0 my-7">
        <div className="flex">
          <div className="mr-4">
            <FontAwesomeIcon
              icon={faShieldAlt}
              className="block sm:text-xl text-2xl my-2 mr-2 text-orange-400"
            />
          </div>
          <div>
            <p className="sm:text-xs my-1">SAFE & SECURE</p>
            <p className="sm:text-[10px] text-sm text-gray-800">
              Lorem ipsum dolor sitall
            </p>
          </div>
        </div>
        <span className="sm:text-[10px] text-xs absolute top-9 text-gray-800">
          amet
        </span>
      </div>
    </>
  );
}
