import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../getPagination";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { ToastContainer, toast } from "react-toastify";
import EditBrand from "./EditBrand/EditBrand";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import Spinner from "../../Spinner/Spinner";
import useTableRow from "../../../hooks/useTableRow";

export default function BrandTable({
  paginations,
  total,
  paginationLodaing,
  fetchData,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditBrand, setShowEditBrand] = useState(false);
  const [brandEditId, setBrandEditId] = useState(null);
  const [isLoading, setLoading] = useState(false);

  let pageSize = 9;
  const pagesCount = Math.ceil(total / pageSize);
  const { isLoading: pageLoading } = usePaginationURL(currentPage, pageSize);

  const deleteBrand = async (id) => {
    setLoading(true);
    const response = await adminAxios.post(`/brand/delete/${id}`);
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
            <th className="py-3">Brand</th>
            <th className="py-3">Code</th>
            <th className="py-3">Image</th>
            <th className="py-3">CreatedAt</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        {pageLoading || isLoading || paginationLodaing ? (
          <Spinner />
        ) : (
          <tbody>
            {paginations?.map((brand, index) => (
              <tr
                className="md:text-sm sm:text-xs text-[10px] text-center grid grid-cols-6"
                key={brand + 1}
              >
                <td className="py-3">
                  {" "}
                  {rowNumber >= limit ? rowNumber + index + 1 : index + 1}
                </td>
                <td className="py-3 truncate">{brand?.name}</td>
                <td className="py-3 truncate">{brand?.code}</td>
                <td className="py-3 flex justify-center">
                  <img
                    src={`http://127.0.0.1:6060/${brand?.fileUrl}`}
                    className="w-8 object-contain"
                  />
                </td>
                <td className="py-3 truncate">
                  {brand?.createdAt?.slice(0, 10)}
                </td>
                <td className="py-3 truncate space-x-2">
                  <button
                    onClick={() => {
                      setShowEditBrand(true);
                      setBrandEditId(brand);
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
                      deleteBrand(brand?.id);
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

      {showEditBrand && (
        <EditBrand
          brandEditId={brandEditId}
          showEditBrand={showEditBrand}
          setShowEditBrand={setShowEditBrand}
          fetchData={fetchData}
        />
      )}

      <ToastContainer />
    </>
  );
}
