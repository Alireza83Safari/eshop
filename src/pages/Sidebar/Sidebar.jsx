import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import userAxios from "../../services/Axios/userInterceptors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faGear,
  faHomeAlt,
  faShop,
  faSignOut,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import productsContext from "../../Context/AuthContext";
import AuthContext from "../../Context/AuthContext";

export default function Sidebar() {
  const { userLogin } = useContext(AuthContext);
  const { datas: category } = useFetch("/category/selectList", userAxios);
  const { showShopSidebar, setShowShopSidebar } = useContext(productsContext);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const logOutHandler = () => {
    userAxios.get("/logout").then((res) => {
      userLogin();
    });
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const categoryHandler = (data) => {
    document.location.href = `/category/product?categoryId=${data?.key}`;
  };
  return (
    <>
      {showShopSidebar && (
        <section className="fixed top-0 left-0 bg-white-200 border-r dark:bg-black-900 h-full lg:w-[11%] md:w-[7%] w-[9%] text-center font-bold z-10">
          <div className="py-5 lg:pl-5 sm:pl-5 pl-3 xl:text-[.9rem] md:text-xs">
            <div className="flex justify-center items-center w-full lg:pb-5 pr-4">
              <FontAwesomeIcon
                icon={faBars}
                className="xl:text-4xl md:text-2xl absolute top-6"
                onClick={() => setShowShopSidebar(!showShopSidebar)}
              />
            </div>

            <div className="mt-12">
              <Link
                className="flex py-4 items-center text-sm xl:text-base text-black-700 dark:text-white-100 hover-element relative whitespace-nowrap"
                to="/"
              >
                <FontAwesomeIcon
                  icon={faHomeAlt}
                  className="lg:text-base text-xl"
                />
                <p className="ml-3 lg:visible invisible">Home</p>
              </Link>

              <Link
                className="flex py-4 items-center text-sm xl:text-base text-black-700 dark:text-white-100 hover-element relative whitespace-nowrap"
                to="/products"
              >
                <FontAwesomeIcon
                  icon={faShop}
                  className="lg:text-base text-xl"
                />
                <p className="ml-3 lg:visible invisible">Shop</p>
              </Link>

              <div className="cursor-pointer" onClick={toggleSubMenu}>
                <div className="flex items-center py-4 text-sm xl:text-base text-black-700 dark:text-white-100">
                  <FontAwesomeIcon
                    icon={faTableCells}
                    className="lg:text-base text-xl"
                  />
                  <p className="ml-3 lg:visible invisible">Category</p>
                </div>

                {showSubMenu && (
                  <div>
                    {category?.data?.map((data) => (
                      <Link
                        className="flex py-2 ml-4 items-center text-sm text-black-700 dark:text-white-100 hover-element relative whitespace-nowrap"
                        to="products"
                        onClick={() => categoryHandler(data)}
                      >
                        <p className="ml-3 lg:visible invisible text-sm">
                          {data?.value}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
              <p className="invisible lg:visible" onClick={logOutHandler}>
                Log Out
              </p>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
