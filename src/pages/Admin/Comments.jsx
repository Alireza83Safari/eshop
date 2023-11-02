import React, { lazy, Suspense, useState } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { useSearch } from "../../hooks/useSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
const CommentsInfos = lazy(() =>
  import("../../components/Admin/Comments/CommentsInfos")
);
const CommentsTable = lazy(() =>
  import("../../components/Admin/Comments/CommentsTable")
);

export default function Comments() {
  const [searchQuery, setSearchQuery] = useState("");
  const { setSearchValue } = useSearch(searchQuery);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearchValue();
    }
  };
  return (
    <section className="float-right mt-16 pt-4 md:px-4 px-2 md:pb-16 bg-white-200 dark:text-white-100 dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%] min-h-screen">
      <div className="md:grid grid-cols-12">
        <div className="lg:col-span-9 col-span-12 mt-2 bg-white-100 rounded-xl dark:bg-black-200">
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
                onKeyPress={handleKeyPress}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute text-sm left-2 sm:top-2 top-1 text-black-800 dark:text-white-100"
                onClick={setSearchValue}
              />
            </div>
          </div>

          <div className="relative lg:px-3 overflow-y-auto rounded-b-xl 2xl:h-[44rem] md:h-[38rem] h-[37rem] md:order-1 order-2">
            <Suspense fallback={<Spinner />}>
              <CommentsTable />
            </Suspense>
          </div>
        </div>

        <div className="lg:col-span-3 col-span-12 lg:block grid grid-cols-2 lg:px-4 md:order-2 order-1 lg:gap-0 gap-5 lg:mt-0 mt-5">
          <Suspense fallback={<Spinner />}>
            <CommentsInfos />
          </Suspense>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}
