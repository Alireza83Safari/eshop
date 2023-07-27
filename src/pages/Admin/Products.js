import React, { useContext, useEffect, useReducer, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

import productsContext from "../../Context/productsContext";
import AddNewProduct from "../../components/Admin/AddNewProduct";
import EditProduct from "../../components/Admin/EditProduct";
import DeleteModal from "../../components/Admin/DeleteModal";
import Departments from "../../components/Admin/Departments";
import PiesChart from "../../components/Admin/Charts/PieChart";
import ProductsTable from "../../components/Admin/ProductsTable";
import FilterProducts from "../../components/Admin/FilterProducts";
import Pagination from "../../components/Paganation";
import Spinner from "../../components/Spinner/Spinner";

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORY_FILTER":
      return { ...state, categoryFilter: action.payload };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.payload };
    default:
      return state;
  }
};

export default function Products() {
  const [productId, setProductId] = useState(null);
  const { getProducts, isLoading, setLoading } = useContext(productsContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productEditId, setProductEditId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const initialState = {
    categoryFilter: "",
    statusFilter: "",
  };
  const [state, dispatch] = useReducer(filterReducer, initialState);

  let pageSize = 10;
  let pageNumber;
  useEffect(() => {
    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    setPaginatedProducts(getProducts.slice(startIndex, endIndex));
  }, [currentPage, getProducts]);

  let pageCount = Math.ceil(getProducts.length / pageSize);
  pageNumber = Array.from(Array(pageCount).keys());
  const [editProductInfos, setEditProductInfos] = useState({
    name: "",
    img: "",
    price: "",
    sale: "",
    status: "",
    category: "",
  });

  const data = [
    { name: "Tax", value: 5443 },
    { name: "Income", value: 4354 },
    { name: "Net Profit", value: 7634 },
  ];
  const COLORS = ["red", "#00C49F", "#FFBB28"];

  const searchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleShowAddProduct = () => {
    setShowAddProduct(true);
  };

  return (
    <section className="p-6 float-right mt-12 bg-white-200 dark:bg-black-600 lg:w-[87%] w-[93%] min-h-screen">
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-10">
          <div className="lg:col-span-7 col-span-10 mt-5 lg:px-6 px-1 overflow-x-auto relative bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-xl">
            <FilterProducts state={state} dispatch={dispatch} />

            <div className="py-4 flex flex-co sm:flex-row justify-between px-4 w-full">
              <div className="flex bg-white-100 rounded-lg relative md:w-auto">
                <input
                  type="text"
                  id="searchInput"
                  placeholder="Search for data user ..."
                  className="py-1 sm:py-2 pl-7 outline-none rounded-lg text-black-900 text-xs sm:w-48 w-28 sm:placeholder:text-[12px] placeholder:text-[10px]"
                  value={searchQuery}
                  onChange={searchInputChange}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute text-sm left-2 sm:top-2 top-1 text-black-800"
                />
              </div>

              <button
                className="sm:text-xs text-[10px] bg-blue-600 text-white-100 px-2 rounded-lg whitespace-nowrap"
                onClick={handleShowAddProduct}
              >
                Add Product <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <div className="h-[40rem]">
              <ProductsTable
                paginatedProducts={paginatedProducts}
                state={state}
                searchQuery={searchQuery}
                setProductId={setProductId}
                setShowDeleteModal={setShowDeleteModal}
                setShowEditModal={setShowEditModal}
                setProductEditId={setProductEditId}
                setEditProductInfos={setEditProductInfos}
              />
            </div>
            <Pagination
              pageNumber={pageNumber}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>

          <div className="relative lg:col-span-3 col-span-10 row-auto mt-5 mx-4">
            <div className="relative flex justify-center bg-white-100 rounded-xl dark:bg-black-200">
              <p className="absolute mt-5 xl:text-lg md:text-base text-lg dark:text-white-100">
                Transactions Chart
              </p>
              <PiesChart data={data} COLORS={COLORS} />
            </div>

            <div className="dark:bg-black-200 bg-white-100 rounded-xl">
              <Departments />
            </div>
          </div>
        </div>
      )}

      {showAddProduct && (
        <AddNewProduct
          showAddProduct={showAddProduct}
          setShowAddProduct={setShowAddProduct}
        />
      )}

      <EditProduct
        editProductInfos={editProductInfos}
        setEditProductInfos={setEditProductInfos}
        productEditId={productEditId}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
      />
      <DeleteModal
        productId={productId}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
    </section>
  );
}
