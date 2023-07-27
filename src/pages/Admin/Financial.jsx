import React, { useEffect, useState } from "react";
import FinancialInfos from "../../components/Admin/FinancialInfos";
import PiesChart from "../../components/Admin/Charts/PieChart";
import Pagination from "../../components/Admin/Pagination";
/* import FiancialDetails from "../../components/Admin/FiancialDetails"; */

const Financial = () => {
  const [sales, setSales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedTransactions, setPaginatedTransactions] = useState([]);
  const [DetailsId, setDeatilsId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const pageSize = 8;
  const totalPage = Math.ceil(sales.length / pageSize);
  const pageNumber = Array.from(Array(totalPage).keys());

  const income = sales.reduce((total, sale) => total + sale.amount, 0);
  const totalTax = Math.floor(income / 9);
  const netProfit = income - totalTax;

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    setPaginatedTransactions(sales.slice(startIndex, endIndex));
  }, [currentPage, sales]);

  useEffect(() => {
    fetch("http://localhost:9000/sales/")
      .then((res) => res.json())
      .then((sales) => {
        setSales(sales);
      });
  }, []);

  const data = [
    { name: "Tax", value: totalTax },
    { name: "Income", value: income },
    { name: "Net Profit", value: netProfit },
  ];
  const COLORS = ["red", "#00C49F", "#FFBB28"];

  const DetailsHandler = (ID) => {
    setDeatilsId(ID);
    setShowDetails(true);
  };
  return (
    <section className="float-right mt-16 pt-4 md:px-6 pl-4 pb-8 bg-white-200 dark:bg-black-600 lg:w-[87%] w-[93%]">
      <div className="mb-4">
        <FinancialInfos tax={totalTax} income={income} netProfit={netProfit} />
      </div>

      <div className="grid grid-cols-12">
        <div className="lg:col-span-8 col-span-10 mt-2 text-center sm:mx-5">
          <p className="md:text-base text-sm font-bold border-b py-2 w-full bg-white-100 dark:text-white-100 dark:bg-black-200 rounded-t-xl 2xl:text-xl">
            Transactions
          </p>
          <div className="sm:px-6 h-[29rem] overflow-y-auto bg-white-100 dark:text-white-100 dark:bg-black-200 rounded-b-xl relative">
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
                        onClick={() => {
                          DetailsHandler(transaction.id);
                          setShowDetails(true);
                        }}
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

        <div className="relative lg:col-span-4 col-span-10 bg-white-100 dark:bg-black-200 rounded-xl mt-2 mx-4">
          <p className="xl:text-lg md:text-base text-lg text-center pt-6 dark:text-white-100">
            Transactions Chart
          </p>
          <PiesChart data={data} COLORS={COLORS} />
        </div>
      </div>
      {/* {showDetails && (
        <FiancialDetails
          sales={sales}
          DetailsId={DetailsId}
          showDetails={showDetails}
          setShowDetails={setShowDetails}
        />
      )} */}
    </section>
  );
};

export default Financial;
