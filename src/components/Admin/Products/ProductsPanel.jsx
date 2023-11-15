import React, { lazy, Suspense, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearch } from "../../../hooks/useSearch";
import Spinner from "../../Spinner/Spinner";
import ProductsPanelContext from "../../../Context/ProductsPanelContext";
import AccessError from "../../AccessError";
import useAccess from "../../../hooks/useAccess";
import toast from "react-hot-toast";
const AddProduct = lazy(() => import("./Add/AddProduct"));
const Departments = lazy(() => import("./Departments"));
const PiesChart = lazy(() => import("../Charts/PieChart"));
const ProductsTable = lazy(() => import("./ProductsTable"));
const DeleteModal = lazy(() => import("./DeleteModal"));
const EditProduct = lazy(() => import("./Edit/EditProduct"));

export default function ProductsPanel() {
  const {
    searchQuery,
    setSearchQuery,
    setShowAddProductModal,
    showAddProductModal,
    showEditModal,
  } = useContext(ProductsPanelContext);
  const { setSearchValue } = useSearch(searchQuery);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearchValue();
    }
  };
  const { userHaveAccess } = useAccess("action_product_admin_list");
  const { userHaveAccess: userHaveAccessAdd } = useAccess(
    "action_product_admin_create"
  );
  const AddProductHandler = () => {
    if (userHaveAccessAdd) {
      setShowAddProductModal(true);
    } else {
      toast.error("You Havent Access Add Product");
    }
  };
  return (
    <section className="sm:p-6 p-3 float-right mt-12 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
      <div className="grid grid-cols-10">
        <div className="lg:col-span-7 col-span-10 mt-5 lg:px-6 px-1 overflow-x-auto relative bg-white-100 dark:bg-black-200 dark:text-white-100 rounded-xl">
          <div className="py-3 flex justify-between px-1 w-full">
            <div className="flex bg-white-100 rounded-lg relative md:w-auto">
              <input
                type="text"
                id="searchInput"
                name="searchTerm"
                placeholder="Search product"
                className="py-1 sm:py-2 pl-7 w-32 outline-none rounded-lg dark:bg-black-200 text-xs sm:placeholder:text-[12px] placeholder:text-[10px] dark:text-white-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute text-sm left-2 sm:top-2 top-1 text-black-800 dark:text-white-100"
                onClick={setSearchValue}
              />
            </div>

            <button
              className="sm:text-xs text-[10px] bg-blue-600 text-white-100 md:p-2 p-1 mr-1 rounded-md whitespace-nowrap"
              onClick={() => AddProductHandler()}
            >
              Add Product <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>

          <div className="lg:h-[46.5rem] sm:h-[44rem] h-[39rem]">
            {userHaveAccess ? (
              <Suspense fallback={<Spinner />}>
                <ProductsTable />
              </Suspense>
            ) : (
              <AccessError error={"product list"} />
            )}
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
    </section>
  );
}
