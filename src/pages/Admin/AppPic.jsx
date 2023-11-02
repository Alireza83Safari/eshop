import React, { Suspense, lazy } from "react";
import userAxios from "../../services/Axios/userInterceptors";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner/Spinner";
import { Toaster } from "react-hot-toast";

const AppPicTable = lazy(() =>
  import("../../components/Admin/Appics/AppPicTable")
);
const TotalAppPict = lazy(() =>
  import("../../components/Admin/Appics/TotalAppPic")
);
const AddAppPic = lazy(() =>
  import("../../components/Admin/Appics/Add/AddAppPic")
);

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
          <Suspense fallback={<Spinner />}>
            <AppPicTable
              appPicData={appPicData}
              fetchData={fetchData}
              appPicLoading={appPicLoading}
            />
          </Suspense>
        </div>
        <div className="lg:col-span-4 col-span-12 lg:gap-x-12 gap-x-6 gap-y-6 lg:order-2 order-1 lg:inline">
          <Suspense fallback={<Spinner />}>
            <TotalAppPict
              total={appPicData?.length}
              appPicLoading={appPicLoading}
            />
          </Suspense>
          <Suspense fallback={<Spinner />}>
            <AddAppPic fetchData={fetchData} />
          </Suspense>
        </div>
      </div>
      <Toaster />
    </section>
  );
}
