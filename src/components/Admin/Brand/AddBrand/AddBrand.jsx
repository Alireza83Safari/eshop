import React, { useState, lazy, Suspense } from "react";
import Spinner from "../../../Spinner/Spinner";
import { Toaster } from "react-hot-toast";
const AddBrandData = lazy(() => import("./AddBrandData"));
const AddBrandFile = lazy(() => import("./AddBrandFile"));

export default function AddBrand({ fetchData }) {
  const [addBrandId, setAddBrandId] = useState(null);
  const [showAddBrand, setShowAddBrand] = useState(true);
  const [showAddBrandFile, setShowAddBrandFile] = useState(false);

  return (
    <>
      <div className="bg-white-100 md:py-5 py-2 px-2 rounded-xl dark:bg-black-200 2xl:h-[33rem] h-[24.6rem] dark:text-white-100 min-w-full">
        <Suspense fallback={<Spinner />}>
          {showAddBrand && (
            <AddBrandData
              setShowAddBrandFile={setShowAddBrandFile}
              setAddBrandId={setAddBrandId}
              setShowAddBrand={setShowAddBrand}
            />
          )}

          {showAddBrandFile && (
            <AddBrandFile
              addBrandId={addBrandId}
              setShowAddBrandFile={setShowAddBrandFile}
              setShowAddBrand={setShowAddBrand}
              fetchData={fetchData}
            />
          )}
        </Suspense>
      </div>

      <Toaster />
    </>
  );
}
