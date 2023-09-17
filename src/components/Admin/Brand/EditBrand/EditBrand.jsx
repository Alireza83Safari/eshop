import React, { useState } from "react";
import ReactDOM from "react-dom";
import EditBrandFile from "./EditBrandFile";
import EditBrandData from "./EditBrandData";

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
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 ${
        showEditBrand ? "visible" : "invisible"
      }`}
    >
      {showEditBrandData && (
        <EditBrandData
          brandEditId={brandEditId}
          setShowEditBrandData={setShowEditBrandData}
          fetchData={fetchData}
          setShowEditBrandFile={setShowEditBrandFile}
        />
      )}

      {showEditBrandFile && (
        <EditBrandFile
          brandEditId={brandEditId}
          setShowEditBrandFile={setShowEditBrandFile}
          fetchData={fetchData}
          setShowEditBrand={setShowEditBrand}
        />
      )}
    </div>,
    document.getElementById("portal")
  );
}
