import React, { useState, lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import { useFetchPagination } from "../../../hooks/useFetchPagination";
import { useSearch } from "../../../hooks/useSearch";
import Spinner from "../../Spinner/Spinner";
import ProductsPanelContext from "../../../Context/ProductsPanelContext";
import adminAxios from "../../../services/Axios/adminInterceptors";

const AddProduct = lazy(() => import("./Add/AddProduct"));
const Departments = lazy(() => import("./Departments"));
const PiesChart = lazy(() => import("../Charts/PieChart"));
const ProductsTable = lazy(() => import("./ProductsTable"));
const DeleteModal = lazy(() => import("./DeleteModal"));
const EditProduct = lazy(() => import("./Edit/EditProduct"));

export default function ProductsPanel() {
  const [productDeleteId, setProductDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const [newProductId, setNewProductId] = useState(null);
  const [editProductID, setEditProductID] = useState(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);

  let url = "product";
  const {
    paginations,
    total,
    isLoading: paginationLoading,
    fetchData: fetchProductList,
  } = useFetchPagination(url, adminAxios);

  const { setSearchValue } = useSearch(searchQuery);

  return (
    <ProductsPanelContext.Provider
      value={{
        searchQuery,
        setProductDeleteId,
        setShowEditModal,
        showEditModal,
        setShowEditModal,
        showDeleteModal,
        setShowDeleteModal,
        productDeleteId,
        setNewProductId,
        newProductId,
        fetchProductList,
        showAddProductModal,
        setShowAddProductModal,
        setEditProductID,
        editProductID,
        paginations,
        total,
        paginationLoading,
      }}
    >
      <section className="sm:p-6 p-3 float-right mt-12 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
        <div className="grid grid-cols-10">
          <div className="lg:col-span-7 col-span-10 mt-5 lg:px-6 px-1 overflow-x-auto relative bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-xl">
            <div className="py-4 flex justify-between px-4 w-full">
              <div className="flex bg-white-100 rounded-lg relative md:w-auto">
                <input
                  type="text"
                  id="searchInput"
                  name="searchTerm"
                  placeholder="Search product ..."
                  className="py-1 sm:py-2 pl-7 w-32 outline-none rounded-lg dark:bg-black-200  text-xs sm:placeholder:text-[12px] placeholder:text-[10px] dark:text-white-100"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute text-sm left-2 sm:top-2 top-1 text-black-800 dark:text-white-100"
                  onClick={setSearchValue}
                />
              </div>

              <div>
                <button
                  className="sm:text-xs text-[10px] bg-blue-600 text-white-100 md:p-2 p-1 md:mr-2 mr-1 rounded-lg whitespace-nowrap"
                  onClick={() => setShowAddProductModal(true)}
                >
                  Add Product <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>

            <div className="sm:h-[46.5rem] h-[41rem]">
              <Suspense fallback={<Spinner />}>
                <ProductsTable />
              </Suspense>
            </div>
          </div>

          <div className="relative lg:col-span-3 col-span-10 row-auto mt-5 lg:mx-4">
            <div className="relative flex justify-center bg-white-100 rounded-xl dark:bg-black-200">
              <p className="absolute mt-5 xl:text-lg md:text-base text-lg dark:text-white-100">
                Transactions Chart
              </p>
              <Suspense fallback={<Spinner />}>
                <PiesChart />
              </Suspense>
            </div>

            <div className="dark:bg-black-200 bg-white-100 rounded-xl h-[22rem]">
              <Suspense fallback={<Spinner />}>
                <Departments />
              </Suspense>
            </div>
          </div>
        </div>

        <Suspense fallback={<Spinner />}>
          {showAddProductModal && <AddProduct />}
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <DeleteModal />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          {showEditModal && <EditProduct />}
        </Suspense>
        <ToastContainer />
      </section>
    </ProductsPanelContext.Provider>
  );
}
