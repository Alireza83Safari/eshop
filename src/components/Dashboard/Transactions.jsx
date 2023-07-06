import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Transactions() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    productSales();
  }, []);
  const productSales = () => {
    fetch("http://localhost:9000/sales/")
      .then((res) => res.json())
      .then((sale) => {
        setSales(sale);
      });
  };

  return (
    <div className="col-span-7 text-center mt-6 mx-7">
      <p className="text-md font-bold py-2 rounded-t-xl w-full bg-white-100 dark:text-white-100 dark:bg-black-200">
        transactions
      </p>
      <div className="container px-8 bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-b-xl">
        <table className="min-w-full">
          <thead>
            <tr className="text-xs grid grid-cols-6 border-b">
              <th className="col-span-1 py-2">User</th>
              <th className="col-span-1 py-2">Status</th>
              <th className="col-span-1 py-2">Date</th>
              <th className="col-span-1 py-2">Amount</th>
              <th className="col-span-1 py-2">Tax</th>
              <th className="col-span-1 py-2">Sold</th>
            </tr>
          </thead>
          <tbody>
            {sales.slice(0, 6).map((transaction) => (
              <tr
                className="text-xs grid grid-cols-6 px-4"
                key={transaction.id}
              >
                <td className="col-span-1 py-2 flex items-center">
                  <img
                    src="https://lledogrupo.com/wp-content/uploads/2018/04/user-img-1.png"
                    className="w-8 h-8 mr-3"
                  />
                  <p className="text-xs font-bold">{transaction.user}</p>
                </td>
                <td className="col-span-1 py-2">
                  {transaction.status === "done" ? (
                    <button className="text-[10px] font-black bg-green-100 text-green-200 px-2 py-1 rounded-md ">
                      {transaction.status}
                    </button>
                  ) : (
                    <button className="text-[10px] font-black bg-orange-100 text-orange-400 px-2 py-1 rounded-md ">
                      {transaction.status}
                    </button>
                  )}
                </td>
                <td className="col-span-1 py-2">{transaction.date}</td>
                <td className="col-span-1 py-2">
                  {transaction.amount.toLocaleString()}$
                </td>
                <td className="col-span-1 py-2">
                  {Math.floor(transaction.amount / 9).toLocaleString()}$
                </td>
                <td className="col-span-1 pt-2 ml-6">
                  <button className=" border px-2 py-1 rounded-lg border-gray-500 text-gray-500">
                    Details
                  </button>
                </td>
              </tr>
            ))}
            <div className="w-full pb-4">
              <Link className="text-sm font-black" to="/financial">
                others...
              </Link>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
}
