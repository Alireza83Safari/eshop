import React, { useContext, useEffect, useState } from "react";
import { faMoon, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import productsContext from "../../Context/productsContext";
import Profile from "../../components/Admin/Profile";

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
        <div className="flex bg-white-100 md:ml-6 rounded-lg relative">
          <input
            type="text"
            id="searchInput"
            placeholder="Search for data user ..."
            className="py-2 pl-7 outline-none rounded-lg text-xs"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute text-sm left-2 top-2 text-black-800"
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
          {showProfile && <Profile />}
        </div>
      </div>
    </header>
  );
}
