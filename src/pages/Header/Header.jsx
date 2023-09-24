import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faMoon,
  faSearch,
  faSignIn,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import userAxios from "../../services/Axios/userInterceptors";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import AuthContext from "../../Context/AuthContext";
import useFetch from "../../hooks/useFetch";
import ThemeContext from "../../Context/ThemeContext";
const Profile = lazy(() => import("../../components/Profile/Profile"));

export default function Header() {
  const { showShopSidebar, setShowShopSidebar, userIsLogin } =
    useContext(AuthContext);
  const { mode, setMode } = useContext(ThemeContext);
  const [orders, setOrders] = useState(0);
  const [userInfos, setUserInfos] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const ordersData = async () => {
    try {
      const response = await userAxios.get("/order");
      setOrders(response?.data?.items.length);
    } catch (error) {}
  };

  const fetcUserInfos = async () => {
    try {
      const response = await userAxios.get("/is_authenticated");
      setUserInfos(response?.data);
    } catch (error) {}
  };

  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    if (userIsLogin) {
      ordersData();
      fetcUserInfos();
    }
  }, []);

  const searchInHref = () => {
    if (searchQuery.trim().length) {
      navigate(`/search/product?searchTerm=${searchQuery}`);
    }
  };

  let getTheme = localStorage.getItem("theme");
  const { datas: category } = useFetch("/category/selectList", userAxios);

  const categoryHandler = (data) => {
    document.location.href = `/category/product?categoryId=${data?.key}`;
  };
  return (
    <header className="w-full min-w-full bg-white-200 dark:bg-black-800 fixed top-0 right-0 z-10">
      <div className="flex justify-between items-center mx-auto xl:px-20 py-5 px-5 xl:container">
        <div className="flex items-center">
          <div className="md:mr-12 mr-6 flex items-center">
            <FontAwesomeIcon
              icon={faBars}
              className="text-2xl mr-3 dark:text-white-100 flex lg:hidden"
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
                className="rounded-md w-24 sm:flex hidde"
              />
            </Link>
          </div>
          <div>
            <div className="items-center relative md:ml-2 bg-white-100 px-2 rounded-lg text-black-800 md:flex hidden">
              <button
                className="absolute flex items-center text-sm bg-blue-600 p-3 py-3 border border-blue-600 sm:text-sm left-0 text-white-100 rounded-l-md"
                onClick={() => searchInHref()}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <input
                type="text"
                placeholder="search ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    searchInHref();
                  }
                }}
                className="outline-none text-gray-700 relative rounded-r-md ml-6 2xl:w-[180px] lg:w-[160px] md:w-[160px] w-[100px] py-2 placeholder:text-black-800 md:placeholder:text-sm placeholder:text-xs"
              />
            </div>
          </div>
        </div>
        <ul className="dark:text-white-100 gap-x-12 lg:text-base md:text-sm hidden lg:flex">
          <Link
            to="/"
            className="hover:text-blue-600 duration-300 font-semibold"
          >
            Home
          </Link>
          <Link
            to="/product"
            className="hover:text-blue-600 duration-300 font-semibold"
          >
            Shop
          </Link>
          <Link
            to=""
            className="relative group hover:text-blue-600 duration-300 font-semibold"
          >
            Category
            <ul className="absolute top-8 invisible group-hover:visible bg-white border dark:bg-black-200 border-gray-50 rounded-lg py-2 px-4 bg-white-100 duration-300">
              {category?.data?.map((data, index) => (
                <li
                  className="flex py-2 items-center text-black-700 dark:text-white-100 relative whitespace-nowrap text-sm hover:text-blue-600"
                  to="product"
                  onClick={() => categoryHandler(data)}
                  key={index}
                >
                  {data?.value}
                </li>
              ))}
            </ul>
          </Link>
        </ul>
        <div className="flex items-center">
          <div className="mr-2 py-1 px-2 rounded-lg dark:text-white-100">
            <div className="md:px-3 flex items-center usercart-parent">
              <div className="sm:mx-4 mx-2" onClick={() => setMode(!mode)}>
                <FontAwesomeIcon
                  icon={getTheme == "light" ? faMoon : faSun}
                  className="sm:text-2xl text-xl"
                />
              </div>
              <div className="sm:mx-4 mx-2">
                {userIsLogin ? (
                  <Link to="/checkout" className="relative">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="sm:text-2xl text-xl"
                    />
                    <div className="absolute -top-3 -right-2 text-white-100 bg-red-700 rounded-full w-4 h-4 flex justify-center items-center text-[9px]">
                      {orders}
                    </div>
                  </Link>
                ) : (
                  <Link to="/login" className="relative">
                    <FontAwesomeIcon
                      icon={faSignIn}
                      className="sm:text-2xl text-xl"
                    />
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div
            className="relative flex items-center border-l dark:text-white-100 border-gray-100 px-4 "
            onClick={() => setShowProfile(!showProfile)}
          >
            {userIsLogin ? (
              <>
                <p className="text-xs mr-2 sm:flex hidden">
                  {userInfos?.username}
                </p>
                <div className="w-9 h-9">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrT3XAWJ1ibDAoQ7sLZuYTk062ZYlr2JDNzPtmr8savg&usqp=CAU&ec=48665698"
                    alt="admin image"
                    className="rounded-full w-full h-full border-2 border-white-100"
                  />
                </div>
              </>
            ) : (
              <Link to="/login">login / register</Link>
            )}
          </div>
          {userIsLogin && (
            <Suspense fallback={<Spinner />}>
              {showProfile && <Profile username={userInfos?.username} />}
            </Suspense>
          )}
        </div>
      </div>
    </header>
  );
}
