import React, { useContext, useEffect, useState } from "react";
import { faMoon, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import productsContext from "../../Context/productsContext";
export default function Header() {
  const [onScrollHeader, setOnScrollHeader] = useState(false);
  const { mode, setMode } = useContext(productsContext);

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
        className={` " flex justify-between items-center px-4 py-5 fixed z-10 dark:bg-dark right-0 top-0 w-[87%] " ${
          onScrollHeader ? "backdrop-blur-lg" : "bg-white-200 "
        }`}
      >
        <div className="flex items-center relative ml-10 text-gray-200">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute text-sm left-3 text-black-800"
          />
          <input
            type="text"
            placeholder="search for data user ..."
            className="pl-8 py-2 outline-none text-gray-700 rounded-lg bg-white-200 placeholder:text-black-800 placeholder:text-sm"
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
          <div className="flex items-center border-l dark:text-white-100 border-gray-100 px-4">
            <p className="text-xs mr-2">Alireza Safari</p>
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
