import React, { useState, lazy, Suspense, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../getPagination";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import Spinner from "../../Spinner/Spinner";
import useTableRow from "../../../hooks/useTableRow";
import useAccess from "../../../hooks/useAccess";
import AccessError from "../../AccessError";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
const EditAppPic = lazy(() => import("./Edit/EditAppPic"));

export default function AppPicTable({ appPicData, fetchData, appPicLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditAppPic, setShowEditAppPic] = useState(false);
  const [editAppPicId, setEditAppPicId] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const limit = searchParams.get("limit");
  const pageSize = limit ? +limit : 12;

  const { isLoading: paginationLoading } = usePaginationURL(
    currentPage,
    pageSize
  );

  const pagesCount = useMemo(() => {
    return Math.ceil(appPicData && appPicData?.length / pageSize);
  }, [appPicData, pageSize]);

  const { userHaveAccess: userHaveAccessList } = useAccess(
    "action_app_pic_admin_list"
  );

  const { userHaveAccess: userHaveAccessDelete } = useAccess(
    "action_app_pic_admin_delete"
  );

  const { userHaveAccess: userHaveAccessEdit } = useAccess(
    "action_app_pic_admin_update"
  );

  const deleteAppPic = async (id) => {
    if (userHaveAccessDelete) {
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
    } else {
      toast.error("You Havent Access Delete AppPic");
    }
  };

  const editAppPic = async (id) => {
    if (userHaveAccessEdit) {
      setEditAppPicId(id);
      setShowEditAppPic(true);
    } else {
      toast.error("You Havent Access Edit AppPic");
    }
  };

  const { rowNumber, limit: limitRow } = useTableRow();
  return (
    <>
      {userHaveAccessList ? (
        <div className="2xl:h-[46.2rem] md:h-[37.2rem] h-[34rem] bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-xl">
          <table
            className={` min-w-full relative ${isLoading && "opacity-20"}`}
          >
            <thead>
              <tr className="md:text-sm sm:text-xs text-[10px] text-center border-b grid sm:grid-cols-6 grid-cols-5">
                <th className="py-3 sm:inline hidden">NO</th>
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
                    className="md:text-sm sm:text-xs text-[10px] text-center grid sm:grid-cols-6 grid-cols-5"
                    key={appPic.id}
                  >
                    <td className="py-3 sm:inline hidden">
                      {rowNumber >= limitRow
                        ? rowNumber + index + 1
                        : index + 1}
                    </td>
                    <td className="py-3 truncate">{appPic?.title}%</td>
                    <td className="py-3 truncate flex justify-center">
                      <img src={appPic?.fileUrl} className="w-8 h-8 object-contain" />
                    </td>
                    <td className="py-3">{appPic.priority}</td>
                    <td className="py-3 truncate">
                      {appPic?.createdAt?.slice(0, 10)}
                    </td>
                    <td className="py-3 truncate space-x-2">
                      <button onClick={() => editAppPic(appPic?.id)}>
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

            {pagesCount && (
              <Pagination
                pagesCount={pagesCount}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            )}
          </table>
        </div>
      ) : (
        <AccessError error={"AppPics List"} />
      )}

      <Suspense fallback={<Spinner />}>
        {showEditAppPic && (
          <EditAppPic
            showEditAppPic={showEditAppPic}
            editAppPicId={editAppPicId}
            setShowEditAppPic={setShowEditAppPic}
            fetchData={fetchData}
          />
        )}
      </Suspense>
    </>
  );
}
