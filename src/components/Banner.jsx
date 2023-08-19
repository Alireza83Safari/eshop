import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <section>
      <div className="grid sm:grid-cols-2 w-full xl:px-20 md:mt-0 mt-16">
        <div className="my-auto sm:order-1 order-2">
          <div className="text-black-900 dark:text-white-100">
            <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-black sm:text-start text-center sm:mt-0 mt-14">
              Choose Fresh <br className="sm:block hidden" /> Tast Coffee
            </h1>
          </div>
          <p className="xl:text-lg text-base sm:my-16 my-10 text-black-900 dark:text-white-100 sm:text-start text-center">
            when you are stock just click for it!
          </p>

          <div className="sm:block flex justify-center">
            <Link
              to="/products"
              className="xl:py-4 mb-4 xl:px-14 md:py-3 md:px-10 py-2 px-16 bg-blue-600 text-white-100 rounded-md sm:inline flex justify-center"
            >
              Buy Now
            </Link>
          </div>
        </div>
        <div className="flex justify-end items-center container order-1">
          <img
            src="/images/Transactional-SMS.png"
            className=" md:w-[30rem] xl:w-[34rem] object-cover"
          />
        </div>
      </div>
      <p className="text-center font-black mt-10 text-black-900 dark:text-white-100">
        Scroll Down <FontAwesomeIcon icon={faArrowDown} />
      </p>
    </section>
  );
}
