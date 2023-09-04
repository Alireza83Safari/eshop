import React from "react";
import useFetch from "../../../hooks/useFetch";
import userAxios from "../../../services/Axios/userInterceptors";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import adminAxios from "../../../services/Axios/adminInterceptors";

export default function AppPicTable({
  setShowAddAppPic,
  setShowEditAppPic,
  setEditAppPicId,
}) {
  const { datas: appics, fetchData } = useFetch("/appPic", userAxios);
  const deleteAppic = async (id) => {
    try {
      const response = await adminAxios.post(`/appPic/delete/${id}`);
      if (response.status === 200) {
        fetchData();
      }
    } catch (error) {}
  };
  return (
    <div className="bg-white-100 dark:bg-black-600 p-3 mt-20 rounded-xl text-black-900 dark:text-white-100">
      <button
        className="bg-blue-600 text-white-100 p-2 md:text-sm text-xs rounded-lg my-2 md:ml-12"
        onClick={() => setShowAddAppPic(true)}
      >
        Add New Appics <FontAwesomeIcon icon={faPlus} />
      </button>
      <table className="min-w-full">
        <thead>
          <tr className="md:text-sm sm:text-xs text-[10px] text-center border-b grid sm:grid-cols-7 grid-cols-5 overflow-auto">
            <th className="py-3 sm:inline hidden">NO</th>
            <th className="py-3">title</th>
            <th className="py-3 sm:inline hidden">createdAt</th>
            <th className="py-3">url</th>
            <th className="py-3">description</th>
            <th className="py-3">image</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {appics?.map((appPic, index) => (
            <tr
              className="md:text-sm sm:text-xs text-[10px] text-center grid sm:grid-cols-7 grid-cols-5 overflow-auto"
              key={index}
            >
              <td className="py-2 sm:inline hidden">{index + 1}</td>
              <td className="py-2 truncate">{appPic.title}</td>
              <td className="py-2">{appPic.createdAt.slice(0, 10)}</td>
              <td className="py-2">{appPic?.url}</td>
              <td className="py-2 truncate sm:inline hidden">
                {appPic?.description}
              </td>
              <td className="py-2 flex justify-center">
                <img
                  src={`http://127.0.0.1:6060/${appPic?.fileUrl}`}
                  className="w-10 h-10"
                />
              </td>
              <td className="py-2 md:space-x-2">
                <button>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-orange-400"
                    onClick={() => {
                      setShowEditAppPic(true);
                      setEditAppPicId(appPic.id);
                    }}
                  />
                </button>
                <button
                  className="px-2 py-1 rounded-md text-red-700 text-white"
                  onClick={() => deleteAppic(appPic.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
