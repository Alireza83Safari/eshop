import React, { useEffect, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import adminAxios from "../../../../services/Axios/adminInterceptors";
import { useLocation } from "react-router-dom";
import Pagination from "../../../Paganation";
import Spinner from "../../../Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import userAxios from "../../../../services/Axios/userInterceptors";

export default function ProductsTable({
  setProductId,
  setProductName,
  setShowChooseProduct,
  setEditDiscount,
}) {
  const { datas: products } = useFetch("product/selectList", adminAxios);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const pageSize = 8;
  const totalPage = Math.ceil(products?.data.length / pageSize);
  const pageNumber = totalPage > 0 ? Array.from(Array(totalPage).keys()) : [];
  const [isLoading, setIsLoading] = useState(false);
  const getPaginationComments = async () => {
    try {
      setIsLoading(true);
      const response = await userAxios.get(
        `/product?page=${currentPage}&limit=${pageSize}`
      );
      setPaginatedProducts(response?.data?.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPaginationComments();
  }, [currentPage, location.search]);

  const setProductHanddler = async (product) => {
    console.log(product?.itemId);
    setProductId
      ? setProductId(product?.itemId)
      : setEditDiscount({ productItemId: product.itemId });
    setProductName(product?.name);
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 bg-gray-100 -translate-y-1/2 z-10 w-full h-screen flex items-center justify-center transition duration-400 visible">
      <div className="mb-8 bg-white-100 relative  rounded-xl w-3/12">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <FontAwesomeIcon
              icon={faX}
              className=" absolute right-2 top-2 text-red-700 text-xl"
              onClick={() => setShowChooseProduct(false)}
            />
            <h2 className="text-xl text-center font-bold py-4 border-b">
              Choose Product
            </h2>
            <ul className="pb-12">
              {paginatedProducts?.map((product, index) => (
                <li
                  className="py-3 hover:bg-gray-100 duration-500 border-b  px-8"
                  onClick={() => setProductHanddler(product)}
                >
                  {index + 1}:{product?.name}
                </li>
              ))}
            </ul>
            <Pagination
              pageNumber={pageNumber}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
