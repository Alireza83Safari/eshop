import React, { useState, lazy, Suspense } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { ToastContainer } from "react-toastify";
import { usePaginationURL } from "../../hooks/usePaginationURL";
import adminAxios from "../../services/Axios/adminInterceptors";
import { useFetchPagination } from "../../hooks/useFetchPagination";
import UserPanelContext from "../../Context/userPanelContext";
import { useSearch } from "../../hooks/useSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const UsersTable = lazy(() =>
  import("../../components/Admin/Users/UsersTable")
);
const EditUser = lazy(() => import("../../components/Admin/Users/EditUser"));
const AddUser = lazy(() => import("../../components/Admin/Users/AddUser"));

export default function Users() {
  const [showEditUser, setShowEditUser] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [editUserID, setEditUserID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  let url = "/user";
  let pageSize = 10;
  const {
    paginations,
    total,
    isLoading: paginationLodaing,
    fetchData,
  } = useFetchPagination(url, adminAxios);
  const pagesCount = Math.ceil(total / pageSize);
  const { isLoading: pageLoading } = usePaginationURL(
    currentPage,
    pageSize,
    url
  );
  const [searchQuery, setSearchQuery] = useState("");

  const { setSearchValue } = useSearch(searchQuery);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearchValue();
    }
  };
  return (
    <UserPanelContext.Provider
      value={{
        paginations,
        fetchData,
        paginationLodaing,
        pageLoading,
        setShowEditUser,
        setEditUserID,
        pagesCount,
        setCurrentPage,
        currentPage,
        setShowAddUser,
        editUserID,
      }}
    >
      <section className="float-right mt-12 pt-7 px-4 bg-white-200 dark:text-white-100 min-h-screen dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%]">
        <div className="mt-2 text-center">
          <div className="flex justify-between bg-white-100 dark:bg-black-200 rounded-t-xl py-2">
            <div className="flex rounded-md relative md:w-auto md:ml-3">
              <input
                type="text"
                id="searchInput"
                name="searchTerm"
                placeholder="search user"
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
            <button
              onClick={() => setShowAddUser(true)}
              className="bg-blue-600 text-white-100 md:w-[8rem] w-[6rem] rounded-lg mr-4 md:text-sm text-xs"
            >
              Add New User
            </button>
          </div>
          <div className="relative lg:px-3 px-2 overflow-y-auto bg-white-100 rounded-b-xl dark:bg-black-200">
            <div className="h-[36rem]">
              <Suspense fallback={<Spinner />}>
                <UsersTable />
              </Suspense>
            </div>
          </div>
        </div>
        <Suspense fallback={<Spinner />}>
          {showEditUser && <EditUser />}
        </Suspense>
        <Suspense fallback={<Spinner />}>{showAddUser && <AddUser />}</Suspense>
        <ToastContainer />
      </section>
    </UserPanelContext.Provider>
  );
}
