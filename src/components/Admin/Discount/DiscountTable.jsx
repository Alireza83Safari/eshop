import React, { useContext, useState, lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { toast } from "react-toastify";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import discountContext from "../../../Context/discountContext";
import useTableRow from "../../../hooks/useTableRow";
import Pagination from "../../getPagination";
import Spinner from "../../Spinner/Spinner";
const EditDiscount = lazy(() => import("./Edit/EditDiscount"));

export default function DiscountTable() {
  const { paginations, fetchData, paginatedProductsLoading, total } =
    useContext(discountContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditDiscount, setShowEditDiscount] = useState(false);
  const [editDiscounts, setEditDiscounts] = useState(null);
  const [isLoading, setLoading] = useState(false);
  let pageSize = 10;
  const { isLoading: paginationLoading } = usePaginationURL(
    currentPage,
    pageSize
  );

  const pagesCount = Math.ceil(total / pageSize);

  const deleteDiscount = async (id) => {
    const response = await adminAxios.post(`/discount/delete/${id}`);
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
  const { rowNumber, limit } = useTableRow();
  return (
    <>
      <table
        className={`min-w-full bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-xl 2xl:h-[50rem] md:h-[38.2rem] h-[34rem] relative ${
          isLoading && "opacity-20"
        }`}
      >
        <thead>
          <tr className="md:text-sm sm:text-xs text-[10px] text-center border-b grid sm:grid-cols-5 grid-cols-4">
            <th className="2xl:py-4 py-3 sm:inline hidden">NO</th>
            <th className="2xl:py-4 py-3">discount</th>
            <th className="2xl:py-4 py-3">quantity</th>
            <th className="2xl:py-4 py-3">CreatedAt</th>
            <th className="2xl:py-4 py-3">Actions</th>
          </tr>
        </thead>
        {paginatedProductsLoading || paginationLoading || isLoading ? (
          <Spinner />
        ) : (
          <tbody>
            {paginations?.map((discount, index) => (
              <tr
                className="2xl:text-lg md:text-sm sm:text-xs text-[10px] text-center grid sm:grid-cols-5 grid-cols-4"
                key={discount + 1}
              >
                <td className="2xl:py-4 py-3 sm:inline hidden">
                  {rowNumber >= limit ? rowNumber + index + 1 : index + 1}
                </td>
                <td className="2xl:py-4 py-3 truncate">{discount?.value}%</td>
                <td className="2xl:py-4 py-3 truncate">{discount?.quantity}</td>

                <td className="2xl:py-4 py-3 truncate">
                  {discount?.createdAt?.slice(0, 10)}
                </td>
                <td className="2xl:py-4 py-3 truncate space-x-2">
                  <button
                    onClick={() => {
                      setShowEditDiscount(true);
                      setEditDiscounts(discount);
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
                      deleteDiscount(discount?.id);
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

      <Suspense fallback={<Spinner />}>
        <EditDiscount
          showEditDiscount={showEditDiscount}
          editDiscounts={editDiscounts}
          setShowEditDiscount={setShowEditDiscount}
        />
      </Suspense>
    </>
  );
}
