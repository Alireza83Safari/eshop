import React, { Suspense, lazy, useState } from "react";
import ReactDOM from "react-dom";
import Spinner from "../../../Spinner/Spinner";
const EditBrandData = lazy(() => import("./EditBrandData"));
const EditBrandFile = lazy(() => import("./EditBrandFile"));
export default function EditBrand({
  showEditBrand,
  setShowEditBrand,
  brandEditId,
  fetchData,
}) {
  const [showEditBrandData, setShowEditBrandData] = useState(true);
  const [showEditBrandFile, setShowEditBrandFile] = useState(false);

  return ReactDOM.createPortal(
    <div
      className={`fixed top-1/2 left-1/2 transform px-5 -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showEditBrand ? "visible" : "invisible"
      }`}
    >
      <div className="lg:w-[27rem] bg-white-100 dark:bg-black-200 p-5 rounded-xl">
        <Suspense fallback={<Spinner />}>
          {showEditBrandData && (
            <EditBrandData
              brandEditId={brandEditId}
              setShowEditBrandData={setShowEditBrandData}
              fetchData={fetchData}
              setShowEditBrandFile={setShowEditBrandFile}
              setShowEditBrand={setShowEditBrand}
            />
          )}
        </Suspense>

        <Suspense fallback={<Spinner />}>
          {showEditBrandFile && (
            <EditBrandFile
              brandEditId={brandEditId}
              setShowEditBrandFile={setShowEditBrandFile}
              fetchData={fetchData}
              setShowEditBrand={setShowEditBrand}
            />
          )}
        </Suspense>
      </div>
    </div>,
    document.getElementById("portal")
  );
}
