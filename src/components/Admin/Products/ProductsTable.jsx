import React, { useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ProductInfo from "./ProductInfo";
import ProductsPanelContext from "../../../Context/ProductsPanelContext";
import adminAxios from "../../../services/Axios/adminInterceptors";
import Pagination from "../../getPagination";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import Spinner from "../../Spinner/Spinner";
import userAxios from "../../../services/Axios/userInterceptors";
import useTableRow from "../../../hooks/useTableRow";

export default function ProductsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showInfo, setShowInfo] = useState(false);
  const [infosId, setInfosId] = useState(null);
  const {
    setProductDeleteId,
    setShowDeleteModal,
    setEditProductID,
    setShowEditModal,
    paginations,
    total,
    paginationLoading,
  } = useContext(ProductsPanelContext);

  let pageSize = 12;
  const { isLoading: loading } = usePaginationURL(currentPage, pageSize);
  const pagesCount = Math.ceil(total / pageSize);

  // product info
  const [isLoading, setLoading] = useState(false);
  const [productInfos, setProductInfos] = useState(null);
  const [productFile, setProductFile] = useState(null);
  const getProductInfo = async () => {
    setLoading(true);
    if (infosId) {
      try {
        const response = await adminAxios.get(
          `/productItem/product/${infosId}`
        );
        if (response.status === 200) {
          setProductInfos(response?.data);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    }
  };

  const getProductFile = async () => {
    setLoading(true);
    const response = await userAxios.get(`/file/${infosId}/1`);
    try {
      setLoading(false);
      setProductFile(response?.data);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showInfo) {
      getProductInfo();
      getProductFile();
    }
  }, [infosId]);

  const { rowNumber, limit } = useTableRow();
  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr className="md:text-sm sm:text-xs text-[10px] text-center border-y grid grid-cols-7">
            <th className="py-3">NO</th>
            <th className="py-3">PRODUCT</th>
            <th className="py-3">Brand</th>
            <th className="py-3">Category</th>
            <th className="py-3">Code</th>
            <th className="py-3">Actions</th>
            <th className="py-3">Infos</th>
          </tr>
        </thead>

        {loading || paginationLoading ? (
          <Spinner />
        ) : paginations?.length >= 1 ? (
          <tbody>
            {paginations?.map((product, index) => (
              <tr
                className="md:text-sm sm:text-xs text-[10px] text-center grid grid-cols-7"
                key={product.id}
              >
                <td className="py-3">
                  {rowNumber >= limit ? rowNumber + index + 1 : index + 1}
                </td>
                <td className="py-3 truncate">{product?.name}</td>
                <td className="py-3 flex justify-center items-center">
                  <img
                    src={`http://127.0.0.1:6060/${product?.brandFileUrl} `}
                    alt=""
                    className="sm:w-8 w-6 sm:h-8 h-6 object-contain"
                  />
                </td>
                <td className="py-3 truncate">{product?.categoryName}</td>
                <td className="py-3 truncate">{product?.code}</td>
                <td className="py-3 truncate space-x-2">
                  <button
                    onClick={() => {
                      setEditProductID(product?.id);
                      setShowEditModal(true);
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
                      setProductDeleteId(product?.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
                <td className="py-3 truncate">
                  <button
                    className="border md:px-2 px-1 md:text-xs text-[9px] rounded-lg"
                    onClick={() => {
                      setInfosId(product?.id);
                      setShowInfo(true);
                    }}
                  >
                    Infos
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <div className="flex justify-center items-center mt-32">
            <div>
              <img src="/images/not-found-product.svg" alt="" />
              <p className="text-center mt-8 text-lg font-bold dark:text-white-100">
                Product Not Found
              </p>
            </div>
          </div>
        )}
      </table>
      {showInfo && (
        <ProductInfo
          setShowInfo={setShowInfo}
          isLoading={isLoading}
          productInfos={productInfos}
          productFile={productFile}
        />
      )}

      <Pagination
        pagesCount={pagesCount}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}
