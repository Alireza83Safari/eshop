import React, { useContext, useEffect, useState } from "react";
import {
  faBars,
  faCartShopping,
  faMoon,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Profile from "../../components/Profile/Profile";
import productsContext from "../../Context/productsContext";

export default function Header() {
  const {
    mode,
    setMode,
    showShopSidebar,
    setShowShopSidebar,
    getProducts,
    orders,
  } = useContext(productsContext);

  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY) {
        setShowProfile(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.trim().length) {
      const filtered = getProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, getProducts]);

  return (
    <header className="w-full min-w-full bg-white-200 dark:bg-black-800">
      <div className="flex justify-between items-center mx-auto xl:px-20 py-5 px-5 xl:container">
        <div className="flex items-center">
          <div className="md:mr-20 mr-6 flex items-center">
            <FontAwesomeIcon
              icon={faBars}
              className="text-2xl md:mr-5 dark:text-white-100"
              onClick={() => setShowShopSidebar(!showShopSidebar)}
            />
            <Link to="/">
              <img
                src={
                  mode
                    ? "/images/shopLogoDark.png"
                    : "/images/shopLogoLight.png"
                }
                alt="logo"
                className="rounded-md w-32 md:flex hidden"
              />
            </Link>
          </div>
          <div>
            <div className="flex items-center relative md:ml-10 bg-white-100  px-2 rounded-lg text-black-800">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute text-xs sm:text-sm left-1"
              />
              <input
                type="text"
                placeholder="search ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-1 outline-none text-gray-700 relative rounded-lg ml-4 md:w-[220px] w-[100px] placeholder:text-black-800 sm:placeholder:text-sm placeholder:text-xs sm:py-2 "
              />
            </div>

            {searchQuery.length ? (
              filteredProducts.length === 0 ? (
                <div className="absolute top-16 mt-1 sm:ml-11 sm:w-[220px] w-[100px] h-14 bg-white-100 dark:bg-black-200 text-black-900 dark:text-white-100 z-10 rounded-lg shadow-lg">
                  <div className="mt-4 text-center">
                    <p className="text-sm text-red-700 ">
                      Product is not found
                    </p>
                  </div>
                </div>
              ) : (
                <div className="absolute top-16 sm:ml-10 sm:w-[220px] w-[100px] h-60 overflow-y-auto bg-white-200 dark:bg-black-800 border text-black-900 dark:text-white-100  dark:border-white-100 z-10 rounded-lg shadow-lg">
                  {filteredProducts.map((product) => (
                    <Link to={`products/${product.id}`} key={product.id}>
                      <div className="flex items-center p-2 border-b dark:border-white-100">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-10 h-10 rounded-md"
                        />
                        <p className="ml-3 text-sm">{product.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )
            ) : null}
          </div>
        </div>

        <div className="flex items-center">
          <div className="mr-2 py-1 px-2 rounded-lg dark:text-white-100">
            <div className="md:px-3 flex items-center usercart-parent">
              <div className="sm:mx-4 mx-2" onClick={() => setMode(!mode)}>
                <FontAwesomeIcon
                  icon={faMoon}
                  className="sm:text-2xl text-xl"
                />
              </div>
              <div className="sm:mx-4 mx-2">
                <Link to="/checkout" className="relative">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="sm:text-2xl text-xl"
                  />
                  <span className="absolute -top-3 text-white-100 bg-red-700 rounded-full px-1 sm:text-xs text-[9px]">
                    {orders.length}
                  </span>
                </Link>
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
