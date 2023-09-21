import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import AddAppPicData from "./AddAppPicData";
import AddAppPicFile from "./AddAppicFile";

export default function AddAppPic({ fetchData }) {
  const [addAppPicId, setAddAppPicId] = useState(null);
  const [showAddAppPic, setShowAddAppPic] = useState(true);
  const [showAddAppPicFile, setShowAddAppPicFile] = useState(false);

  return (
    <>
      <div className="bg-white-100 p-3 rounded-xl dark:bg-black-200 dark:text-white-100 h-[27rem] lg:my-5 sm:my-5 lg:mb-0 mb-5 sm:col-span-2 col-span-3">
        {showAddAppPic && (
          <AddAppPicData
            setShowAddAppPicFile={setShowAddAppPicFile}
            setAddAppPicId={setAddAppPicId}
            setShowAddAppPic={setShowAddAppPic}
          />
        )}

        {showAddAppPicFile && (
          <AddAppPicFile
            addAppPicId={addAppPicId}
            setShowAddAppPicFile={setShowAddAppPicFile}
            setShowAddAppPic={setShowAddAppPic}
            fetchData={fetchData}
          />
        )}
      </div>

      <ToastContainer />
    </>
  );
}