import React from "react";
import { ToastContainer } from "react-toastify";
import adminAxios from "../../services/Axios/adminInterceptors";
import { useFetchPagination } from "../../hooks/useFetchPagination";
import ColorTable from "../../components/Admin/Color/ColorTable";
import TotalColor from "../../components/Admin/Color/TotalColor"
import AddColor from "../../components/Admin/Color/AddColor";

export default function Color() {
  let url = "/color";
  const { paginations, total, isLoading: paginationLodaing ,fetchData} = useFetchPagination(url, adminAxios);

  return (
    <section className="p-6 float-right mt-16 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-8 col-span-12 lg:mr-6 lg:order-1 order-2">
          <ColorTable paginations={paginations} paginationLodaing={paginationLodaing} fetchData={fetchData} total={total}/>
        </div>
        <div className="lg:col-span-4 col-span-12 gap-x-12 gap-y-6 grid lg:order-2 order-1">
          <TotalColor total={total} />
          <AddColor fetchData={fetchData} />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
