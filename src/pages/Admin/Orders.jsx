import React, { useState, lazy, Suspense } from "react";
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
  let url = "/order";

  const {
    paginations,
    total,
    isLoading: paginationLodaing,
  } = useFetchPagination(url, adminAxios);

  return (
    <Suspense fallback={<Spinner />}>
      <section className="float-right mt-16 md:px-4 px-2 pb-8 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
        <div className="mb-4">
          <OrderInfos />
        </div>

        <div className="grid grid-cols-12">
          <OrderTable
            paginations={paginations}
            total={total}
            paginationLodaing={paginationLodaing}
          />

          <div className="relative lg:col-span-4 col-span-12 bg-white-100 dark:bg-black-200 rounded-xl mt-2 md:mx-5 mx-2">
            <p className="xl:text-lg md:text-base text-lg text-center pt-6 dark:text-white-100">
              Transactions Chart
            </p>
            <PiesChart />
          </div>
        </div>
      </section>
    </Suspense>
  );
}
