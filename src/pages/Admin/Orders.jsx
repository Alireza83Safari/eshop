import React, { useEffect, useState, lazy, Suspense } from "react";
import Spinner from "../../components/Spinner/Spinner";
import adminAxios from "../../services/Axios/adminInterceptors";
import { useFetchPagination } from "../../hooks/useFetchPagination";
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
//
  let url = "/order";

  const {
    paginations,
    total,
    isLoading: paginationLodaing,
  } = useFetchPagination(url, adminAxios);

  //

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await adminAxios.get("/order");
        setSales(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrders();
  }, []);

  const data = [
    { name: "Tax", value: totalTax },
    { name: "Income", value: income },
    { name: "Net Profit", value: netProfit },
  ];
  const COLORS = ["red", "#00C49F", "#FFBB28"];

  return (
    <section className="float-right mt-16 md:px-6 px-2 pb-8 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
      <div className="mb-4">
        <Suspense fallback={<Spinner />}>
          <OrderInfos tax={totalTax} income={income} netProfit={netProfit} />
        </Suspense>
      </div>

      <div className="grid grid-cols-12">
        <Suspense fallback={<Spinner />}>
          <OrderTable paginations={paginations} total={total} paginationLodaing={paginationLodaing}/>
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
