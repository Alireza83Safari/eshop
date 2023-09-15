import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../Paganation";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { ToastContainer, toast } from "react-toastify";
import EditCategory from "./EditCategory";

export default function CategoryTable({ fetchCategory, category }) {
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditCategory, setShowEditCategory] = useState(false);
  const [categoryEditId, setCategoryEditId] = useState(null);
  const [isLoading, setLoading] = useState(false);

  let pageSize = 10;
  useEffect(() => {
    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    setPaginatedProducts(category?.slice(startIndex, endIndex));
  }, [currentPage, category]);

  const totalPage = Math.ceil(category?.length / pageSize);
  const pageNumber = Array.from(Array(totalPage).keys());

  const deleteCategory = async (id) => {
    const response = await adminAxios.post(`/category/delete/${id}`);
    setLoading(true);
    try {
      if (response.status === 200) {
        setLoading(false);
        toast.success("delete succefuly");
        fetchCategory();
      }
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <>
      <table
        className={` min-w-full bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-xl h-[37rem] relative ${
          isLoading && "opacity-20"
        }`}
      >
        <thead>
          <tr className="md:text-sm sm:text-xs text-[10px] text-center border-b grid grid-cols-5">
            <th className="py-3">NO</th>
            <th className="py-3">Category</th>
            <th className="py-3">Code</th>
            <th className="py-3">CreateAt</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedProducts?.map((category, index) => (
            <tr
              className="md:text-sm sm:text-xs text-[10px] text-center grid grid-cols-5"
              key={index}
            >
              <td className="py-3">{index + 1}</td>
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
                  <FontAwesomeIcon icon={faEdit} className="text-orange-400" />
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
        <div className=" relative">
          <Pagination
            pageNumber={pageNumber}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </table>
      <EditCategory
        categoryEditId={categoryEditId}
        showEditCategory={showEditCategory}
        setShowEditCategory={setShowEditCategory}
        fetchCategory={fetchCategory}
      />

      <ToastContainer />
    </>
  );
}
