import React, { lazy, Suspense } from "react";
import Spinner from "../../components/Spinner/Spinner";
import adminAxios from "../../services/Axios/adminInterceptors";
import useFetch from "../../hooks/useFetch";
import { ToastContainer } from "react-toastify";

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
    <section className="float-right md:mt-16 mt-12 pb-10 pt-4 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%]">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-7 py-3 mx-7 rounded-xl mt-4 md:ml-7 ml-3 relative">
        <Suspense fallback={<Spinner />}>
          <Topbar orders={orders} />
        </Suspense>
      </div>

      <div className="grid grid-cols-12 dark:bg-black-600">
        <div className="grid grid-rows-2 md:col-span-8 col-span-12">
          <Suspense fallback={<Spinner />}>
            <DashboardChart />
            <Transactions orders={orders} />
          </Suspense>
        </div>
        <div className="grid grid-rows-2 md:col-span-4 col-span-12 relative">
          <Suspense fallback={<Spinner />}>
            <TopSale />
            <TopDiscount />
          </Suspense>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Dashboard;
