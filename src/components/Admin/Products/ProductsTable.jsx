import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import InfosModal from "./InfosModal";
import ProductsPanelContext from "../../../Context/ProductsPanelContext";
import Pagination from "../../Paganation";
import adminAxios from "../../../services/Axios/adminInterceptors";

export default function ProductsTable() {
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infosId, setInfosId] = useState(null);
  const [productInfos, setProductInfos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const {
    searchQuery,
    setProductDeleteId,
    setShowEditModal,
    setShowDeleteModal,
    setProductEditId,
    productList,
  } = useContext(ProductsPanelContext);

  const editHandler = (id) => {
    setShowEditModal(true);
    setProductEditId(id);
  };

  const getProductInfo = async () => {
    setLoading(true);
    try {
      const response = await adminAxios.get(`/productItem/product/${infosId}`);
      if (response.status === 200) {
        setProductInfos(response?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductInfo();
  }, [infosId]);

  let pageSize = 11;
  let pageNumber;

  useEffect(() => {
    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    setPaginatedProducts(productList.slice(startIndex, endIndex));
  }, [currentPage, productList]);

  let pageCount = Math.ceil(productList.length / pageSize);
  pageNumber = Array.from(Array(pageCount).keys());

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

        <tbody>
          {paginatedProducts
            .filter((product) =>
              product.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((product, index) => (
              <tr
                className="md:text-sm sm:text-xs text-[10px] text-center grid grid-cols-7"
                key={index}
              >
                <td className="py-3">{index + 1}</td>
                <td className="py-3 truncate">{product?.name}</td>
                <td className="py-3 flex justify-center">
                  <img
                    src={`http://127.0.0.1:6060/${product?.brandFileUrl} `}
                    alt=""
                    className="sm:w-8 w-6 object-contain"
                  />
                </td>
                <td className="py-3 truncate">{product?.categoryName}</td>
                <td className="py-3 truncate">{product?.code}</td>
                <td className="py-3 truncate space-x-2">
                  <button onClick={() => editHandler(product?.id)}>
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
                      setShowInfoModal(true);
                      setInfosId(product?.id);
                    }}
                  >
                    Infos
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <InfosModal
        showInfoModal={showInfoModal}
        setShowInfoModal={setShowInfoModal}
        productInfos={productInfos}
        isLoading={isLoading}
      />
      <Pagination
        pageNumber={pageNumber}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}
