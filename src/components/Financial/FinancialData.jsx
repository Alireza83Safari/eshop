import React from "react";

export default function FinancialData({ tax, income, netProfit }) {
  return (
    <div className="dark:text-white-100">
      <div className="bg-white-100 py-3 dark:bg-black-200 rounded-xl mt-2 text-center">
        <span className="font-bold text-sm">Your Tax in this month</span>
        <h1 className="text-3xl text-red font-bold my-6">
          {tax.toLocaleString()} $
        </h1>
      </div>

      <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl mt-6 text-center">
        <span className="font-bold text-sm">Your Income in this month</span>
        <h1 className="text-3xl text-blue-600 font-bold my-6">
          {income.toLocaleString()} $
        </h1>
        <div className="w-full"></div>
      </div>

      <div className="bg-white-100 dark:bg-black-200 py-4 rounded-xl mt-6 text-center">
        <span className="font-bold text-sm">Your net profit in this month</span>
        <h1 className="text-3xl text-green-200 font-bold my-6">
          {netProfit.toLocaleString()} $
        </h1>
      </div>
    </div>
  );
}
