import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../getPagination";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { toast } from "react-toastify";
import EditDiscount from "./Edit/EditDiscount";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import Spinner from "../../Spinner/Spinner";
import discountContext from "../../../Context/discountContext";

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

  return (
    <>
      <table
        className={`min-w-full bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-xl h-[37rem] relative ${
          isLoading && "opacity-20"
        }`}
      >
        <thead>
          <tr className="md:text-sm sm:text-xs text-[10px] text-center border-b grid grid-cols-5">
            <th className="py-3">NO</th>
            <th className="py-3">discount</th>
            <th className="py-3">quantity</th>
            <th className="py-3">CreatedAt</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        {paginatedProductsLoading || paginationLoading || isLoading ? (
          <Spinner />
        ) : (
          <tbody>
            {paginations?.map((brand, index) => (
              <tr
                className="md:text-sm sm:text-xs text-[10px] text-center grid grid-cols-5"
                key={index}
              >
                <td className="py-3">{index + 1}</td>
                <td className="py-3 truncate">{brand?.value}%</td>
                <td className="py-3 truncate">{brand?.quantity}</td>

                <td className="py-3 truncate">
                  {brand?.createdAt?.slice(0, 10)}
                </td>
                <td className="py-3 truncate space-x-2">
                  <button
                    onClick={() => {
                      setShowEditDiscount(true);
                      setEditDiscounts(brand);
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
                      deleteDiscount(brand?.id);
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

      <EditDiscount
        showEditDiscount={showEditDiscount}
        editDiscounts={editDiscounts}
        setShowEditDiscount={setShowEditDiscount}
      />
    </>
  );
}
