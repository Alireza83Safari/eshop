import React, { Suspense, lazy } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { AddressContextProvider } from "../Context/AddressContext";
import Spinner from "../components/Spinner/Spinner";
const AddNewAddress = lazy(() => import("../components/Address/AddNewAddress"));
const EditAddress = lazy(() => import("../components/Address/EditAddress"));
const AllAddress = lazy(() => import("../components/Address/AllAddress"));
const Shipping = lazy(() => import("../components/Shipping"));

export default function ShippingPage() {
  return (
    <>
      <Header />
      <AddressContextProvider>
        <section className="min-h-screen lg:grid grid-cols-12 lg:container m-auto lg:px-20 mt-28">
          <Suspense fallback={<Spinner />}>
            <Shipping />
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
