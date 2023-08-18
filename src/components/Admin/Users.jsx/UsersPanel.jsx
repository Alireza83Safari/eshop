import React, { useEffect, useState, lazy, Suspense } from "react";
import Spinner from "../../../components/Spinner/Spinner";
import instance from "../../../api/axios-interceptors";

const UsersTable = lazy(() => import("./UsersTable"));

export default function UsersPanel() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await instance.get("/api/v1/admin/user");
      setUsers(response.data.data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <section className="float-right mt-16 pt-4 px-4 md:pb-16 bg-white-200 dark:text-white-100 min-h-screen dark:bg-black-600 xl:w-[90%] lg:w-[88%] sm:w-[94%] w-[91%]">
        <div className="mt-2 text-center">
          <p className="text-md 2xl:text-xl font-bold border-b py-2 w-full bg-white-100 rounded-t-xl dark:bg-black-200">
            Users
          </p>
          <div className="relative lg:px-3 overflow-y-auto bg-white-100 rounded-b-xl dark:bg-black-200">
            <div className="h-[30rem]">
              <Suspense fallback={<Spinner />}>
                <UsersTable users={users} fetchUsers={fetchUsers} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
