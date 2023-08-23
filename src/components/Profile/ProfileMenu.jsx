import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faHeart, faRoute, faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import "../../pages/Admin/Sidebar/Sidebar.css";


export default function ProfileMenu() {
  const { datas } = useFetch("/api/v1/user/is_authenticated");
  const items = [
    { icon: faShop, text: "orders", to: `/profile/orders` },
    { icon: faRoute, text: "address", to: "/profile/address" },
    { icon: faHeart, text: "favorite", to: "/profile/favorite" },
    { icon: faHeart, text: "comments", to: "/profile/comments" },
  ];

  const [activeId, setActiveId] = useState(null);

  return (
    <section className="border rounded-xl">
      <div className="flex items-center p-2 border-b py-4">
        <img
          src="https://api.digikala.com/static/files/fd4840b2.svg"
          alt=""
          className="w-16 h-16 mr-8"
        />
        <p>{datas?.username}</p>
      </div>
      <div className="">
        {items.map((item, index) => (
          <Link
            className="flex items-center lg:justify-normal justify-center text-black-700 relative dark:text-white-100 border-b p-5"
            key={index}
            to={item.to}
          >
            <div
              className={` hover-element relative whitespace-nowrap ${
                activeId?.toLocaleLowerCase() === item?.text.toLocaleLowerCase()
                  ? "active"
                  : ""
              }`}
              onClick={() => setActiveId(item.text)}
            >
              <FontAwesomeIcon icon={item.icon} />
              <Link className="ml-3 font-bold" to={`${item.text}`}>
                {item.text}
              </Link>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
