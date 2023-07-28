import { faAngleRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Banner() {
  return (
    <section>
      <div className="grid grid-cols-2 w-full xl:px-20 md:px-4">
      <div className="my-auto">
        <div className="text-black-900 dark:text-white-100">
          <h1 className="xl:text-6xl lg:text-5xl md:text-4xl font-black">Choose Fresh</h1>
          <h1 className="xl:text-6xl lg:text-5xl md:text-4xl font-black my-5">
            Tast Coffee
          </h1>
        </div>
        <p className="xl:text-lg md:text-base text-sm my-16 text-black-900 dark:text-white-100">
          when you are stock just click for it!
        </p>

        <button className="xl:py-4 mb-4 xl:px-14 md:py-3 md:px-10 bg-blue-600 text-white-100 rounded-md">
          <span>Buy Now</span>
          <FontAwesomeIcon icon={faAngleRight} className="ml-3 border" />
        </button>
      </div>
      <div className="flex justify-center items-center container">
        <img
          src="/images/Transactional-SMS.png"
          className=" md:w-[30rem] xl:w-[34rem] object-cover"
          alt=""
        />
      </div>
      </div>
      <p className="text-center font-black mt-10 text-black-900 dark:text-white-100">Scroll Down <FontAwesomeIcon icon={faArrowDown} /></p>
    </section>
  );
}
