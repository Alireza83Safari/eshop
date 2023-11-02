import React, { useContext, useEffect, useState } from "react";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

export default function Header({ mode, setMode }) {
  const [onScrollHeader, setOnScrollHeader] = useState(false);
  const { userInfos } = useContext(AuthContext);

  const location = useLocation();
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const profileThreshold = 40;
      setOnScrollHeader(scrolled > profileThreshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="relative">
      <div
        className={` flex justify-between items-center px-4 md:py-5 py-4 fixed z-10 dark:bg-dark right-0 top-0 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] bg-white-100 dark:bg-black-900 ${
          onScrollHeader ? "bg-white-100" : ""
        }`}
      >
        <p className="font-bold ml-5 md:text-lg text-sm dark:text-white-100">
          {location.pathname?.slice(7)}
        </p>
        <div className="flex">
          <div className="mr-2 py-1 px-2 rounded-lg dark:text-white-100">
            <div className="px-3 ">
              <div onClick={() => setMode(!mode)}>
                <FontAwesomeIcon icon={faMoon} className="text-2xl" />
              </div>
            </div>
          </div>

          <div className="relative flex items-center border-l dark:text-white-100 border-gray-100 px-4">
            <p className="text-sm mr-2 sm:flex hidden">{userInfos?.username}</p>
            <div className="w-9 h-9">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrT3XAWJ1ibDAoQ7sLZuYTk062ZYlr2JDNzPtmr8savg&usqp=CAU&ec=48665698"
                alt="admin image"
                className="rounded-full w-full h-full border-2 border-white-100"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
