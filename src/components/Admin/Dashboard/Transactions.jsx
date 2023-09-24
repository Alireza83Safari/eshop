import React from "react";
import { Link } from "react-router-dom";

export default function Transactions({ orders }) {
  return (
    <div className="md:ml-7 ml-3 md:mr-4 mr-7 mt-4 md:mb-0 mb-6 text-center">
      <div className="sm:px-6 h-[25rem] overflow-auto bg-white-100 dark:text-white-100 dark:bg-black-200 rounded-xl relative">
        <p className="2xl:text-lg pt-2 font-bold  rounded-t-xl w-full bg-white-100 dark:text-white-100 dark:bg-black-200">
          Orders
        </p>
        <table className="min-w-full">
          <thead>
            <tr className="md:text-sm sm:text-xs text-[10px] text-center border-b">
              <th className="py-3">NO</th>
              <th className="py-3">userName</th>
              <th className="py-3">price</th>
              <th className="py-3">createdAt</th>
              <th className="py-3">status</th>
            </tr>
          </thead>

          <tbody>
            {orders?.data?.slice(0, 6).map((order, index) => (
              <tr
                className="md:text-sm sm:text-xs text-[10px] text-center"
                key={index}
              >
                <td className="py-3">{index + 1}</td>
                <td className="py-3">{order?.username}</td>
                <td className="py-3">{order?.price.toLocaleString()}$</td>
                <td className="py-3">{order?.createdAt.slice(0, 10)}</td>
                <td className="py-3 md:space-x-2">
                  {order?.status === 1 ? (
                    <button className="text-green-300 bg-green-400 px-2 py-1 text-xs rounded-md">
                      Ok
                    </button>
                  ) : (
                    <button className="bg-orange-100 text-orange-400 px-2 py-1 text-xs rounded-md">
                      pending
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/panel/orders" className="text-sm">
          show other...
        </Link>
      </div>
    </div>
  );
}
