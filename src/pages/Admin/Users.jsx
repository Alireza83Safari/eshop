import React, { useState, lazy, Suspense } from "react";
import Spinner from "../../components/Spinner/Spinner";
import { ToastContainer } from "react-toastify";
import { usePaginationURL } from "../../hooks/usePaginationURL";
import adminAxios from "../../services/Axios/adminInterceptors";
import { useFetchPagination } from "../../hooks/useFetchPagination";
import UserPanelContext from "../../Context/userPanelContext";
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
  let pageSize = 8;
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
      <section className="float-right mt-16 pt-4 px-4 md:pb-16 bg-white-200 dark:text-white-100 min-h-screen dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%]">
        <button
          onClick={() => setShowAddUser(true)}
          className="bg-blue-600 text-white-100 px-2 py-1 rounded-lg"
        >
          Add New User
        </button>
        <div className="mt-2 text-center">
          <p className="text-md 2xl:text-xl font-bold border-b py-2 w-full bg-white-100 rounded-t-xl dark:bg-black-200">
            Users
          </p>
          <div className="relative lg:px-3 overflow-y-auto bg-white-100 rounded-b-xl dark:bg-black-200">
            <div className="h-[30rem]">
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
