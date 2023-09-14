import React, { useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import userAxios from "../../services/Axios/userInterceptors";
import Pagination from "../Paganation";
import Spinner from "../Spinner/Spinner";

export default function ProfileOrders() {
  const { datas: orders, isLoading } = useFetch("/profile/orders", userAxios);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const totalPage =
    orders && orders.length > 0 ? Math.ceil(orders.length / pageSize) : 1;

  const pageNumber = Array.from(Array(totalPage).keys());

  const paginatedProducts = useMemo(() => {
    let endIndex = pageSize * currentPage;
    let startIndex = endIndex - pageSize;
    return orders?.slice(startIndex, endIndex);
  }, [currentPage, totalPage]);

  return (
    <section className="relative">
      {isLoading ? (
        <Spinner />
      ) : !paginatedProducts || paginatedProducts.length === 0 ? (
        <div className="w-full text-center py-24">
          <img src="/images/order-empty.svg" alt="" className="m-auto " />
          <p className="text-lg font-semibold">You haven't placed any orders</p>
        </div>
      ) : (
        paginatedProducts?.map((data, index) => (
          <div className="px-8 border-b py-8" key={index}>
            <div className="md:flex md:justify-between grid grid-cols-2">
              <div className="flex md:mb-0 mb-4 items-center">
                <p className="mr-2 text-sm text-gray-800">status:</p>
                <p className="flex">
                  {data.status === "1" ? (
                    <img src="su" className="w-6 h-6 rounded-full" />
                  ) : (
                    <img
                      src="/images/success.png"
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                </p>
              </div>

              <div className="flex md:mb-0 mb-4 items-center">
                <p className="mr-2 text-sm text-gray-800">Date:</p>
                <p className="dark:text-white-100 text-black-900  text-sm lg:text-base">
                  {data?.createdAt.slice(0, 10)}
                </p>
              </div>
              <div className="flex md:mb-0 mb-4 items-center">
                <p className="mr-2 text-sm text-gray-800">price:</p>
                <p className="dark:text-white-100 text-black-900 text-sm lg:text-base ">
                  {data.price}$
                </p>
              </div>
              <div className="flex md:mb-0 mb-4 items-center">
                <p className="mr-2 text-sm text-gray-800">code:</p>
                <p className="dark:text-white-100 text-black-900 text-sm lg:text-base ">
                  {data.code}
                </p>
              </div>
            </div>

            <div className="flex py-6">
              {data?.fileUrls?.map((file, index) => (
                <img
                  src={`http://127.0.0.1:6060/${file}`}
                  className="w-20 h-20 mr-12 object-cover"
                  key={index}
                />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              pageNumber={pageNumber}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ))
      )}
    </section>
  );
}
