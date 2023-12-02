import React, { lazy, Suspense } from "react";
import Spinner from "../../components/Spinner/Spinner";
import adminAxios from "../../services/Axios/adminInterceptors";
import useFetch from "../../hooks/useFetch";
import { Toaster } from "react-hot-toast";

const DashboardChart = lazy(() =>
  import("../../components/Admin/Dashboard/DashboardChart")
);
const Topbar = lazy(() => import("../../components/Admin/Dashboard/Topbar"));
const TopDiscount = lazy(() =>
  import("../../components/Admin/Dashboard/TopDiscount")
);
const Transactions = lazy(() =>
  import("../../components/Admin/Dashboard/Transactions")
);
const TopSale = lazy(() => import("../../components/Admin/Dashboard/TopSale"));

const Dashboard = () => {
  const { datas: orders } = useFetch("/order", adminAxios);
  return (
    <section className="float-right md:mt-12 mt-12 pb-10 pt-4 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] md:w-[95%] sm:w-[94%] w-[91%]">
      <Suspense fallback={<Spinner />}>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:gap-7 md:gap-4 gap-4 py-3 md:mx-7 mx-3 rounded-xl mt-4 md:ml-7 ml-3 relative">
          <Topbar orders={orders} />
        </div>

        <div className="grid grid-cols-12 dark:bg-black-600">
          <div className="grid grid-rows-2 md:col-span-8 col-span-12">
            <DashboardChart />
            <Transactions orders={orders} />
          </div>
          <div className="grid grid-rows-2 md:col-span-4 col-span-12 relative">
            <TopSale />
            <TopDiscount />
          </div>
        </div>
        <Toaster />
      </Suspense>
    </section>
  );
};

export default Dashboard;
