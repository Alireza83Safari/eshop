import React, { useEffect, useState } from "react";
import FinancialData from "./FinancialData";

export default function Financial() {
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

  const totalAmount =
    sales.length > 0
      ? sales.reduce((total, sale) => total + sale.amount, 0)
      : 0;
  const totalTax = Math.floor(totalAmount / 9);
  const netProfit = totalAmount - totalTax;
  return (
    <section className="float-right mt-20 pt-4 p-6 bg-white-200 dark:bg-black-600 w-[87%] h-[92vh]">
      <div className="grid grid-cols-10">
        <div className="col-span-7 mt-2 text-center">
          <p className="text-md font-bold border-b py-2 w-full bg-white-100 dark:text-white-100 dark:bg-black-200 rounded-t-xl">
            transactions
          </p>
          <div className="container h-[72vh] px-8 overflow-y-auto bg-white-100 dark:text-white-100 dark:bg-black-200 rounded-b-xl">
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
                {/* Render each product as a table row */}
                {sales.map((transaction) => (
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
                    <td className="col-span-1 py-2 ml-6">
                      <button className=" border px-2 py-1 rounded-lg border-gray-500 text-gray-500">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-3 px-5">
          <FinancialData
            tax={totalTax}
            income={totalAmount}
            netProfit={netProfit}
          />
        </div>
      </div>
    </section>
  );
}
