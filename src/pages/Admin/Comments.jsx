import React, { useEffect, useState, lazy, Suspense } from "react";
import Spinner from "../../components/Spinner/Spinner";
import adminAxios from "../../services/Axios/adminInterceptors";
const CommentsInfos = lazy(() =>
  import("../../components/Admin/Comments/CommentsInfos")
);
const CommentsTable = lazy(() =>
  import("../../components/Admin/Comments/CommentsTable")
);

export default function Comments() {
  return (
    <section className="float-right mt-16 pt-4 px-4 md:pb-16 bg-white-200 dark:text-white-100 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%]">
      <div className="md:grid grid-cols-12">
        <div className="md:col-span-9 mt-2 text-center">
          <p className="text-md 2xl:text-xl font-bold border-b py-2 w-full bg-white-100 rounded-t-xl dark:bg-black-200">
            Comments
          </p>
          <div className="relative lg:px-3 overflow-y-auto bg-white-100 rounded-b-xl dark:bg-black-200">
            <div className="h-[38rem]">
              <Suspense fallback={<Spinner />}>
                <CommentsTable  />
              </Suspense>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 md:block grid grid-cols-2 md:px-4">
          <Suspense fallback={<Spinner />}>
            <CommentsInfos  />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
