import React, { lazy, Suspense, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { useSearch } from "../../hooks/useSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const CommentsInfos = lazy(() =>
  import("../../components/Admin/Comments/CommentsInfos")
);
const CommentsTable = lazy(() =>
  import("../../components/Admin/Comments/CommentsTable")
);

export default function Comments() {
  const [searchQuery, setSearchQuery] = useState("");
  const { setSearchValue } = useSearch(searchQuery);
  return (
    <section className="float-right mt-16 pt-4 px-4 md:pb-16 bg-white-200 dark:text-white-100 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
      <div className="md:grid grid-cols-12">
        <div className="md:col-span-9 mt-2 bg-white-100 rounded-xl dark:bg-black-200">
          <div className="grid grid-cols-2 my-2">
            <div className="flex rounded-md relative md:w-auto ml-4">
              <input
                type="text"
                id="searchInput"
                name="searchTerm"
                placeholder="search comment"
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
          </div>

          <div className="relative lg:px-3 overflow-y-auto rounded-b-xl 2xl:h-[44rem] h-[37rem]">
            <Suspense fallback={<Spinner />}>
              <CommentsTable />
            </Suspense>
          </div>
        </div>

        <div className="md:col-span-3 md:block grid grid-cols-2 md:px-4">
          <Suspense fallback={<Spinner />}>
            <CommentsInfos />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
