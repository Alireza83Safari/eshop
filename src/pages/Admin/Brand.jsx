import React from "react";
import { ToastContainer } from "react-toastify";
import adminAxios from "../../services/Axios/adminInterceptors";
import BrandTable from "../../components/Admin/Brand/BrandTable";
import TotalBrand from "../../components/Admin/Brand/TotalBrand";
import AddBrand from "../../components/Admin/Brand/AddBrand/AddBrand";
import { useFetchPagination } from "../../hooks/useFetchPagination";

export default function Brand() {
  let url = "/brand";
  const { paginations, total, isLoading: paginationLodaing ,fetchData} = useFetchPagination(url, adminAxios);

  return (
    <section className="p-6 float-right mt-16 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-8 col-span-12 lg:mr-6 lg:order-1 order-2">
          <BrandTable paginations={paginations} paginationLodaing={paginationLodaing} fetchData={fetchData} total={total}/>
        </div>
        <div className="lg:col-span-4 col-span-12 gap-x-12 gap-y-6 grid grid-rows-3 lg:order-2 order-1">
          <TotalBrand total={total} />
          <AddBrand fetchData={fetchData} />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
