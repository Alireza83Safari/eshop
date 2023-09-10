import React, { useContext, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faCoins,
  faCommentDots,
  faGear,
  faGripHorizontal,
  faJedi,
  faLayerGroup,
  faSignOut,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import AuthContext from "../../../Context/AuthContext";
import adminAxios from "../../../services/Axios/adminInterceptors";

export default function Sidebar() {
  const items = [
    { icon: faGripHorizontal, text: "dashboard", to: "dashboard" },
    { icon: faBox, text: "product", to: "product" },
    { icon: faCoins, text: "orders", to: "orders" },
    { icon: faCommentDots, text: "comments", to: "/panel/comments" },
    { icon: faLayerGroup, text: "roles", to: "/panel/roles" },
    { icon: faUsers, text: "users", to: "/panel/users" },
    { icon: faJedi, text: "appPic", to: "/panel/appPic" },
  ];

  const location = useLocation().pathname;
  const pathNames = location.substring(location.lastIndexOf("/") + 1);
  const { mode, adminLogin, userLogin } = useContext(AuthContext);

  const activeId = useMemo(() => pathNames, [pathNames]);

  const logoutHandler = () => {
    adminAxios
      .get("/logout")
      .then((res) => {
        if (res.status === 200) {
          adminLogin();
          userLogin();
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <section className="fixed top-0 left-0 bg-white-100 dark:bg-black-900 h-full xl:w-[10%] lg:w-[12%] sm:w-[6%] w-[9%] font-bold">
      <div className="">
        <Link to="dashboard" className="">
          <div className="w-full invisible lg:visible">
            <img
              src={mode ? "/images/logo-dark.png" : "/images/logo-light.png"}
              alt="logo"
              className="py-3 px-5"
            />
          </div>
        </Link>
        <p className="text-black-200 lg:pl-4 dark:text-white-100 whitespace-nowrap lg:text-xs lg:pt-6 invisible lg:visible">
          main menu
        </p>

        <div className="lg:mt-6">
          {items.map((item, index) => (
            <Link
              className="flex xl:py-6 py-5 items-center lg:justify-normal justify-center text-black-700 relative dark:text-white-100 lg:pl-4"
              key={index}
              to={item.to}
            >
              <div
                className={` hover-element relative whitespace-nowrap 2xl:text-lg xl:text-sm text-xs ${
                  activeId.toLocaleLowerCase() === item.text.toLocaleLowerCase()
                    ? "active"
                    : ""
                }`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className="lg:text-base text-xl"
                />
                <Link className="ml-3 lg:inline hidden" to={item.to}>
                  {item.text}
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="lg:pl-7 sm:pl-4 pl-2 xl:text-sm md:text-xs">
        <p className="text-xs lg:flex hidden text-black-200 pb-4 dark:text-white-100">
          Options
        </p>
        <Link className="flex py-5 text-black-700 hover:text-gray-500 duration-500 dark:text-white-100">
          <FontAwesomeIcon
            icon={faGear}
            className="mr-3 lg:text-base text-xl"
          />
          <p className="invisible lg:visible">Setting</p>
        </Link>
        <Link className="flex py-3 text-black-700 hover:text-gray-500 duration-500 dark:text-white-100">
          <FontAwesomeIcon
            icon={faSignOut}
            className="mr-3 lg:text-base text-xl"
          />
          <p className="invisible lg:visible" onClick={() => logoutHandler()}>
            Log Out
          </p>
        </Link>
      </div>
    </section>
  );
}