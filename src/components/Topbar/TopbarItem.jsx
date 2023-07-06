import React from "react";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TopbarItem({ data, isLast }) {
  return (
    <div className={`px-4 mx-4 ${isLast ? "" : "border-r border-dashed"}`}>
      <div className="flex items-center justify-between text-sm">
        <p className="mr-4 whitespace-nowrap">{data.title}</p>
        <span
          className={`${
            data.change.includes("-")
              ? "mx-1 text-red flex items-center font-bold"
              : "mx-1 text-green-200 flex items-center font-bold"
          }`}
        >
          <FontAwesomeIcon
            icon={data.change.includes("-") ? faCaretDown : faCaretUp}
            className="mx-1"
          />
          {data.change}%
        </span>
      </div>
      <h1 className="font-bold text-3xl my-3 text-blue-600">
        {data.total.toLocaleString()}$
      </h1>
      <p className="text-sm text-gray-500">{data.date} </p>
    </div>
  );
}
