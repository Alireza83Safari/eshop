import Spinner from "../Spinner/Spinner";
import useOrders from "../../api/order/user/useOrders";

export default function ProfileOrders() {
  const { orders, isLoading } = useOrders();
  return (
    <section className="relative">
      {isLoading ? (
        <div className="pt-64">
          <Spinner />
        </div>
      ) : !orders?.length ? (
        <div className="w-full text-center py-24">
          <img
            src="/images/order-empty.svg"
            className="m-auto object-contain"
          />
          <p className="text-lg font-semibold dark:text-white-100">
            You haven't placed any orders
          </p>
        </div>
      ) : (
        orders?.map((data) => (
          <div className="px-8 border-b py-8" key={data?.id}>
            <div className="md:flex md:justify-between grid grid-cols-2">
              <div className="flex md:mb-0 mb-4 items-center">
                <p className="mr-2 text-sm text-gray-800">status:</p>
                <p className="flex">
                  {data.status === "1" ? (
                    <img src="" className="w-6 h-6 rounded-full" />
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
                  {data?.createdAt?.slice(0, 10)}
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
                  src={file}
                  className="w-20 h-20 mr-12 object-cover"
                  key={index}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </section>
  );
}
