import React, { useContext, useState, lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faMoon,
  faSignIn,
  faSun,
  faContactCard,
  faSearch,
  faSignOut,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import userAxios from "../services/Axios/userInterceptors";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Spinner from "./Spinner/Spinner";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { useEffect } from "react";
const Profile = lazy(() => import("./Profile/Profile"));

export default function Header() {
  const { userIsLogin, userInfos, userLogin, setUserIsLogin } =
    useContext(AuthContext);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const { mode, setMode } = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("searchTerm");
    if (searchTerm) {
      setSearchQuery(searchTerm);
    }
  }, [location.search]);

  const searchInHref = () => {
    if (searchQuery.trim()?.length) {
      navigate(`/products?searchTerm=${searchQuery}`);
    }
  };

  const { datas: category } = useFetch("/category/selectList", userAxios);

  const categoryHandler = (data) => {
    navigate(`/products?categoryId=${data?.key}`);
  };

  const logOutHandler = () => {
    userAxios.get("/logout").then((res) => {
      if (res?.status === 200) {
        navigate("/login");
        userLogin();
        setUserIsLogin(false);
      }
    });
  };

  const [showCategory, setShowCategory] = useState(false);
  return (
    <header className="w-full min-w-full bg-white-200 dark:bg-black-800 fixed top-0 right-0 z-10">
      <div className="flex justify-between items-center mx-auto xl:px-8 py-5 px-5 xl:container relative">
        <div className="flex items-center">
          <div className="md:mr-8 mr-6 flex items-center">
            <FontAwesomeIcon
              icon={faBars}
              className="text-2xl mr-3 dark:text-white-100 flex lg:hidden"
              onClick={() => setShowSubMenu(!showSubMenu)}
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
                className="absolute flex items-center text-sm bg-blue-600 p-3 py-3 border dark:border-2 border-blue-600 sm:text-sm left-0 text-white-100 rounded-l-md"
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
        <ul className="dark:text-white-100 gap-x-12 lg:text-bas md:text-sm hidden lg:flex">
          {(userInfos?.role?.name === "admin") |
            (userInfos?.role?.name === "root") && (
            <Link
              to="/panel"
              className="hover:text-blue-600 duration-300 font-semibold"
            >
              Panel
            </Link>
          )}

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
              {category?.data?.map((data) => (
                <li
                  className="flex py-2 items-center text-black-700 dark:text-white-100 relative whitespace-nowrap text-sm hover:text-blue-600"
                  to="product"
                  onClick={() => categoryHandler(data)}
                  key={data.key}
                >
                  {data?.value}
                </li>
              ))}
            </ul>
          </Link>

          <Link
            to="/contact"
            className="hover:text-blue-600 duration-300 font-semibold"
          >
            Contact
          </Link>
        </ul>
        <div className="flex items-center">
          <div className="mr-2 py-1 px-2 rounded-lg dark:text-white-100">
            <div className="md:px-3 flex items-center usercart-parent">
              <div className="sm:mx-4 mx-2" onClick={() => setMode(!mode)}>
                <FontAwesomeIcon
                  icon={mode == false ? faMoon : faSun}
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
                    {/*     <div className="absolute -top-3 -right-2 text-white-100 bg-red-700 rounded-full w-4 h-4 flex justify-center items-center text-[9px]">
                      {orders}
                    </div> */}
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

      {showSubMenu && (
        <section className="fixed top-0 left-0 bg-white-200 border-r dark:bg-black-900 h-full w-[8rem] text-center font-bold z-10">
          <div className="py-4 xl:text-[.9rem] md:text-xs">
            <div className="flex justify-center items-center">
              <FontAwesomeIcon
                icon={faBars}
                className="text-xl absolute top-6 dark:text-white-100"
                onClick={() => setShowSubMenu(!showSubMenu)}
              />
            </div>

            <div className="mt-12">
              <div className="flex md:hidden pb-3 items-center relative text-black-800 border-b px-2 hover:bg-gray-50 dark:hover:bg-black-900">
                <button
                  className="absolute text-xs sm:text-sm left-1 bg-blue-600 border border-blue-600 py-2 px-2 text-white-100 rounded-l-md"
                  onClick={() => searchInHref()}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
                <input
                  type="text"
                  placeholder=" search ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      searchInHref();
                    }
                  }}
                  className="outline-none relative rounded-r-md ml-6 w-11/12 py-1 placeholder:text-black-800 placeholder:text-xs border border-blue-600"
                />
              </div>
              <Link
                className="flex py-4 items-center text-sm text-black-700 dark:text-white-100 hover-element relative whitespace-nowrap border-b px-2 hover:bg-gray-50"
                to="/"
              >
                <img src="/images/home.svg" alt="" className="w-4 h-4" />
                <p className="ml-1">Home</p>
              </Link>

              <Link
                className="flex py-4 items-center text-sm text-black-700 dark:text-white-100 hover-element relative whitespace-nowrap border-b px-2 hover:bg-gray-50"
                to="/products"
              >
                <FontAwesomeIcon icon={faCartShopping} className="w-4 h-4" />
                <p className="ml-1">products</p>
              </Link>

              <Link
                className="flex py-4 items-center text-sm text-black-700 dark:text-white-100 hover-element relative whitespace-nowrap border-b px-2 hover:bg-gray-50"
                to="/product"
              >
                <FontAwesomeIcon icon={faContactCard} className="w-4 h-4" />
                <p className="ml-1">Contact</p>
              </Link>

              <div
                className="cursor-pointer"
                onClick={() => setShowCategory(!showCategory)}
              >
                <div className="flex items-center py-4 text-sm text-black-700 dark:text-white-100 px-2 border-b hover:bg-gray-50">
                  <FontAwesomeIcon icon={faSort} className="w-4 h-4" />
                  <p className="ml-1">Category</p>
                </div>

                {showCategory && (
                  <div>
                    {category?.data?.map((data) => (
                      <Link
                        className="flex py-2 ml-4 items-center text-sm text-black-700 dark:text-white-100 hover-element relative whitespace-nowrap"
                        to="product"
                        onClick={() => categoryHandler(data)}
                        key={data?.key}
                      >
                        <p className="ml-3 text-sm">{data?.value}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Link className="flex pb-4 items-center text-sm text-black-700 dark:text-white-100 hover-element relative whitespace-nowrap border-b px-2 hover:bg-gray-50">
            <FontAwesomeIcon
              className="mr-2"
              icon={faSignOut}
              onClick={logOutHandler}
            />
            Log Out
          </Link>
        </section>
      )}
    </header>
  );
}
