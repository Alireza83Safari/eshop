import React, { useState } from "react";
import ReactDOM from "react-dom";
import EditAppPicData from "./EditAppPicData";
import EditAppPicFile from "./EditAppPicFile";

export default function EditAppPic({
  setShowEditAppPic,
  editAppPicId,
  fetchData,
}) {
  const [showEditAppPicData, setShowEditAppPicData] = useState(true);
  const [showEditAppPicFile, setShowEditAppPicFile] = useState(false);

  return ReactDOM.createPortal(
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400">
      <div className="lg:w-[30rem] bg-white-100 dark:bg-black-200 p-5 rounded-xl">
        {showEditAppPicData && (
          <EditAppPicData
            editAppPicId={editAppPicId}
            setShowEditAppPicData={setShowEditAppPicData}
            fetchData={fetchData}
            setShowEditAppPicFile={setShowEditAppPicFile}
            setShowEditAppPic={setShowEditAppPic}
          />
        )}

        {showEditAppPicFile && (
          <EditAppPicFile
            editAppPicId={editAppPicId}
            setShowEditAppPicFile={setShowEditAppPicFile}
            fetchData={fetchData}
            setShowEditAppPic={setShowEditAppPic}
          />
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
