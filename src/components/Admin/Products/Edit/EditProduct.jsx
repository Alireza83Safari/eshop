import React, { useContext, useState, lazy, Suspense } from "react";
import ProductsPanelContext from "../../../../Context/ProductsPanelContext";
import ReactDOM from "react-dom";
import Spinner from "../../../Spinner/Spinner";

const EditProductData = lazy(() => import("./EditProductData"));
const EditProductFile = lazy(() => import("./EditProductFile"));

export default function EditProduct() {
  const { showEditModal } = useContext(ProductsPanelContext);
  const [showEditFile, setShowEditFile] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(true);

  return ReactDOM.createPortal(
    <section
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showEditModal ? "visible" : "invisible"
      }`}
    >
      <div className="lg:w-[30rem] min-h-[32rem] bg-white-100 dark:bg-black-200 rounded-xl relative">
        <Suspense fallback={<Spinner />}>
          {showEditProduct && (
            <EditProductData
              setShowEditProduct={setShowEditProduct}
              setShowEditFile={setShowEditFile}
            />
          )}
        </Suspense>

        <Suspense fallback={<Spinner />}>
          {showEditFile && (
            <EditProductFile setShowEditFile={setShowEditFile} />
          )}
        </Suspense>
      </div>
    </section>,
    document.getElementById("portal")
  );
}
