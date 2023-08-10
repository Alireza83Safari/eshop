import React, { useEffect, useState } from "react";
import Pagination from "../Paganation";

export default function FiancialTable() {
  const [paginatedTransactions, setPaginatedTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9000/sales/")
      .then((res) => res.json())
      .then((sales) => {
        setSales(sales);
      });
  }, []);
  const pageSize = 7;
  const totalPage = Math.ceil(sales?.length / pageSize);
  const pageNumber = Array.from(Array(totalPage).keys());

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    setPaginatedTransactions(sales.slice(startIndex, endIndex));
  }, [currentPage, sales]);
  return (
    <div className="lg:col-span-8 col-span-10 mt-2 text-center sm:mx-5 sm:mr-5">
      <p className="md:text-base text-sm font-bold border-b py-2 w-full bg-white-100 dark:text-white-100 dark:bg-black-200 rounded-t-xl 2xl:text-xl">
        Transactions
      </p>
      <div className="sm:px-6 h-[26rem] overflow-y-auto bg-white-100 dark:text-white-100 dark:bg-black-200 rounded-b-xl relative">
        <table className="min-w-full">
          <thead>
            <tr className="sm:text-xs text-[8px] grid sm:grid-cols-6 grid-cols-5 border-b 2xl:text-lg">
              <th className="col-span-1 py-2" scope="col">
                User
              </th>
              <th className="col-span-1 py-2" scope="col">
                Status
              </th>
              <th className="col-span-1 sm:block hidden py-2" scope="col">
                Date
              </th>
              <th className="col-span-1 py-2" scope="col">
                Amount
              </th>
              <th className="col-span-1 py-2" scope="col">
                Tax
              </th>
              <th className="col-span-1 py-2" scope="col">
                Sold
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTransactions.map((transaction, index) => (
              <tr
                className="sm:text-xs text-[10px] grid sm:grid-cols-6 grid-cols-5 px-4"
                key={index}
              >
                <td className="col-span-1 sm:py-2 py-3 flex items-center">
                  <img
                    src="https://lledogrupo.com/wp-content/uploads/2018/04/user-img-1.png"
                    className="w-8 h-8 mr-3 sm:flex hidden"
                    alt="User Avatar"
                  />
                  <p className="font-bold">{transaction.user}</p>
                </td>
                <td className="col-span-1 sm:py-2 py-3">
                  {transaction.status === "done" ? (
                    <button
                      className="font-black bg-green-100 text-green-300 px-2 py-1 rounded-md"
                      aria-label="Transaction status: done"
                    >
                      {transaction.status}
                    </button>
                  ) : (
                    <button
                      className="font-black bg-orange-100 text-orange-400 px-2 py-1 rounded-md"
                      aria-label="Transaction status: pending"
                    >
                      {transaction.status}
                    </button>
                  )}
                </td>
                <td className="col-span-1 sm:py-2 py-3 sm:block hidden whitespace-nowrap">
                  {transaction.date}
                </td>
                <td className="col-span-1 sm:py-2 py-3">
                  {transaction.amount.toLocaleString()}$
                </td>
                <td className="col-span-1 sm:py-2 py-3">
                  {Math.floor(transaction.amount / 9).toLocaleString()}$
                </td>
                <td className="col-span-1 sm:py-2 py-3 ml-6">
                  <button
                    className="border sm:px-2 smpy-1 px-1 rounded-lg border-gray-500 text-gray-500"
                    aria-label="Transaction details"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          pageNumber={pageNumber}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
