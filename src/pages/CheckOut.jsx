import React, { Suspense, lazy } from "react";
import { Header, Footer, Spinner } from "../components";
import useOrderItems from "../api/order/user/useOrderItems";

const CheckoutProducts = lazy(() =>
  import("../components/Checkout/CheckoutProducts")
);
const CheckoutDetails = lazy(() =>
  import("../components/Checkout/CheckoutDetails")
);

export default function Orders() {
  const { orderItems } = useOrderItems();
  return (
    <>
      <Header />
      <section className="bg-white-100 dark:bg-black-200 text-black-900 mb-8 z-10 dark:text-white-100 mt-24">
        <div className="flex justify-center">
          <div className="relative max-h-[40rem] overflow-x-auto">
            <Suspense fallback={<Spinner />}>
              <CheckoutProducts orderItems={orderItems} />
            </Suspense>
          </div>
          <Suspense fallback={<Spinner />}>
            <CheckoutDetails orders={orderItems} />
          </Suspense>
        </div>
      </section>

      <Footer />
    </>
  );
}
