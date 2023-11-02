import React, { useContext, useState, lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import useTableRow from "../../../hooks/useTableRow";
import Pagination from "../../getPagination";
import Spinner from "../../Spinner/Spinner";
import { DiscountContext } from "../../../Context/discountContext";
import useAccess from "../../../hooks/useAccess";
import AccessError from "../../AccessError";
import toast from "react-hot-toast";
const EditDiscount = lazy(() => import("./Edit/EditDiscount"));

export default function DiscountTable() {
  const { paginations, fetchData, paginatedProductsLoading, total } =
    useContext(DiscountContext);
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

  const { userHaveAccess: userHaveAccessList } = useAccess(
    "action_discount_admin_list"
  );
  const { userHaveAccess: userHaveAccessEdit } = useAccess(
    "action_discount_admin_update"
  );
  const { userHaveAccess: userHaveAccessDelete } = useAccess(
    "action_discount_admin_delete"
  );

  const deleteDiscount = async (id) => {
    if (userHaveAccessDelete) {
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
    } else {
      toast.error("You Havent Access Delete Discount");
    }
  };
  const { rowNumber, limit } = useTableRow();

  const editDiscountHandler = (ID) => {
    if (userHaveAccessEdit) {
      setShowEditDiscount(true);
      setEditDiscounts(ID);
    } else {
      toast.error("You Havent Access Edit Discount");
    }
  };
  return (
    <>
      {userHaveAccessList ? (
        <>
          <table
            className={` min-w-full overflow-x-auto ${
              isLoading && "opacity-20"
            }`}
          >
            <thead>
              <tr className="md:text-sm text-xs text-center border-b">
                <th className="2xl:py-4 py-3 ">NO</th>
                <th className="2xl:py-4 py-3">discount</th>
                <th className="2xl:py-4 py-3">for</th>
                <th className="2xl:py-4 py-3">quantity</th>
                <th className="2xl:py-4 py-3">CreatedAt</th>
                <th className="2xl:py-4 py-3">Actions</th>
              </tr>
            </thead>
            {paginatedProductsLoading || paginationLoading || isLoading ? (
              <Spinner />
            ) : (
              <tbody className="overflow-auto">
                {paginations?.map((discount, index) => (
                  <tr
                    className="2xl:text-base md:text-sm text-xs text-center hover:bg-gray-50 dark:hover:bg-black-900"
                    key={discount.id}
                  >
                    <td className="2xl:py-4 py-3">
                      {rowNumber >= limit ? rowNumber + index + 1 : index + 1}
                    </td>
                    <td className="2xl:py-4 py-3 truncate">
                      {discount?.value}%
                    </td>
                    <td className="2xl:py-4 py-3 truncate">
                      {discount?.productName || discount?.relatedUserUsername}
                    </td>
                    <td className="2xl:py-4 py-3 truncate">
                      {discount?.quantity}
                    </td>
                    <td className="2xl:py-4 py-3 truncate">
                      {discount?.createdAt?.slice(0, 10)}
                    </td>
                    <td className="2xl:py-4 py-3 truncate space-x-2">
                      <button onClick={() => editDiscountHandler(discount.id)}>
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
          </table>
          <Pagination
            pagesCount={pagesCount}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </>
      ) : (
        <AccessError error={"Discount List"} />
      )}

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
