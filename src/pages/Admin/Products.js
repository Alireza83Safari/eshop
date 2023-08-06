import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import "react-toastify/dist/ReactToastify.css";

import AddNewProduct from "../../components/Admin/AddNewProduct";
import DeleteModal from "../../components/Admin/DeleteModal";
import Departments from "../../components/Admin/Departments";
import PiesChart from "../../components/Admin/Charts/PieChart";
import ProductsTable from "../../components/Admin/ProductsTable";
import FilterProducts from "../../components/Admin/FilterProducts";
import Pagination from "../../components/Paganation";
import AddProductItem from "../../components/Admin/AddProductItem";
import AddProductFile from "../../components/Admin/AddProductFile";
import EditProduct from "../../components/Admin/EditProduct";
import useFetch from "../../hooks/useFetch";

export default function Products() {
  const [productId, setProductId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showProductItem, setShowProductItem] = useState(false);
  const [productEditId, setProductEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const [showFile, setShowFile] = useState(false);
  const [productCode, setProductCode] = useState("");

  const findProduct = productList.find(
    (product) => product.code === productCode
  );

  const [brands, setBrands] = useState([]);
  const [category, setCategory] = useState([]);

  const { datas: brandsData } = useFetch("/api/v1/brand");
  useEffect(() => {
    if (brandsData && brandsData.data) {
      setBrands(brandsData.data);
    }
  }, [brandsData]);

  const { datas: categoryData } = useFetch("/api/v1/category");
  useEffect(() => {
    if (categoryData && categoryData.data) {
      setCategory(categoryData.data);
    }
  }, [categoryData]);

  let pageSize = 10;
  let pageNumber;

  useEffect(() => {
    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    setPaginatedProducts(productList.slice(startIndex, endIndex));
  }, [currentPage, productList]);

  let pageCount = Math.ceil(productList.length / pageSize);
  pageNumber = Array.from(Array(pageCount).keys());

  const searchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleShowAddProduct = () => {
    setShowAddProduct(true);
  };

  const { datas: productListsData, fetchData: getProductsList } = useFetch(
    "/api/v1/product/list"
  );


  useEffect(() => {
    if (productListsData) {
      setProductList(productListsData);
    }
  }, [productListsData]);

  return (
    <section className="p-6 float-right mt-12 bg-white-200 dark:bg-black-600 lg:w-[87%] w-[93%] min-h-screen">
      <div className="grid grid-cols-10">
        <div className="lg:col-span-7 col-span-10 mt-5 lg:px-6 px-1 overflow-x-auto relative bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-xl">
          <FilterProducts
            productList={productList}
            brands={brands}
            category={category}
          />

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

          <div className="sm:h-[38rem] h-[35rem]">
            <ProductsTable
              paginatedProducts={paginatedProducts}
              searchQuery={searchQuery}
              setProductId={setProductId}
              setShowDeleteModal={setShowDeleteModal}
              setShowEditModal={setShowEditModal}
              setProductEditId={setProductEditId}
              productList={productList}
            />
          </div>
          <Pagination
            pageNumber={pageNumber}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>

        <div className="relative lg:col-span-3 col-span-10 row-auto mt-5 lg:mx-4">
          <div className="relative flex justify-center bg-white-100 rounded-xl dark:bg-black-200">
            <p className="absolute mt-5 xl:text-lg md:text-base text-lg dark:text-white-100">
              Transactions Chart
            </p>
            <PiesChart />
          </div>

          <div className="dark:bg-black-200 bg-white-100 rounded-xl">
            <Departments />
          </div>
        </div>
      </div>

      {showAddProduct && (
        <AddNewProduct
          showAddProduct={showAddProduct}
          setShowAddProduct={setShowAddProduct}
          setProductCode={setProductCode}
          setShowProductItem={setShowProductItem}
          getProductsList={getProductsList}
          brands={brands}
          category={category}
        />
      )}

      {showProductItem && (
        <AddProductItem
          showProductItem={showProductItem}
          setShowProductItem={setShowProductItem}
          getProductsList={getProductsList}
          findProduct={findProduct}
          setShowFile={setShowFile}
        />
      )}
      {showFile && (
        <AddProductFile
          findProduct={findProduct}
          showFile={showFile}
          setShowFile={setShowFile}
        />
      )}

      <DeleteModal
        productId={productId}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        getProductsList={getProductsList}
      />

      <EditProduct
        productEditId={productEditId}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        productList={productList}
        brands={brands}
        category={category}
      />
    </section>
  );
}
