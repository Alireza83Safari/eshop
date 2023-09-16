import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../../Paganation";
import adminAxios from "../../../services/Axios/adminInterceptors";
import { ToastContainer, toast } from "react-toastify";
import EditBrand from "./EditBrand/EditBrand";

export default function BrandTable({ fetchBrand, brand }) {
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditBrand, setShowEditBrand] = useState(false);
  const [brandEditId, setBrandEditId] = useState(null);
  const [isLoading, setLoading] = useState(false);

  let pageSize = 9;
  useEffect(() => {
    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    setPaginatedProducts(brand?.slice(startIndex, endIndex));
  }, [currentPage, brand]);

  const totalPage = Math.ceil(brand?.length / pageSize);
  const pageNumber = Array.from(Array(totalPage).keys());

  const deleteBrand = async (id) => {
    const response = await adminAxios.post(`/brand/delete/${id}`);
    setLoading(true);
    try {
      if (response.status === 200) {
        setLoading(false);
        toast.success("delete succefuly");
        fetchBrand();
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
          <tr className="md:text-sm sm:text-xs text-[10px] text-center border-b grid grid-cols-6">
            <th className="py-3">NO</th>
            <th className="py-3">Brand</th>
            <th className="py-3">Code</th>
            <th className="py-3">Image</th>
            <th className="py-3">CreatedAt</th>
            <th className="py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts?.map((brand, index) => (
            <tr
              className="md:text-sm sm:text-xs text-[10px] text-center grid grid-cols-6"
              key={index}
            >
              <td className="py-3">{index + 1}</td>
              <td className="py-3 truncate">{brand?.name}</td>
              <td className="py-3 truncate">{brand?.code}</td>
              <td className="py-3 flex justify-center">
                <img
                  src={`http://127.0.0.1:6060/${brand?.fileUrl}`}
                  className="w-8 object-contain"
                  alt={brand?.name}
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
                  <FontAwesomeIcon icon={faEdit} className="text-orange-400" />
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
      </table>
      <div className="relative">
        <Pagination
          pageNumber={pageNumber}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>

      {showEditBrand && (
        <EditBrand
          brandEditId={brandEditId}
          showEditBrand={showEditBrand}
          setShowEditBrand={setShowEditBrand}
          fetchBrand={fetchBrand}
        />
      )}

      <ToastContainer />
    </>
  );
}
