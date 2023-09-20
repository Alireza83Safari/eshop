import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../getPagination";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { ToastContainer, toast } from "react-toastify";
import EditCategory from "./EditCategory";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import Spinner from "../../Spinner/Spinner";
import useTableRow from "../../../hooks/useTableRow";

export default function CategoryTable({
  fetchData,
  paginations,
  total,
  paginationLodaing,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [categoryEditId, setCategoryEditId] = useState(null);
  const [isLoading, setLoading] = useState(false);

  let pageSize = 10;

  const { isLoading: pageLoading } = usePaginationURL(currentPage, pageSize);

  const pageNumber = Math.ceil(total / pageSize);

  const deleteCategory = async (id) => {
    const response = await adminAxios.post(`/category/delete/${id}`);
    setLoading(true);
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
          <tr className="md:text-sm sm:text-xs text-[10px] text-center border-b grid grid-cols-5">
            <th className="py-3">NO</th>
            <th className="py-3">Category</th>
            <th className="py-3">Code</th>
            <th className="py-3">CreateAt</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        {paginationLodaing || isLoading || pageLoading ? (
          <Spinner />
        ) : (
          <tbody>
            {paginations?.map((category, index) => (
              <tr
                className="md:text-sm sm:text-xs text-[10px] text-center grid grid-cols-5"
                key={category.id}
              >
                <td className="py-3">
                  {" "}
                  {rowNumber >= limit ? rowNumber + index + 1 : index + 1}
                </td>
                <td className="py-3 truncate">{category?.name}</td>

                <td className="py-3 truncate">{category?.code}</td>
                <td className="py-3 truncate">
                  {category?.createdAt?.slice(0, 10)}
                </td>
                <td className="py-3 truncate space-x-2">
                  <button
                    onClick={() => {
                      setShowEditCategory(true);
                      setCategoryEditId(category?.id);
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
                      deleteCategory(category?.id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <Pagination
        pageNumber={pageNumber}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />

      <EditCategory
        categoryEditId={categoryEditId}
        showEditCategory={showEditCategory}
        setShowEditCategory={setShowEditCategory}
        fetchData={fetchData}
      />

      <ToastContainer />
    </>
  );
}
