import React, { Suspense, lazy } from "react";
import { DiscountContextProvider } from "../../Context/discountContext";
import Spinner from "../../components/Spinner/Spinner";
import { Toaster } from "react-hot-toast";
const TotalDiscount = lazy(() =>
  import("../../components/Admin/Discount/TotalDiscount")
);
const DiscountTable = lazy(() =>
  import("../../components/Admin/Discount/DiscountTable")
);
const AddDiscount = lazy(() =>
  import("../../components/Admin/Discount/Add/AddDiscount")
);

export default function Discount() {
  return (
    <DiscountContextProvider>
      <section className="sm:p-6 p-3 float-right mt-16 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
        <div className="grid lg:grid-cols-12">
          <div className="lg:col-span-8 col-span-12 lg:mr-6 lg:order-1 order-2 bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-xl relative">
            <Suspense fallback={<Spinner />}>
              <DiscountTable />
            </Suspense>
          </div>
          <div className="lg:col-span-4 col-span-12 lg:gap-x-12 gap-x-6 gap-y-6 lg:order-2 order-1">
            <Suspense fallback={<Spinner />}>
              <TotalDiscount />
            </Suspense>
            <Suspense fallback={<Spinner />}>
              <AddDiscount />
            </Suspense>
          </div>
        </div>
        <Toaster />
      </section>
    </DiscountContextProvider>
  );
}
