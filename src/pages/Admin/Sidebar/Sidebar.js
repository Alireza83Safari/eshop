import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faCommentDots,
  faGear,
  faGripHorizontal,
  faSignOut,
  faUserAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import productsContext from "../../../Context/productsContext";

export default function Sidebar() {
  const items = [
    { icon: faGripHorizontal, text: "dashboard", to: "dashboard" },
    { icon: faBox, text: "products", to: "products" },
    { icon: faUserAlt, text: "financial", to: "financial" },
    { icon: faCommentDots, text: "comments", to: "/panel/comments" },
    { icon: faUserPlus, text: "chat", to: "/panel/chat" },
  ];

  const location = useLocation().pathname;
  const productName = location.substring(location.lastIndexOf("/") + 1);

  const [activeId, setActiveId] = useState(productName || "dashboard");
  const { mode } = useContext(productsContext);

  useEffect(() => {
    setActiveId(productName);
  }, [productName]);

  return (
    <section className="fixed top-0 left-0 bg-white-100 dark:bg-black-900 h-full w-[11%] lg:w-[13%] sm:w-[7%] font-bold">
      <div className="py-5 lg:pl-7 sm:pl-5 pl-3 xl:text-[.9rem] md:text-xs">
        <Link to="dashboard">
          <div className="pr-3 invisible lg:visible">
            <img
              src={mode ? "/images/logo-dark.png" : "/images/logo-light.png"}
              alt="logo"
            />
          </div>
        </Link>
        <p className="text-black-200 left-2 dark:text-white-100 whitespace-nowrap lg:text-xs lg:pt-6 invisible lg:visible">
          main menu
        </p>

        <div className="lg:mt-6">
          {items.map((item, index) => (
            <Link
              className="flex py-4 items-center lg:text-xs xl:text-base text-black-700 relative dark:text-white-100"
              key={index}
              to={item.to}
            >
              <div>
                <div
                  className={`hover-element relative whitespace-nowrap ${
                    activeId.toLocaleLowerCase() ===
                    item.text.toLocaleLowerCase()
                      ? "active"
                      : ""
                  }`}
                >
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
  );
}