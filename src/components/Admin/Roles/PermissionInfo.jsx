import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactDOM from "react-dom";
export default function PermissionInfo({
  setShowPermissionInfo,
  permissionInfo,
}) {
  return ReactDOM.createPortal(
    <div className="fixed bg-gray-100 z-10 w-full min-h-screen flex items-center justify-center transition duration-400">
      <div className="bg-white-100 w-1/3 overflow-scroll p-3 h-[30rem] relative">
        <button
          className="absolute top-2 right-2 text-red-700"
          onClick={() => setShowPermissionInfo(false)}
        >
          <FontAwesomeIcon icon={faX} className="text-lg" />
        </button>

        {permissionInfo?.map((data, index) => (
          <div className="flex text-sm" key={index}>
            <p className="mr-2">{index + 1} </p>
            <p>{data}</p>
          </div>
        ))}
      </div>
    </div>,
    document.getElementById("portal")
  );
}
