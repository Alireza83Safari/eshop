import React from "react";
import ProductsPanel from "../../components/Admin/Products/ProductsPanel";
import { ProductsPanelContextProvider } from "../../Context/ProductsPanelContext";

export default function Products() {
  return (
    <>
      <ProductsPanelContextProvider>
        <ProductsPanel />
      </ProductsPanelContextProvider>
    </>
  );
}
