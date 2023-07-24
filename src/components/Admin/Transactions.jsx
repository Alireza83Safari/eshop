import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Transactions = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    productSales();
  }, []);

  const productSales = () => {
    fetch("http://localhost:9000/sales/")
      .then((res) => res.json())
      .then((sales) => {
        setSales(sales);
      });
  };

  return (
    <div className="md:col-span-7 col-span-10 text-center mt-6 mx-7">
      <p className="2xl:text-lg text-xs font-bold py-2 rounded-t-xl w-full bg-white-100 dark:text-white-100 dark:bg-black-200">
        Transactions
      </p>
      <div className="container lg:px-8 bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-b-xl">
        <table className="min-w-full">
          <thead>
            <tr className="grid lg:grid-cols-6 grid-cols-5 border-b xl:text-base text-xs">
              <th className="col-span-1 py-2">User</th>
              <th className="lg:col-span-1 lg:block hidden py-2">Status</th>
              <th className="col-span-1 py-2">Date</th>
              <th className="col-span-1 py-2">Amount</th>
              <th className="col-span-1 py-2">Tax</th>
              <th className="col-span-1 py-2">Sold</th>
            </tr>
          </thead>
          <tbody>
            {sales.slice(0, 6).map((transaction) => (
              <tr
                className="grid lg:grid-cols-6 grid-cols-5 px-4 xl:text-sm text-[10px]"
                key={transaction.id}
              >
                <td className="col-span-1 py-2 flex items-center">
                  <img
                    src="https://lledogrupo.com/wp-content/uploads/2018/04/user-img-1.png"
                    className="w-8 h-8 mr-3 sm:block hidden"
                    alt="User Avatar"
                  />
                  <p className=" font-bold">{transaction.user}</p>
                </td>
                <td className="lg:col-span-1 lg:block hidden py-2 text-xs">
                  {transaction.status === "done" ? (
                    <button className="font-black bg-green-100 text-green-300 lg:px-2 px-1 py-1 rounded-md">
                      {transaction.status}
                    </button>
                  ) : (
                    <button className="font-black bg-orange-100 text-orange-400 px-2 py-1 rounded-md">
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
                  <button className="border lg:px-2 px-1 py-1 rounded-lg border-gray-500 text-gray-500">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="w-full py-3">
          <Link className="text-sm font-black 2xl:text-xl" to="panel/financial">
            View more...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
