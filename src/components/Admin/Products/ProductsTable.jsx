import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import InfosModal from "../InfosModal";
import useFetch from "../../../hooks/useFetch";
import ProductsPanelContext from "./ProductsPanelContext";
import Pagination from "../../Paganation";
import instance from "../../../api/axios-interceptors";

export default function ProductsTable() {
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infosId, setInfosId] = useState(null);
  const [productInfos, setProductInfos] = useState([]);
  const {
    searchQuery,
    setProductDeleteId,
    setShowEditModal,
    setShowDeleteModal,
    setProductEditId,
  } = useContext(ProductsPanelContext);
  const [productList, setProductList] = useState([]);

  const fetchProductList = () => {
    instance.get("/api/v1/admin/product").then((res) => {
      setProductList(res.data);
    });
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  const editHandler = (id) => {
    setShowEditModal(true);
    setProductEditId(id);
  };
  const { datas, isLoading } = useFetch(
    `/api/v1/admin/productItem/product/${infosId}`
  );
  useEffect(() => {
    if (datas && datas.length > 0) {
      setProductInfos(datas);
    }
  }, [datas]);

  let pageSize = 10;
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
          <tr className="md:text-sm sm:text-xs text-[10px] text-center border-y">
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
                className="md:text-sm sm:text-xs text-[10px] text-center"
                key={index}
              >
                <td className="py-3">{index + 1}</td>
                <td className="py-3">{product?.name}</td>
                <td className="py-3 flex justify-center">
                  <img
                    src={`http://127.0.0.1:6060/${product?.brandFileUrl} `}
                    alt=""
                    className="sm:w-8 w-6"
                  />
                </td>
                <td className="py-3">{product?.categoryName}</td>
                <td className="py-3">{product?.code}</td>
                <td className="py-3 md:space-x-2">
                  <button onClick={() => editHandler(product?.id)}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-orange-400"
                    />
                  </button>
                  <button
                    className="px-2 py-1 rounded-md text-red-700 text-white"
                    onClick={() => {
                      setProductDeleteId(product?.id);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
                <td className="py-3">
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
