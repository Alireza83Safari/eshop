import React, { useEffect, useState, lazy, Suspense } from "react";
import Spinner from "../../components/Spinner/Spinner";

const PiesChart = lazy(() => import("../../components/Admin/Charts/PieChart"));
const FiancialTable = lazy(() =>
  import("../../components/Admin/FiancialTable")
);
const FinancialInfos = lazy(() =>
  import("../../components/Admin/FinancialInfos")
);

export default function Fiancaial() {
  const [sales, setSales] = useState([]);

  const income = sales.reduce((total, sale) => total + sale.amount, 0);
  const totalTax = Math.floor(income / 9);
  const netProfit = income - totalTax;

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

  return (
    <section className="float-right mt-12 md:px-6 px-2 pb-8 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%]">
      <div className="mb-4">
        <Suspense fallback={<Spinner />}>
          <FinancialInfos
            tax={totalTax}
            income={income}
            netProfit={netProfit}
          />
        </Suspense>
      </div>

      <div className="grid grid-cols-12">
        <Suspense fallback={<Spinner />}>
          <FiancialTable />
        </Suspense>

        <div className="relative lg:col-span-4 col-span-12 bg-white-100 dark:bg-black-200 rounded-xl mt-2 md:mx-5 mx-2">
          <p className="xl:text-lg md:text-base text-lg text-center pt-6 dark:text-white-100">
            Transactions Chart
          </p>
          <Suspense fallback={<Spinner />}>
            <PiesChart data={data} COLORS={COLORS} sales={sales} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
