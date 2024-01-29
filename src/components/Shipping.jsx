import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import AddressContext from "../context/AddressContext";
import userAxios from "../services/Axios/userInterceptors";
import useFetch from "../hooks/useFetch";
import toast from "react-hot-toast";

export default function Shipping() {
  const navigate = useNavigate();
  const { userAddress, setShowAllAddress, setShowAddAddress } =
    useContext(AddressContext);

  const { datas: orders } = useFetch("/order", userAxios);
  const totalAmount = orders?.price || 0;
  const totalTax = totalAmount / 10;
  const totalDiscount = totalAmount / 20;
  const totalPayment = Math.floor(totalAmount - totalDiscount - totalTax);
  const totalQuantity = orders?.items?.reduce(
    (total, order) => total + order?.quantity,
    0
  );

  const buyProducts = () => {
    userAxios.post(`/order/checkout/${userAddress[0].id}`).then((res) => {
      if (res.status === 200) {
        toast.success('create order is success')
        navigate("/");
      }
    });
  };

  return (
    <>
      <div className="lg:col-span-8">
        {userAddress?.length ? (
          <div className="w-full border border-blue-60 py-3 px-4 rounded-lg bg-white-200 dark:bg-black-200 dark:text-white-100">
            <p className="text-xs">Your Delivery Address</p>
            {userAddress?.slice(0, 1)?.map((address) => (
              <div className="mt-4" key={address.id}>
                <div className="flex items-center mb-3">
                  <FontAwesomeIcon icon={faLocationPin} className="mr-1" />
                  <p className="text-sm">{address.address}</p>
                </div>
                <div className="flex mb-3 md:text-sm text-xs">
                  <p className="mr-4">{address.firstName}</p>
                  <p className="mr-4">{address.lastName}</p>
                </div>

                <div className="flex justify-between">
                  <button
                    className="md:text-sm text-xs text-orange-400"
                    onClick={() => setShowAllAddress(true)}
                  >
                    Change or Edit Address
                    <FontAwesomeIcon icon={faAngleRight} className="ml-1" />
                  </button>

                  <button
                    className="md:text-sm text-xs text-blue-600"
                    onClick={() => setShowAddAddress(true)}
                  >
                    Add New Address
                    <FontAwesomeIcon icon={faAngleRight} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full border border-blue-60 p-4 py-6 rounded-lg bg-red-100">
            <div className="flex justify-between items-center">
              <p className="">No address has been registered for you.</p>
              <button
                className="border p-2 rounded-lg font-black"
                onClick={() => setShowAddAddress(true)}
              >
                Add New Address
              </button>
            </div>
          </div>
        )}

        <div>
          {orders?.items?.map((order) => (
            <div
              key={order?.id}
              className="flex items-center border-b h-36 dark:text-white-100"
            >
              <img
                src={order?.fileUrl}
                className="w-24 h-24 object-contain md:mx-4"
              />
              <div className="md:ml-4 md:text-sm text-xs">
                <p className="pb-2">{order?.productName}</p>
                <p className="py-1 text-gray-800 dark:text-white-100">
                  ${order.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-4">
        <div className="lg:w-[20rem] lg:block hidden h-[24rem] sm:px-4 py-2 ml-8 border text-sm z-10 rounded-lg dark:text-white-100">
          <p className="py-2 text-xl font-bold text-center">Cart Total</p>

          <div className="flex justify-between pt-6 pb-2">
            <p>Items</p>
            <p className="text-blue-600 font-black">{totalQuantity}</p>
          </div>

          <div className="flex justify-between pt-6 pb-2">
            <p>Total(Tax Excl.)</p>
            <p>{totalAmount.toLocaleString()}$</p>
          </div>

          <div className="flex justify-between pt-6 pb-2">
            <p>Discount Amount</p>
            <p className="text-green-300">{totalDiscount}(20%)</p>
          </div>

          <div className="flex justify-between py-4 text-red-700">
            <p>Taxes</p>
            <p>{totalTax}$</p>
          </div>

          <div className="flex justify-between py-4 font-black md:text-base text-sm">
            <p>Total Payment</p>
            <p>{totalPayment}$</p>
          </div>

          <Link>
            <button
              className=" w-full mt-3 py-2 bg-blue-600 text-xs text-white-100 rounded-lg disabled:bg-gray-100"
              onClick={() => buyProducts()}
              disabled={!userAddress?.length}
            >
              Order Placement
            </button>
          </Link>
        </div>

        <div className="lg:hidden block fixed bottom-16 left-0 bg-white-100 w-full px-8 dark:bg-black-600 dark:text-white-100 min-w-full">
          <div className="flex text-sm justify-between py-2">
            <p>Products Discount :</p>
            <p className="text-green-300 font-black">{totalDiscount}$</p>
          </div>
          <div className="flex text-sm justify-between py-2">
            <p>Total Tax :</p>
            <p className="text-red-700 font-black">{totalTax}$</p>
          </div>

          <div className="flex text-sm justify-between py-2">
            <p>Total Amount :</p>
            <p className="font-black">{totalAmount}$</p>
          </div>
        </div>

        <div className="lg:hidden flex fixed left-0 bottom-0 w-full border-t py-3 bg-white-100 dark:bg-black-600 dark:text-white-100">
          <button
            className="w-1/3 text-white-100 rounded-lg py-2 mx-4 bg-blue-600 flex justify-center disabled:bg-gray-100"
            disabled={!userAddress?.length}
            onClick={() => buyProducts()}
          >
            Buy
          </button>
          <div className="absolute flex items-center right-0 md:text-base text-sm">
            <p className="mr-1">Total Payment:</p>
            <span className="mr-5 font-bold">{totalPayment}$</span>
          </div>
        </div>
      </div>
    </>
  );
}
