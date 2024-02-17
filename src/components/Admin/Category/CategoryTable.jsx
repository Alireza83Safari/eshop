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
const EditCategory = lazy(() => import("./EditCategory"));

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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const limit = searchParams.get("limit");
  const pageSize = limit ? +limit : 12;

  const { isLoading: pageLoading } = usePaginationURL(currentPage, pageSize);

  const pagesCount = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  const { rowNumber, limit: limitRow } = useTableRow();
  const { userHaveAccess: userHaveAccessList } = useAccess(
    "action_category_admin_list"
  );
  const { userHaveAccess: userHaveAccessEdit } = useAccess(
    "action_category_admin_update"
  );
  const { userHaveAccess: userHaveAccessDelete } = useAccess(
    "action_category_admin_delete"
  );

  const deleteCategory = async (id) => {
    if (userHaveAccessDelete) {
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
    } else {
      toast.error("You Havent Access Delete Category");
    }
  };

  const editCategoryHandler = (id) => {
    if (userHaveAccessEdit) {
      setShowEditCategory(true);
      setCategoryEditId(id);
    } else {
      toast.error("You Havent Access Edit Category");
    }
  };

  return (
    <>
      {userHaveAccessList ? (
        <table className="min-w-full dark:text-white-100 2xl:h-[46.2rem] md:h-[34rem] h-[31rem] relative overflow-auto">
          <thead>
            <tr className="md:text-sm sm:text-xs text-[10px] text-center border-y grid sm:grid-cols-5 grid-cols-4">
              <th className="2xl:py-4 py-3 sm:inline hidden">NO</th>
              <th className="2xl:py-4 py-3">Category</th>
              <th className="2xl:py-4 py-3">Code</th>
              <th className="2xl:py-4 py-3">CreateAt</th>
              <th className="2xl:py-4 py-3">Actions</th>
            </tr>
          </thead>
          {paginationLodaing || isLoading || pageLoading ? (
            <Spinner />
          ) : (
            <tbody>
              {!!paginations?.length ? (
                paginations?.map((category, index) => (
                  <tr
                    className="2xl:text-base md:text-sm sm:text-xs text-[10px] text-center grid sm:grid-cols-5 grid-cols-4"
                    key={category.id}
                  >
                    <td className="2xl:py-4 py-3 sm:inline hidden">
                      {rowNumber >= limitRow
                        ? rowNumber + index + 1
                        : index + 1}
                    </td>
                    <td className="2xl:py-4 py-3 truncate">{category?.name}</td>

                    <td className="2xl:py-4 py-3 truncate">{category?.code}</td>
                    <td className="2xl:py-4 py-3 truncate">
                      {category?.createdAt?.slice(0, 10)}
                    </td>
                    <td className="2xl:py-4 py-3 truncate space-x-2">
                      <button onClick={() => editCategoryHandler(category?.id)}>
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
                ))
              ) : !paginations.length ? (
                <div className="flex justify-center items-center mt-32">
                  {/*  <div>
                    <img src="/images/not-found-product.svg" alt="" />
                    <p className="text-center mt-8 text-lg font-bold dark:text-white-100">
                      Category Not Found
                    </p>
                  </div> */}
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
        <AccessError error={"Category List"} />
      )}

      <Suspense fallback={<Spinner />}>
        {showEditCategory && (
          <EditCategory
            categoryEditId={categoryEditId}
            showEditCategory={showEditCategory}
            setShowEditCategory={setShowEditCategory}
            fetchData={fetchData}
          />
        )}
      </Suspense>
    </>
  );
}
