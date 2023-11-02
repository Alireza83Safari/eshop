import React, { useState, Suspense } from "react";
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
const EditColor = React.lazy(() => import("./EditColor"));

export default function ColorTable({
  paginations,
  total,
  paginationLodaing,
  fetchData,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditColor, setShowEditColor] = useState(false);
  const [colorEditId, setColorEditId] = useState(null);
  const [isLoading, setLoading] = useState(false);

  let pageSize = 10;
  const pagesCount = Math.ceil(total / pageSize);
  const { isLoading: pageLoading } = usePaginationURL(currentPage, pageSize);

  const { userHaveAccess: userHaveAccessList } = useAccess(
    "action_color_admin_list"
  );
  const { userHaveAccess: userHaveAccessDelete } = useAccess(
    "action_color_admin_delete"
  );
  const { userHaveAccess: userHaveAccessEdit } = useAccess(
    "action_color_admin_update"
  );

  const deleteColor = async (id) => {
    if (userHaveAccessDelete) {
      setLoading(true);
      const response = await adminAxios.post(`/color/delete/${id}`);
      try {
        if (response.status === 200) {
          setLoading(false);
          toast.success("delete succefuly");
          fetchData();
        }
      } catch (error) {
        setLoading(false);
      }
    } else {
      toast.error("You Havent Access Delete Color");
    }
  };

  const editColor = async (color) => {
    if (userHaveAccessEdit) {
      setShowEditColor(true);
      setColorEditId(color);
    } else {
      toast.error("You Havent Access Edit Color");
    }
  };

  const { rowNumber, limit } = useTableRow();
  return (
    <>
      {userHaveAccessList ? (
        <table className="min-w-full dark:text-white-100 rounded-xl 2xl:h-[46.2rem] md:h-[38rem] h-[34rem] relative">
          <thead>
            <tr className="md:text-sm sm:text-xs text-[10px] text-center border-b grid sm:grid-cols-6 grid-cols-5">
              <th className="2xl:py-4 py-3 sm:inline hidden">NO</th>
              <th className="2xl:py-4 py-3">Color</th>
              <th className="2xl:py-4 py-3">Code</th>
              <th className="2xl:py-4 py-3">colorHex</th>
              <th className="2xl:py-4 py-3">CreatedAt</th>
              <th className="2xl:py-4 py-3">Actions</th>
            </tr>
          </thead>
          {isLoading || pageLoading || paginationLodaing ? (
            <Spinner />
          ) : (
            <tbody>
              {paginations?.length >= 1 ? (
                paginations?.map((color, index) => (
                  <tr
                    className="2xl:text-base md:text-sm sm:text-xs text-[10px] text-center grid sm:grid-cols-6 grid-cols-5"
                    key={color.id}
                  >
                    <td className="2xl:py-4 py-3 sm:inline hidden">
                      {rowNumber >= limit ? rowNumber + index + 1 : index + 1}
                    </td>
                    <td className="2xl:py-4 py-3 truncate">{color?.name}</td>
                    <td className="2xl:py-4 py-3 truncate">{color?.code}</td>
                    <td className="2xl:py-4 py-3">{color?.colorHex}</td>
                    <td className="2xl:py-4 py-3 truncate">
                      {color?.createdAt?.slice(0, 10)}
                    </td>
                    <td className="2xl:py-4 py-3 truncate space-x-2">
                      <button onClick={() => editColor(color)}>
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-orange-400"
                        />
                      </button>
                      <button
                        className="py-1 rounded-md text-red-700 text-white"
                        onClick={() => {
                          deleteColor(color?.id);
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : paginations.length !== 0 ? (
                <div className="flex justify-center items-center mt-32">
                  <div>
                    <img src="/images/not-found-product.svg" alt="" />
                    <p className="text-center mt-8 text-lg font-bold dark:text-white-100">
                      Color Not Found
                    </p>
                  </div>
                </div>
              ) : null}
            </tbody>
          )}

          <Pagination
            pagesCount={pagesCount}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </table>
      ) : (
        <AccessError error={"Colors List"} />
      )}

      <Suspense fallback={<Spinner />}>
        {showEditColor && (
          <EditColor
            colorEditId={colorEditId}
            setShowEditColor={setShowEditColor}
            fetchData={fetchData}
          />
        )}
      </Suspense>
    </>
  );
}
