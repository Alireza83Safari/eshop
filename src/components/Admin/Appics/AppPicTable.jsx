import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../getPagination";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { toast } from "react-toastify";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import Spinner from "../../Spinner/Spinner";
import EditAppPic from "./Edit/EditAppPic";

export default function AppPicTable({ appPicData, fetchData, appPicLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditAppPic, setShowEditAppPic] = useState(false);
  const [editAppPicId, setEditAppPicId] = useState(null);
  const [isLoading, setLoading] = useState(false);
  let pageSize = 10;
  const { isLoading: paginationLoading } = usePaginationURL(
    currentPage,
    pageSize
  );

  const pagesCount = Math.ceil(appPicData && appPicData?.length / pageSize);

  const deleteAppPic = async (id) => {
    const response = await adminAxios.post(`/appPic/delete/${id}`);
    setLoading(true);
    try {
      if (response.status === 200) {
        setLoading(false);
        toast.success("delete successfully");
        fetchData();
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <>
      <table
        className={`min-w-full bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-xl md:h-[37rem] h-[34rem] relative ${
          isLoading && "opacity-20"
        }`}
      >
        <thead>
          <tr className="md:text-sm sm:text-xs text-[10px] text-center border-b grid grid-cols-6">
            <th className="py-3">NO</th>
            <th className="py-3">Title</th>
            <th className="py-3">Image</th>
            <th className="py-3">priority</th>
            <th className="py-3">CreatedAt</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        {appPicLoading || paginationLoading || isLoading ? (
          <Spinner />
        ) : (
          <tbody>
            {appPicData?.map((appPic, index) => (
              <tr
                className="md:text-sm sm:text-xs text-[10px] text-center grid grid-cols-6"
                key={appPic.id}
              >
                <td className="py-3">{index + 1}</td>
                <td className="py-3 truncate">{appPic?.title}%</td>
                <td className="py-3 truncate flex justify-center">
                  <img
                    src={`http://127.0.0.1:6060/${appPic?.fileUrl}`}
                    className="w-9 h-9"
                  />
                </td>
                <td className="py-3">{appPic.priority}</td>
                <td className="py-3 truncate">
                  {appPic?.createdAt?.slice(0, 10)}
                </td>
                <td className="py-3 truncate space-x-2">
                  <button
                    onClick={() => {
                      setEditAppPicId(appPic?.id);
                      setShowEditAppPic(true);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-orange-400"
                    />
                  </button>
                  <button
                    className="py-1 rounded-md text-red-700 text-white"
                    onClick={() => {
                      deleteAppPic(appPic?.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}

        <Pagination
          pagesCount={pagesCount}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </table>

      {showEditAppPic && (
        <EditAppPic
          showEditAppPic={showEditAppPic}
          editAppPicId={editAppPicId}
          setShowEditAppPic={setShowEditAppPic}
          fetchData={fetchData}
        />
      )}
    </>
  );
}
