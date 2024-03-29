import React, { Suspense, lazy } from "react";
import useFetch from "../hooks/useFetch";
import userAxios from "./../services/Axios/userInterceptors";
import { Header, Footer, Spinner } from "../components";

const CheckoutProducts = lazy(() =>
  import("../components/Checkout/CheckoutProducts")
);
const CheckoutDetails = lazy(() =>
  import("../components/Checkout/CheckoutDetails")
);

export default function Orders() {
  const { datas: orders, fetchData } = useFetch("/order", userAxios);

  return (
    <>
      <Header />
      <section className="bg-white-100 dark:bg-black-200 text-black-900 mb-8 z-10 dark:text-white-100 mt-24">
        <div className="flex justify-center">
          <div className="relative max-h-[40rem] overflow-x-auto">
            <Suspense fallback={<Spinner />}>
              <CheckoutProducts orders={orders} fetchData={fetchData} />
            </Suspense>
          </div>
          <Suspense fallback={<Spinner />}>
            <CheckoutDetails orders={orders} />
          </Suspense>
        </div>
      </section>

      <Footer />
    </>
  );
}
