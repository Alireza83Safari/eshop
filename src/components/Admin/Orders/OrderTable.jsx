import React, { useEffect, useState } from "react";
import Pagination from "../../Paganation";
import adminAxios from "../../../services/Axios/adminInterceptors"

export default function OrderTable() {
  const [paginatedTransactions, setPaginatedTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sales, setSales] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await adminAxios.get("/order");
      setSales(response.data.data);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  const pageSize = 7;
  const totalPage = Math.ceil(sales?.length / pageSize);
  const pageNumber = Array.from(Array(totalPage).keys());

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    setPaginatedTransactions(
      sales !== null ? sales?.slice(startIndex, endIndex) : []
    );
  }, [currentPage, sales]);

  return (
    <div className="lg:col-span-8 col-span-12 md:mt-2 text-center md:mx-5 mx-2 mb-2">
      <p className="md:text-base text-sm font-bold border-b py-2 w-full bg-white-100 dark:text-white-100 dark:bg-black-200 rounded-t-xl 2xl:text-xl">
        Orders
      </p>
      <div className="sm:px-6 h-[26rem] overflow-y-auto bg-white-100 dark:text-white-100 dark:bg-black-200 rounded-b-xl relative">
        <table className="min-w-full">
          <thead>
            <tr className="md:text-sm sm:text-xs text-[10px] text-center border-b">
              <th className="py-3">NO</th>
              <th className="py-3">userName</th>
              <th className="py-3">price</th>
              <th className="py-3">createdAt</th>
              <th className="py-3">status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedTransactions?.map((order, index) => (
              <tr
                className="md:text-sm sm:text-xs text-[10px] text-center"
                key={index}
              >
                <td className="py-3">{index + 1}</td>
                <td className="py-3">{order?.username}</td>
                <td className="py-3">{order?.price}</td>
                <td className="py-3">{order?.createdAt.slice(0, 10)}</td>
                <td className="py-3 md:space-x-2">
                  {order?.status === 1 ? (
                    <button className="text-green-300 bg-green-400 px-2 py-1 text-xs rounded-md">
                      Ok
                    </button>
                  ) : (
                    <button className="bg-orange-100 text-orange-400 px-2 py-1 text-xs rounded-md">
                      pending
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          pageNumber={pageNumber}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
