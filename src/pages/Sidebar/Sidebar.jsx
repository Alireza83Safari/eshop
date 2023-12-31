import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userAxios from "../../services/Axios/userInterceptors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faContactCard,
  faSearch,
  faSignOut,
  faSort,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import { AuthContext } from "../../Context/AuthContext";

export default function Sidebar() {
  const { userLogin, setUserIsLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showShopSidebar, setShowShopSidebar } = useContext(AuthContext);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [category, setCategory] = useState([]);

  const logOutHandler = () => {
    userAxios.get("/logout").then((res) => {
      if (res?.status === 200) {
        navigate("/login");
        userLogin();
        setUserIsLogin(false);
      }
    });
  };
  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const categoryHandler = (data) => {
    document.location.href = `/category/product?categoryId=${data?.key}`;
  };

  const searchInHref = () => {
    if (searchQuery.trim()?.length) {
      navigate(`/search/product?searchTerm=${searchQuery}`);
    }
  };
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await userAxios.get("/category/selectList");
      setCategory(response?.data);
    };
    fetchCategory();
  }, []);
  
  return (
    <>
      {showShopSidebar && (
        <section className="fixed top-0 left-0 bg-white-200 border-r dark:bg-black-900 h-full w-[8rem] text-center font-bold z-10">
          <div className="py-4 xl:text-[.9rem] md:text-xs">
            <div className="flex justify-center items-center">
              <FontAwesomeIcon
                icon={faBars}
                className="text-xl absolute top-6 dark:text-white-100"
                onClick={() => setShowShopSidebar(!showShopSidebar)}
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
                to="/product"
              >
                <FontAwesomeIcon icon={faCartShopping} className="w-4 h-4" />
                <p className="ml-1">Shop</p>
              </Link>

              <Link
                className="flex py-4 items-center text-sm text-black-700 dark:text-white-100 hover-element relative whitespace-nowrap border-b px-2 hover:bg-gray-50"
                to="/product"
              >
                <FontAwesomeIcon icon={faContactCard} className="w-4 h-4" />
                <p className="ml-1">Contact</p>
              </Link>

              <div className="cursor-pointer" onClick={toggleSubMenu}>
                <div className="flex items-center py-4 text-sm text-black-700 dark:text-white-100 px-2 border-b hover:bg-gray-50">
                  <FontAwesomeIcon icon={faSort} className="w-4 h-4" />
                  <p className="ml-1">Category</p>
                </div>

                {showSubMenu && (
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
    </>
  );
}
