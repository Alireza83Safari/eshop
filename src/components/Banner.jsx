import { faAngleRight, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section>
      <div className="grid grid-cols-2 w-full xl:px-20 lg:mt-0 sm:mt-16">
        <div className="my-auto">
          <div className="text-black-900 dark:text-white-100">
            <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-black">
              Choose Fresh
            </h1>
            <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-black lg:my-5 my-3">
              Tast Coffee
            </h1>
          </div>
          <p className="xl:text-lg md:text-base text-sm my-16 text-black-900 dark:text-white-100">
            when you are stock just click for it!
          </p>

          <Link
            to="/products"
            className="xl:py-4 mb-4 xl:px-14 md:py-3 md:px-10 py-2 px-8 bg-blue-600 text-white-100 rounded-md"
          >
            <button>Buy Now</button>
            <FontAwesomeIcon icon={faAngleRight} className="ml-3 border" />
          </Link>
        </div>
        <div className="flex justify-end items-center container">
          <img
            src="/images/Transactional-SMS.png"
            className=" md:w-[30rem] xl:w-[34rem] object-cover"
            alt=""
          />
        </div>
      </div>
      <p className="text-center font-black mt-10 text-black-900 dark:text-white-100">
        Scroll Down <FontAwesomeIcon icon={faArrowDown} />
      </p>
    </section>
  );
}
