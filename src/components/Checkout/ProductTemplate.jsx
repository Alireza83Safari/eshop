import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import useRemove from "../../hooks/useRemove";

export default function ProductTemplate({
  order,
  handleDecrement,
  handleIncrement,
  fetchData,
}) {
  const { isLoading, removeHandler } = useRemove();
  const removeProductHandler = (id) => {
    removeHandler("/orderItem/delete/", id, fetchData);
  };
  return (
    <div
      key={order.id}
      className={`flex items-center border-b h-36 ${isLoading && "opacity-20"}`}
    >
      <img
        src={`http://127.0.0.1:6060/${order.fileUrl}`}
        className="w-24 h-24 object-contain md:mx-4"
      />
      <div className="md:ml-4 md:text-sm text-xs">
        <p className="pb-2">{order.productName}</p>
        <p className="py-1 text-gray-800">${order.price}</p>
        <p className="py-1m text-gray-800">Color: White</p>
      </div>

      <div className="absolute flex items-center right-10 md:text-sm text-xs">
        <p>${order.price * order.quantity}</p>

        <div className="flex items-center md:mx-10 mx-4">
          <button
            onClick={() => handleDecrement(order)}
            className="md:px-4 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
          >
            -
          </button>
          <span className="md:px-5 px-2">{order.quantity}</span>
          <button
            onClick={() => handleIncrement(order)}
            className="md:px-4 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
          >
            +
          </button>
        </div>
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="text-red-700"
          onClick={() => {
            removeProductHandler(order?.productItemId);
          }}
        />
      </div>
    </div>
  );
}
