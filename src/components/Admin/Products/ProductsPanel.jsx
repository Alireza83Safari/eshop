import React, { useEffect, useState, lazy, Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../hooks/useFetch";
import Spinner from "../../Spinner/Spinner";
import ProductsPanelContext from "./ProductsPanelContext";
import adminAxios from "../../../api/adminInterceptors";

const Departments = lazy(() => import("./Departments"));
const PiesChart = lazy(() => import("../Charts/PieChart"));
const ProductsTable = lazy(() => import("./ProductsTable"));
const AddNewProduct = lazy(() => import("./AddNewProduct"));
const DeleteModal = lazy(() => import("./DeleteModal"));
const AddProductItem = lazy(() => import("./AddProductItem"));
const AddProductFile = lazy(() => import("./AddProductFile"));
const EditProduct = lazy(() => import("./EditProduct"));

export default function ProductsPanel() {
  const [productDeleteId, setProductDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showProductItem, setShowProductItem] = useState(false);
  const [productEditId, setProductEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFile, setShowFile] = useState(false);
  const [newProductId, setNewProductId] = useState("");
  const [productList, setProductList] = useState([]);

  const fetchProductList = () => {
    adminAxios.get("/product").then((res) => {
      setProductList(res.data);
    });
  };
  useEffect(() => {
    fetchProductList();
  }, []);

  return (
    <ProductsPanelContext.Provider
      value={{
        searchQuery,
        productList,
        setProductDeleteId,
        setShowEditModal,
        showEditModal,
        showDeleteModal,
        setShowDeleteModal,
        setProductEditId,
        productEditId,
        productDeleteId,
        setShowFile,
        showFile,
        showProductItem,
        setShowProductItem,
        showAddProduct,
        setShowAddProduct,
        setNewProductId,
        setShowProductItem,
        newProductId,
        fetchProductList,
      }}
    >
      <section className="p-6 float-right mt-12 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
        <div className="grid grid-cols-10">
          <div className="lg:col-span-7 col-span-10 mt-5 lg:px-6 px-1 overflow-x-auto relative bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-xl">
            <div className="py-4 flex flex-co sm:flex-row justify-between px-4 w-full">
              <div className="flex bg-white-100 rounded-lg relative md:w-auto">
                <input
                  type="text"
                  id="searchInput"
                  placeholder="Search for data user ..."
                  className="py-1 sm:py-2 pl-7 outline-none rounded-lg text-black-900 text-xs sm:w-48 w-28 sm:placeholder:text-[12px] placeholder:text-[10px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute text-sm left-2 sm:top-2 top-1 text-black-800"
                />
              </div>

              <button
                className="sm:text-xs text-[10px] bg-blue-600 text-white-100 px-2 rounded-lg whitespace-nowrap"
                onClick={() => setShowAddProduct(true)}
              >
                Add Product <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>

            <div className="sm:h-[38rem] h-[35rem]">
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

            <div className="dark:bg-black-200 bg-white-100 rounded-xl">
              <Suspense fallback={<Spinner />}>
                <Departments />
              </Suspense>
            </div>
          </div>
        </div>
        <Suspense fallback={<Spinner />}>
          {showAddProduct && <AddNewProduct />}

          {showProductItem && <AddProductItem />}

          {showFile && <AddProductFile />}

          <DeleteModal />

          <EditProduct />
        </Suspense>
      </section>
    </ProductsPanelContext.Provider>
  );
}
