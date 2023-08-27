import React, { useEffect, useState, lazy, Suspense } from "react";
import Spinner from "../../components/Spinner/Spinner";
import useFetch from "../../hooks/useFetch";
import instance from "../../api/userInterceptors";

const PiesChart = lazy(() => import("../../components/Admin/Charts/PieChart"));
const OrderTable = lazy(() =>
  import("../../components/Admin/Orders/OrderTable")
);
const OrderInfos = lazy(() =>
  import("../../components/Admin/Orders/OrderInfos")
);

export default function Orders() {
  const [sales, setSales] = useState([]);

  const income = sales?.reduce((total, sale) => total + sale?.price, 0);
  const totalTax = Math.floor(income / 9);
  const netProfit = income - totalTax;

  const fetchOrders = async () => {
    try {
      const response = await instance.get("/api/v1/admin/order");
      setSales(response.data.data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const data = [
    { name: "Tax", value: totalTax },
    { name: "Income", value: income },
    { name: "Net Profit", value: netProfit },
  ];
  const COLORS = ["red", "#00C49F", "#FFBB28"];

  return (
    <section className="float-right mt-12 md:px-6 px-2 pb-8 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
      <div className="mb-4">
        <Suspense fallback={<Spinner />}>
          <OrderInfos tax={totalTax} income={income} netProfit={netProfit} />
        </Suspense>
      </div>

      <div className="grid grid-cols-12">
        <Suspense fallback={<Spinner />}>
          <OrderTable />
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
