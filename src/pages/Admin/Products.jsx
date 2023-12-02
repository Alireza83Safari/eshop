import React, { Suspense, lazy } from "react";
import { ProductsPanelContextProvider } from "../../Context/ProductsPanelContext";
import Spinner from "../../components/Spinner/Spinner";
const ProductsPanel = lazy(() =>
  import("../../components/Admin/Products/ProductsPanel")
);

export default function Products() {
  return (
    <>
      <ProductsPanelContextProvider>
        <Suspense fallback={<Spinner />}>
          <ProductsPanel />
        </Suspense>
      </ProductsPanelContextProvider>
    </>
  );
}
