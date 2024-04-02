import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import {
  faCircleQuestion,
  faEdit,
  faHeart,
  faRightFromBracket,
  faRoute,
  faUserAstronaut,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import userAxios from "../../services/Axios/userInterceptors";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const { datas: userInfo } = useFetch("/is_authenticated", userAxios);
  const { setUserIsLogin, userLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const logOutHandler = () => {
    userAxios.get("/logout").then((res) => {
      if (res.status === 200) {
        navigate("/login");
        userLogin();
        setUserIsLogin(false);
      }
    });
  };
  
  return (
    <div className="absolute top-16 right-24 dark:bg-black-900 dark:text-white-100 bg-white-100 text-sm px-6 py-4 rounded-xl z-10 border">
      <div className="mb-3">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrT3XAWJ1ibDAoQ7sLZuYTk062ZYlr2JDNzPtmr8savg&usqp=CAU&ec=48665698"
          alt="admin image"
          className="rounded-full w-12 h-12 border-2 border-white-100 mb-3"
        />
        <p className="py-1">{userInfo?.username}</p>
        <p className="text-xs text-gray-500">{userInfo?.role?.name} Member</p>
      </div>

      <Link className="flex items-center py-2" to="/profile/address">
        <FontAwesomeIcon icon={faRoute} />
        <p className="pl-2">Address</p>
      </Link>
      <Link className="flex items-center py-2" to="/profile/favorite">
        <FontAwesomeIcon icon={faHeart} />
        <p className="pl-2">Favorite Products</p>
      </Link>
      <Link
        className="flex items-center border-b pb-4 py-1"
        to="/profile/orders"
      >
        <FontAwesomeIcon icon={faUserAstronaut} />
        <p className="pl-2">Orders</p>
      </Link>

      <Link className="flex py-2 pt-4">
        <FontAwesomeIcon icon={faCircleQuestion} />
        <p className="pl-2">Help Center</p>
      </Link>

      <Link className="flex py-2">
        <FontAwesomeIcon icon={faUserGear} />
        <p className="pl-1">Account Setting</p>
      </Link>

      <Link className="flex py-2" onClick={() => logOutHandler()}>
        <FontAwesomeIcon icon={faRightFromBracket} />
        <p className="pl-2">Log Out</p>
      </Link>
    </div>
  );
}
