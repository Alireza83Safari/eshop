import React, { useEffect, useState } from "react";
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

export default function Sidebar() {
  const items = [
    { icon: faGripHorizontal, text: "Dashboard", to: "/dashboard" },
    { icon: faBox, text: "Products", to: "/products" },
    { icon: faUserAlt, text: "Financial", to: "/financial" },
    { icon: faCommentDots, text: "Comments", to: "/comments" },
    { icon: faUserPlus, text: "Chat", to: "/chat" },
  ];
  const location = useLocation().pathname.slice(1);
  const [activeId, setActiveId] = useState(location);

  useEffect(() => {
    setActiveId(location);
  }, [location]);

  return (
    <section className="fixed top-0 left-0 bg-white-100 dark:bg-black-900  h-full w-[13%] font-bold">
      <div className="py-5 pl-7 pr-4 text-[.9rem] ">
        <div className="w-full pt-2 pb-5 border-b border-gray-200">
          <img src="/images/logo.png" alt="logo" className="rounded-md" />
        </div>
        <p className="text-xs text-black-200 pt-6 pb-4 dark:text-white-100">
          main menu
        </p>

        {items.map((item, index) => (
          <Link
            className="flex py-3 items-center text-black-700 relative dark:text-white-100"
            key={index}
            to={item.to}
          >
            <div>
              <div
                className={`hover-element relative whitespace-nowrap ${
                  activeId.toLocaleLowerCase() === item.text.toLocaleLowerCase()
                    ? "active"
                    : ""
                }`}
              >
                <FontAwesomeIcon icon={item.icon} />
                <Link className="ml-3" to={item.to}>
                  {item.text}
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="pl-9 pr-4 text-sm ">
        <p className="text-xs text-black-200 pt-6 pb-4 dark:text-white-100">
          Options
        </p>
        <Link className="block py-3 text-black-700 hover:text-gray-500 duration-500 dark:text-white-100">
          <FontAwesomeIcon icon={faGear} className="mr-3" /> Setting
        </Link>
        <Link className="block py-3 text-black-700 hover:text-gray-500 duration-500 dark:text-white-100">
          <FontAwesomeIcon icon={faSignOut} className="mr-3" />
          Log Out
        </Link>
      </div>
    </section>
  );
}
