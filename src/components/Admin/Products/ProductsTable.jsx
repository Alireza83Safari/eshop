import React, {
  useState,
  useContext,
  useEffect,
  lazy,
  Suspense,
  useMemo,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import ProductsPanelContext from "../../../context/ProductsPanelContext";
import adminAxios from "../../../services/Axios/adminInterceptors";
import Pagination from "../../getPagination";
import { usePaginationURL } from "../../../hooks/usePaginationURL";
import Spinner from "../../Spinner/Spinner";
import userAxios from "../../../services/Axios/userInterceptors";
import useTableRow from "../../../hooks/useTableRow";
import useAccess from "../../../hooks/useAccess";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const limit = searchParams.get("limit");
  const pageSize = limit ? +limit : 11;

  const { isLoading: loading } = usePaginationURL(currentPage, pageSize);
  const pagesCount = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  // product info
  const [isLoading, setLoading] = useState(false);
  const [productInfos, setProductInfos] = useState(null);
  const [productFile, setProductFile] = useState(null);

  const { userHaveAccess: userHaveAccessDelete } = useAccess(
    "action_product_admin_delete"
  );
  const { userHaveAccess: userHaveAccessEdit } = useAccess(
    "action_product_admin_update"
  );

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
  const { rowNumber, limit: limitRow } = useTableRow();

  const deleteHandler = (product) => {
    if (userHaveAccessDelete) {
      setProductDeleteId(product?.id);
      setShowDeleteModal(true);
    } else {
      toast.error("You Havent Access Delete Product");
    }
  };

  const editHandler = (product) => {
    if (userHaveAccessEdit) {
      setEditProductID(product?.id);
      setShowEditModal(true);
    } else {
      toast.error("You Havent Access Edit Product");
    }
  };
  return (
    <>
      <table className="min-w-full overflow-x-auto">
        <thead>
          <tr className="md:text-sm text-xs text-center border-y hover:bg-gray-50 dark:hover:bg-black-900">
            <th className="py-3 px-2">NO</th>
            <th className="py-3 px-2">Product</th>
            <th className="py-3 px-2">Brand</th>
            <th className="py-3 px-2">Category</th>
            <th className="py-3 px-2">Code</th>
            <th className="py-3 px-2">Actions</th>
            <th className="py-3 px-2">Infos</th>
          </tr>
        </thead>

        {paginationLoading || loading ? (
          <Spinner />
        ) : !!paginations?.length ? (
          <tbody>
            {paginations?.map((product, index) => (
              <tr
                className="2xl:text-sm text-xs text-center hover:bg-gray-50 dark:hover:bg-black-900"
                key={product.id}
              >
                <td className="py-3 px-2">
                  {rowNumber >= limitRow ? rowNumber + index + 1 : index + 1}
                </td>
                <td className="py-3 px-2 truncate">
                  {product?.name?.slice(0, 25)}
                </td>
                <td className="py-3 px-2 flex justify-center items-center">
                  <img
                    src={product?.brandFileUrl}
                    alt=""
                    className="sm:w-8 w-6 sm:h-8 h-6 object-contain"
                  />
                </td>
                <td className="py-3 px-2 truncate">{product?.categoryName}</td>
                <td className="py-3 px-2 truncate">
                  {product?.code?.slice(0, 15)}
                </td>
                <td className="py-3 px-2 truncate space-x-2">
                  <button onClick={() => editHandler(product)}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-orange-400"
                    />
                  </button>

                  <button
                    className="py-1 rounded-md text-red-700 text-white"
                    onClick={() => deleteHandler(product)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
                <td className="py-3 px-2 truncate">
                  <button
                    className="border md:px-2 py-1 px-1 md:text-xs text-[9px] rounded-lg"
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
        ) : !paginations?.length ? (
          <tbody className="flex justify-center items-center mt-32">
            <>
              <img src="/images/not-found-product.svg" alt="" />
              <p className="text-center mt-8 text-lg font-bold dark:text-white-100">
                Brand Not Found
              </p>
            </>
          </tbody>
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
