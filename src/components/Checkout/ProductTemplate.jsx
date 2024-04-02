import React, { useState } from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useDeleteOrderItem from "../../api/order/user/useDeleteOrderItem";

export default function ProductTemplate({ order, changeProductQuantity }) {
  const [deleteId, setDeleteId] = useState(null);
  const { deleteOrderItem, isPending } = useDeleteOrderItem();

  const removeProductHandler = async () => {
    if (deleteId) {
      deleteOrderItem(deleteId);
    }
  };

  return (
    <div
      className={`flex items-center border-b h-36 ${isPending && "opacity-20"}`}
    >
      <img src={order.fileUrl} className="w-24 h-24 object-contain md:mx-4" />
      <div className="md:ml-4 md:text-sm text-xs">
        <p className="pb-2">{order.productName}</p>
        <div className="flex my-1">
          <p
            className={`  dark:text-white-100  text-sm whitespace-nowrap mr-6 ${
              order.discountValue && "line-through text-gray-200 "
            }`}
          >
            $ {order.price}
          </p>
          {order?.discountValue && (
            <p className=" dark:text-white-100  text-sm whitespace-nowrap">
              {order?.price - (order?.discountValue / 100) * order.price}$
            </p>
          )}
        </div>
        <p className="py-1m text-gray-800">Color: White</p>
      </div>

      <div className="absolute flex items-center right-10 md:text-sm text-xs">
        <p>
          $
          {(order?.discountValue
            ? order?.price - (order?.discountValue / 100) * order.price
            : order.price) * order.quantity}
        </p>

        <div className="flex items-center md:mx-10 mx-4">
          <button
            onClick={() => changeProductQuantity(order, "decrement")}
            className="md:px-4 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
          >
            -
          </button>
          <span className="md:px-5 px-2">{order.quantity}</span>
          <button
            onClick={() => changeProductQuantity(order, "increment")}
            className="md:px-4 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 duration-200 focus:outline-none"
          >
            +
          </button>
        </div>
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="text-red-700"
          onClick={() => {
            setDeleteId(order?.productItemId);
            removeProductHandler();
          }}
        />
      </div>
    </div>
  );
}
