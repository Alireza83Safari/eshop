import React, { useState, useContext, useEffect, lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ProductsPanelContext from "../../../Context/ProductsPanelContext";
import adminAxios from "../../../services/Axios/adminInterceptors";
import Pagination from "../../getPagination";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import Spinner from "../../Spinner/Spinner";
import userAxios from "../../../services/Axios/userInterceptors";
import useTableRow from "../../../hooks/useTableRow";
const Infos = lazy(() => import("../Infos/Infos"));

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
    fetchProductList,
  } = useContext(ProductsPanelContext);

  let pageSize = 11;
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
      console.log(response?.data);
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
      <table className="min-w-full overflow-x-auto">
        <thead>
          <tr className="md:text-sm text-xs text-center border-y hover:bg-gray-50 dark:hover:bg-black-900">
            <th className="py-3 px-2">NO</th>
            <th className="py-3 px-2">PRODUCT</th>
            <th className="py-3 px-2">Brand</th>
            <th className="py-3 px-2">Category</th>
            <th className="py-3 px-2">Code</th>
            <th className="py-3 px-2">Actions</th>
            <th className="py-3 px-2">Infos</th>
          </tr>
        </thead>

        {paginationLoading || loading ? (
          <Spinner />
        ) : paginations?.length >= 1 ? (
          <tbody>
            {paginations?.map((product, index) => (
              <tr
                className="md:text-sm text-xs text-center hover:bg-gray-50 dark:hover:bg-black-900"
                key={product.id}
              >
                <td className="py-3 px-2">
                  {rowNumber >= limit ? rowNumber + index + 1 : index + 1}
                </td>
                <td className="py-3 px-2 truncate">{product?.name}</td>
                <td className="py-3 px-2 flex justify-center items-center">
                  <img
                    src={`http://127.0.0.1:6060/${product?.brandFileUrl} `}
                    alt=""
                    className="sm:w-8 w-6 sm:h-8 h-6 object-contain"
                  />
                </td>
                <td className="py-3 px-2 truncate">{product?.categoryName}</td>
                <td className="py-3 px-2 truncate">{product?.code}</td>
                <td className="py-3 px-2 truncate space-x-2">
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
                <td className="py-3 px-2 truncate">
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
      </table>
      <Suspense fallback={<Spinner />}>
        {showInfo && (
          <Infos
            setShowInfo={setShowInfo}
            showInfo={showInfo}
            isLoading={isLoading}
            productInfos={productInfos}
            productFile={productFile}
            getProductFile={getProductFile}
            infosId={infosId}
            fetchProductList={fetchProductList}
          />
        )}
      </Suspense>

      <Pagination
        pagesCount={pagesCount}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}
