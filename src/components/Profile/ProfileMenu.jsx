import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { faHeart, faRoute, faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../pages/Sidebar/Sidebar.css";
import AuthContext from "../../Context/AuthContext";

export default function ProfileMenu() {
  const { userInfos } = useContext(AuthContext);
  const items = [
    { icon: faShop, text: "orders", to: `/profile/orders` },
    { icon: faRoute, text: "address", to: "/profile/address" },
    { icon: faHeart, text: "favorite", to: "/profile/favorite" },
    { icon: faHeart, text: "comments", to: "/profile/comments" },
  ];

  const [activeId, setActiveId] = useState(null);

  const lastLinkIndex = items.length - 1;

  return (
    <section className="border rounded-xl dark:bg-black-800">
      <div className="flex items-center p-2 border-b py-4">
        <img
          src="/images/fd4840b2.svg"
          alt=""
          className="lg:w-16 lg:h-16 w-10 h-10 lg:mr-8 mr-2"
        />
        <p className="text-black-700 dark:text-white-100 lg:text-base text-xs">
          {userInfos?.username}
        </p>
      </div>
      <div className="">
        {items.map((item, index) => (
          <Link
            className={`flex items-center lg:justify-normal justify-center text-black-700 dark:text-white-100 relative p-5 py-7 hover:bg-gray-100 duration-500 hover-element ${
              activeId?.toLocaleLowerCase() === item?.text.toLocaleLowerCase()
                ? "active"
                : ""
            } ${index === lastLinkIndex ? "" : " border-b"}`} // اضافه کردن کلاس `no-border-b` به آخرین `Link`
            onClick={() => setActiveId(item.text)}
            key={index}
            to={item.to}
          >
            <div>
              <FontAwesomeIcon icon={item.icon} />
              <Link
                className="ml-3 font-bold lg:text-base text-sm"
                to={`${item.text}`}
              >
                {item.text}
              </Link>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
