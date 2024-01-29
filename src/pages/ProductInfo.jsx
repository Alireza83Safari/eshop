import React, { Suspense, lazy } from "react";
import { Footer, Header, Spinner } from "../components";

const ProductsInfoComponents = lazy(() =>
  import("../components/ProductInfo/ProductInfo")
);

export default function ProductInfo() {
  return (
    <>
      <Header />

      <Suspense fallback={<Spinner />}>
        <ProductsInfoComponents />
      </Suspense>

      <Footer />
    </>
  );
}
