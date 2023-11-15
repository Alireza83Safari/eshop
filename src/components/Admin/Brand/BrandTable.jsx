import React, { useState, lazy, Suspense } from "react";
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
const EditBrand = lazy(() => import("./EditBrand/EditBrand"));

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
  const { isLoading: pageLoading } = usePaginationURL(currentPage, 9);

  const { userHaveAccess: userHaveAccessList } = useAccess(
    "action_brand_admin_list"
  );
  const { userHaveAccess: userHaveAccessDelete } = useAccess(
    "action_brand_admin_delete"
  );

  const { userHaveAccess: userHaveAccessEdit } = useAccess(
    "action_brand_admin_update"
  );

  const deleteBrand = async (id) => {
    if (userHaveAccessDelete) {
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
    } else {
      toast.error("You Havent Access Delete Brand");
    }
  };

  const editBrand = async (brand) => {
    if (userHaveAccessEdit) {
      setShowEditBrand(true);
      setBrandEditId(brand);
    } else {
      toast.error("You Havent Access Edit Brand");
    }
  };
  const { rowNumber, limit } = useTableRow();
  return (
    <>
      {userHaveAccessList ? (
        <table className="min-w-full dark:text-white-100 rounded-xl 2xl:h-[46.2rem] md:h-[35rem] h-[32rem] relative">
          <thead>
            <tr className="md:text-sm sm:text-xs text-[10px] text-center border-y grid sm:grid-cols-6 grid-cols-5">
              <th className="2xl:py-4 py-3 sm:inline hidden">NO</th>
              <th className="2xl:py-4 py-3">Brand</th>
              <th className="2xl:py-4 py-3">Code</th>
              <th className="2xl:py-4 py-3">Image</th>
              <th className="2xl:py-4 py-3">CreatedAt</th>
              <th className="2xl:py-4 py-3">Actions</th>
            </tr>
          </thead>
          {pageLoading || isLoading || paginationLodaing ? (
            <Spinner />
          ) : (
            <tbody>
              {paginations?.length >= 1 ? (
                paginations?.map((brand, index) => (
                  <tr
                    className="2xl:text-base md:text-sm sm:text-xs text-[10px] text-center grid sm:grid-cols-6 grid-cols-5"
                    key={brand.id}
                  >
                    <td className="2xl:py-4 py-3 sm:inline hidden">
                      {rowNumber >= limit ? rowNumber + index + 1 : index + 1}
                    </td>
                    <td className="2xl:py-4 py-3 truncate">
                      {brand?.name?.slice(0, 25)}
                    </td>
                    <td className="2xl:py-4 py-3 truncate">{brand?.code}</td>
                    <td className="flex justify-center items-center">
                      <img
                        src={brand?.fileUrl}
                        className="md:w-8 w-6 object-contain"
                      />
                    </td>
                    <td className="2xl:py-4 py-3 truncate">
                      {brand?.createdAt?.slice(0, 10)}
                    </td>
                    <td className="2xl:py-4 py-3 truncate space-x-2">
                      <button onClick={() => editBrand(brand)}>
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
                ))
              ) : paginations.length !== 0 ? (
                <div className="flex justify-center items-center mt-32">
                  <div>
                    <img src="/images/not-found-product.svg" alt="" />
                    <p className="text-center mt-8 text-lg font-bold dark:text-white-100">
                      Brand Not Found
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
        <AccessError error={"Brands List"} />
      )}

      <Suspense fallback={<Spinner />}>
        {showEditBrand && (
          <EditBrand
            brandEditId={brandEditId}
            showEditBrand={showEditBrand}
            setShowEditBrand={setShowEditBrand}
            fetchData={fetchData}
          />
        )}
      </Suspense>
    </>
  );
}
