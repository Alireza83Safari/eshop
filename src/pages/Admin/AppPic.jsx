import React from "react";
import { ToastContainer } from "react-toastify";
import AppPicTable from "../../components/Admin/Appics/AppPicTable";
import TotalAppPict from "../../components/Admin/Appics/TotalAppPic";
import userAxios from "../../services/Axios/userInterceptors";
import useFetch from "../../hooks/useFetch";
import AddAppPic from "../../components/Admin/Appics/Add/AddAppPic";
export default function AppPic() {
  const {
    datas: appPicData,
    fetchData,
    isLoading: appPicLoading,
  } = useFetch("/appPic", userAxios);

  return (
    <section className="sm:p-6 p-3 float-right mt-16 bg-white-200 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
      <div className="grid lg:grid-cols-12">
        <div className="lg:col-span-8 col-span-12 lg:mr-6 lg:order-1 order-2">
          <AppPicTable
            appPicData={appPicData}
            fetchData={fetchData}
            appPicLoading={appPicLoading}
          />
        </div>
        <div className="lg:col-span-4 col-span-12 lg:gap-x-12 gap-x-6 gap-y-6 lg:order-2 order-1 lg:inline">
          <TotalAppPict total={appPicData?.length} />
          <AddAppPic fetchData={fetchData} />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
