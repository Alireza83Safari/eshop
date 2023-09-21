import React, { useContext, useState, lazy, Suspense } from "react";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";
import ReactDOM from "react-dom";

const AddNewProduct = lazy(() => import("./AddNewProduct"));
const AddProductItem = lazy(() => import("./AddProductItem"));
const AddProductFeature = lazy(() => import("./AddProductFeature"));
const AddProductFile = lazy(() => import("./AddProductFile"));

export default function AddProduct() {
  const { showAddProductModal } = useContext(ProductsPanelContext);
  const [showFile, setShowFile] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(true);
  const [showProductItem, setShowProductItem] = useState(false);
  const [showProductFeature, setShowProductFeature] = useState(false);

  return ReactDOM.createPortal(
    <section
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showAddProductModal ? "visible" : "invisible"
      }`}
    >
      <div className="lg:w-[30rem] bg-white-100 dark:bg-black-200  p-5 rounded-xl relative">
        <Suspense fallback={<div>Loading...</div>}>
          {showAddProduct && (
            <AddNewProduct
              setShowAddProduct={setShowAddProduct}
              setShowProductItem={setShowProductItem}
            />
          )}

          {showProductItem && (
            <AddProductItem
              setShowProductFeature={setShowProductFeature}
              setShowProductItem={setShowProductItem}
            />
          )}
          {showProductFeature && (
            <AddProductFeature
              setShowProductFeature={setShowProductFeature}
              setShowFile={setShowFile}
            />
          )}
          {showFile && <AddProductFile setShowFile={setShowFile} />}
        </Suspense>
      </div>
    </section>,
    document.getElementById("portal")
  );
}
