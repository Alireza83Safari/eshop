import React, { Suspense, lazy, useState } from "react";
import adminAxios from "../../services/Axios/adminInterceptors";
import { useFetchPagination } from "../../hooks/useFetchPagination";
import { useSearch } from "../../hooks/useSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../components/Spinner/Spinner";
import { Toaster } from "react-hot-toast";
const BrandTable = lazy(() =>
  import("../../components/Admin/Brand/BrandTable")
);
const TotalBrand = lazy(() =>
  import("../../components/Admin/Brand/TotalBrand")
);
const AddBrand = lazy(() =>
  import("../../components/Admin/Brand/AddBrand/AddBrand")
);

export default function Brand() {
  let url = "/brand";
  const {
    paginations,
    total,
    isLoading: paginationLodaing,
    fetchData,
  } = useFetchPagination(url, adminAxios);
  const [searchQuery, setSearchQuery] = useState("");

  const { setSearchValue } = useSearch(searchQuery);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearchValue();
    }
  };
  return (
    <section className="sm:p-6 p-3 float-right mt-16 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-8 col-span-12 lg:mr-6 lg:order-1 order-2 bg-white-100 dark:bg-black-200 rounded-xl lg:mt-0 mt-5">
          <div className="grid grid-cols-2 my-2">
            <div className="flex rounded-lg relative sm:ml-4">
              <input
                type="text"
                id="searchInput"
                name="searchTerm"
                placeholder="search brand"
                className="py-1 sm:py-2 pl-7 w-32 outline-none rounded-lg dark:bg-black-200  text-xs sm:placeholder:text-[12px] placeholder:text-[10px] dark:text-white-100"
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
          </div>
          <Suspense fallback={<Spinner />}>
            <BrandTable
              paginations={paginations}
              paginationLodaing={paginationLodaing}
              fetchData={fetchData}
              total={total}
            />
          </Suspense>
        </div>
        <div className="lg:col-span-4 col-span-12 gap-x-12 lg:order-2 order-1">
          <Suspense fallback={<Spinner />}>
            <TotalBrand total={total} paginationLodaing={paginationLodaing} />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <AddBrand fetchData={fetchData} />
          </Suspense>
        </div>
      </div>
      <Toaster />
    </section>
  );
}
