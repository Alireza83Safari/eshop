import React, { lazy, Suspense } from "react";
import Spinner from "../components/Spinner/Spinner";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar/Sidebar";
import { Toaster } from "react-hot-toast";
const Product = lazy(() => import("../components/Product/Product"));

export default function ProductPage() {
  return (
    <>
      <Header />
      <Sidebar />
      <section className="mx-auto py-4 dark:bg-black-200 xl:container min-h-screen mt-24 relative">
        <Suspense fallback={<Spinner />}>
          <Product />
        </Suspense>
        <Toaster />
      </section>
      <Footer />
    </>
  );
}
