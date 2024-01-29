import React, { Suspense, lazy } from "react";
import { AddressContextProvider } from "../context/AddressContext";
import { Spinner, Header, Footer } from "../components";
const AddNewAddress = lazy(() => import("../components/Address/AddNewAddress"));
const EditAddress = lazy(() => import("../components/Address/EditAddress"));
const AllAddress = lazy(() => import("../components/Address/AllAddress"));
const Shippings = lazy(() => import("../components/Shipping"));

export default function Shipping() {
  return (
    <>
      <Header />
      <AddressContextProvider>
        <section className="min-h-screen lg:grid grid-cols-12 lg:container m-auto xl:px-8 sm:px-5 px-2 sm:mt-28 mt-24">
          <Suspense fallback={<Spinner />}>
            <Shippings />
          </Suspense>
        </section>

        <Suspense fallback={<Spinner />}>
          <AllAddress />
        </Suspense>

        <Suspense fallback={<Spinner />}>
          <AddNewAddress />
        </Suspense>

        <Suspense fallback={<Spinner />}>
          <EditAddress />
        </Suspense>
      </AddressContextProvider>
      <Footer />
    </>
  );
}
