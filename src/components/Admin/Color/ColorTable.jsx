import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../getPagination";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { ToastContainer, toast } from "react-toastify";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import Spinner from "../../Spinner/Spinner";
import EditColor from "./EditColor";
import useTableRow from "../../../hooks/useTableRow";

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

  let pageSize = 9;
  const pagesCount = Math.ceil(total / pageSize);
  const { isLoading: pageLoading } = usePaginationURL(currentPage, pageSize);

  const deleteColor = async (id) => {
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
  };
  const { rowNumber, limit } = useTableRow();
  return (
    <>
      <table className="min-w-full bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-xl h-[37rem] relative">
        <thead>
          <tr className="md:text-sm sm:text-xs text-[10px] text-center border-b grid grid-cols-6">
            <th className="py-3">NO</th>
            <th className="py-3">Color</th>
            <th className="py-3">Code</th>
            <th className="py-3">colorHex</th>
            <th className="py-3">CreatedAt</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        {pageLoading || isLoading || paginationLodaing ? (
          <Spinner />
        ) : (
          <tbody>
            {paginations?.map((color, index) => (
              <tr
                className="md:text-sm sm:text-xs text-[10px] text-center grid grid-cols-6"
                key={color + 1}
              >
                <td className="py-3">
                  {" "}
                  {rowNumber >= limit ? rowNumber + index + 1 : index + 1}
                </td>
                <td className="py-3 truncate">{color?.name}</td>
                <td className="py-3 truncate">{color?.code}</td>
                <td className="py-3 flex justify-center">{color?.colorHex}</td>
                <td className="py-3 truncate">
                  {color?.createdAt?.slice(0, 10)}
                </td>
                <td className="py-3 truncate space-x-2">
                  <button
                    onClick={() => {
                      setShowEditColor(true);
                      setColorEditId(color);
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
                      deleteColor(color?.id);
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

      {showEditColor && (
        <EditColor
          colorEditId={colorEditId}
          setShowEditColor={setShowEditColor}
          fetchData={fetchData}
        />
      )}

      <ToastContainer />
    </>
  );
}
