import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import AddBrandData from "./AddBrandData";
import AddBrandFile from "./AddBrandFile";

export default function AddBrand({ fetchBrand }) {
  const [addBrandId, setAddBrandId] = useState(null);
  const [showAddBrand, setShowAddBrand] = useState(true);
  const [showAddBrandFile, setShowAddBrandFile] = useState(false);

  return (
    <>
      <div className="bg-white-100 p-5 rounded-xl dark:bg-black-200 dark:text-white-100 row-span-2 min-w-full">
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
            fetchBrand={fetchBrand}
          />
        )}
      </div>

      <ToastContainer />
    </>
  );
}
