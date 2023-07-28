import { faAngleRight, faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ links }) {
  return (
    <section className="flex bg-white-100 dark:bg-black-200 py-4 rounded-lg">
      <div className="flex items-center justify-center px-3 rounded-lg">
        <FontAwesomeIcon
          icon={faHome}
          className="text-sm text-gray-800 dark:text-white-100"
        />
      </div>
      <ul className="flex items-center mr-3">
        {links.map((link) => (
          <li className="list-none">
            <Link
              to={`/${link.to}`}
              className="flex items-center text-sm text-gray-800 dark:text-white-100"
            >
              {link.title}
              {link.id !== links.length ? (
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className=" text-gray-800 text-sm mx-3 dark:text-white-100"
                />
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
