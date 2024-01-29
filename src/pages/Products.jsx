import React, { lazy, Suspense } from "react";
import { Header, Footer, Spinner } from "../components";
const Product = lazy(() => import("../components/Products/Products"));

export default function Products() {
  return (
    <>
      <Header />
      <section className="mx-auto py-4 dark:bg-black-200 xl:container min-h-screen mt-24 relative">
        <Suspense fallback={<Spinner />}>
          <Product />
        </Suspense>
      </section>
      <Footer />
    </>
  );
}
