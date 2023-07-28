import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGear,
  faHomeAlt,
  faRightToBracket,
  faShop,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import productsContext from "../../Context/productsContext";

export default function Sidebar() {
  const items = [
    { icon: faHomeAlt, text: "Home", to: "" },
    { icon: faShop, text: "Shop", to: "products" },
    { icon: faRightToBracket, text: "Log In", to: "login" },
  ];

  const { mode, showShopSidebar, setShowShopSidebar } =
    useContext(productsContext);

  return (
    <>
      {showShopSidebar && (
        <section className="fixed top-0 left-0 z-10 bg-white-200 border-r dark:bg-black-900 h-full lg:w-[13%] w-[10%] font-bold">
          <div className="py-5 lg:pl-5 sm:pl-5 pl-3 xl:text-[.9rem] md:text-xs mt-10">
            <div className="flex justify-center items-center w-full lg:pb-5 pr-4 mt-4 invisible lg:visible">
              <img
                src={mode ? "/images/shopLogoDark.png" : "/images/shoLlogoLight.png"}
                alt="logo"
                className="rounded-md w-32 absolute left-3"
              />

              <FontAwesomeIcon
                icon={faBars}
                className="text-2xl mr-5 absolute right-0"
                onClick={() => setShowShopSidebar(!showShopSidebar)}
              />
            </div>

            <div className="lg:mt-6">
              {items.map((item, index) => (
                <Link
                  className="flex py-4 items-center lg:text-xs xl:text-base text-black-700 relative dark:text-white-100"
                  key={index}
                  to={item.to}
                >
                  <div>
                    <div className="hover-element relative whitespace-nowrap">
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="lg:text-base text-xl"
                      />
                      <Link className="ml-3 lg:visible invisible" to={item.to}>
                        {item.text}
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:pl-7 sm:pl-5 pl-3 pr-4 xl:text-sm md:text-xs">
            <p className="text-xs lg:flex hidden text-black-200 pt-6 pb-4 dark:text-white-100">
              Options
            </p>
            <Link className="flex py-4 text-black-700 hover:text-gray-500 duration-500 dark:text-white-100">
              <FontAwesomeIcon
                icon={faGear}
                className="mr-3 lg:text-base text-xl"
              />
              <p className="invisible lg:visible">Setting</p>
            </Link>
            <Link className="flex py-4 text-black-700 hover:text-gray-500 duration-500 dark:text-white-100">
              <FontAwesomeIcon
                icon={faSignOut}
                className="mr-3 lg:text-base text-xl"
              />
              <p className="invisible lg:visible"> Log Out</p>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
