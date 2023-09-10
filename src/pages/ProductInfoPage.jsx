import React, { Suspense, lazy } from "react";
import Spinner from "../components/Spinner/Spinner";
const ProductInfo = lazy(() => import("../components/ProductInfo/ProductInfo"));
export default function ProductInfoPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProductInfo />
    </Suspense>
  );
}
