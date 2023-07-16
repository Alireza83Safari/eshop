import React, { useContext, useEffect, useState } from "react";
import {
  faCircleQuestion,
  faEdit,
  faMoon,
  faRightFromBracket,
  faSearch,
  faUserAstronaut,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import productsContext from "../../Context/productsContext";
export default function Header() {
  const [onScrollHeader, setOnScrollHeader] = useState(false);
  const { mode, setMode } = useContext(productsContext);
  const [showProfile, setShowProfile] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const profileThreshold = 40;
      setOnScrollHeader(scrolled > profileThreshold);
      setShowProfile(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="relative">
      <div
        className={` " flex justify-between items-center px-4 md:py-5 py-3 fixed z-10 dark:bg-dark right-0 top-0 w-[89%] lg:w-[87%] sm:w-[93%] " ${
          onScrollHeader ? "backdrop-blur-lg" : "bg-white-200 "
        }`}
      >
        <div className="flex items-center relative sm:ml-10 text-gray-200">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute text-xs sm:text-sm left-3 text-black-800"
          />
          <input
            type="text"
            placeholder="        search for data user ..."
            className="py-1 outline-none text-gray-700 rounded-lg bg-white-200 placeholder:text-black-800 sm:placeholder:text-sm placeholder:text-xs sm:py-2 "
          />
        </div>

        <div className="flex">
          <div className="mr-2 py-1 px-2 rounded-lg dark:text-white-100">
            <div className="px-3 ">
              <div onClick={() => setMode(!mode)}>
                <FontAwesomeIcon icon={faMoon} className="text-2xl" />
              </div>
            </div>
          </div>

          <div
            className="relative flex items-center border-l dark:text-white-100 border-gray-100 px-4 "
            onClick={() => setShowProfile(!showProfile)}
          >
            <p className="text-xs mr-2 sm:flex hidden">Alireza Safari</p>
            <div className="w-9 h-9">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrT3XAWJ1ibDAoQ7sLZuYTk062ZYlr2JDNzPtmr8savg&usqp=CAU&ec=48665698"
                alt="admin image"
                className="rounded-full w-full h-full border-2 border-white-100"
              />
            </div>
          </div>
          {showProfile && (
            <div className="absolute top-16 dark:bg-black-900 dark:text-white-100 bg-white-100 text-sm px-6 py-4 rounded-xl">
              <div className="mb-3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrT3XAWJ1ibDAoQ7sLZuYTk062ZYlr2JDNzPtmr8savg&usqp=CAU&ec=48665698"
                  alt="admin image"
                  className="rounded-full w-12 h-12 border-2 border-white-100 mb-3"
                />
                <p className="py-1">Alireza Safari</p>
                <p className="text-xs text-gray-500">Premium Member</p>
              </div>
              <div className="flex items-center py-2">
                <FontAwesomeIcon icon={faEdit} />
                <p className="pl-2">Edit Profile</p>
              </div>
              <div className="flex items-center border-b pb-4 py-1">
                <FontAwesomeIcon icon={faUserAstronaut} />
                <p className="pl-2">View Profile</p>
              </div>

              <div className="flex py-2 pt-4">
                <FontAwesomeIcon icon={faCircleQuestion} />
                <p className="pl-2">Help Center</p>
              </div>

              <div className="flex py-2">
                <FontAwesomeIcon icon={faUserGear} />
                <p className="pl-1">Account Setting</p>
              </div>

              <div className="flex py-2">
                <FontAwesomeIcon icon={faRightFromBracket} />
                <p className="pl-2">Account Setting</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
