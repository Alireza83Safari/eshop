import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import usePost from "../hooks/usePost";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faLocationPin } from "@fortawesome/free-solid-svg-icons";
import AllAddress from "../components/Address/AllAddress";
import AddNewAddress from "../components/Address/AddNewAddress";
import EditAddress from "../components/Address/EditAddress";
import { AddressContext } from "../components/Address/AddressContext";

export default function Shipping() {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAllAddress, setShowAllAddress] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const [error500, setError500] = useState(false);
  const navigate = useNavigate();
  const { datas: userAddress, fetchData: fetchAddress } = useFetch(
    "/address"
  );
  const [orders, setOrders] = useState([]);

  const { datas: getOrders } = useFetch("/order");
  useEffect(() => {
    if (getOrders && getOrders.items) {
      setOrders(getOrders.items);
    }
  }, [getOrders]);

  const totalAmount = getOrders?.price || 0;
  const totalTax = totalAmount / 10;
  const totalDiscount = totalAmount / 20;
  const totalPayment = Math.floor(totalAmount - totalDiscount - totalTax);
  const totalQuantity = orders.reduce(
    (total, order) => total + order.quantity,
    0
  );

  const { doPost, postData } = usePost();
  const buyProducts = () => {
    doPost(`/order/checkout/${userAddress[0].id}`);
    navigate("/");
  };

  return (
    <AddressContext.Provider
      value={{
        showAddAddress,
        setShowAddAddress,
        setEditAddressId,
        showAllAddress,
        setShowAllAddress,
        fetchAddress,
        userAddress,
        setError500,
      }}
    >
      <Header />

      <section className="min-h-screen lg:grid grid-cols-12 lg:container m-auto lg:px-20 mt-12">
        <div className="lg:col-span-8 px-8">
          {userAddress?.length ? (
            <div className="w-full border border-blue-60 py-3 px-4 rounded-lg bg-white-200">
              <p className="text-xs">Your Delivery Address</p>
              {userAddress.slice(0, 1).map((address) => (
                <div className="mt-4">
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
          {error500 && (
            <div className=" w-screen min-h-full bg-gray-100 absolute top-0 right-0 flex justify-center items-center">
              <div className="h-screen font-black">
                <p className="text-6xl text-red-700">500</p>
                <p className="mb-8 mt-2 text-red-700">Internal server error</p>
                <Link className="text-blue-600" to="/shop">
                  Navigate to home
                </Link>
              </div>
            </div>
          )}

          <div>
            {orders.map((order) => (
              <div key={order.id} className="flex items-center border-b h-36">
                <img
                  src={`http://127.0.0.1:6060/${order.fileUrl}`}
                  className="w-24 h-24 object-contain md:mx-4"
                />
                <div className="md:ml-4 md:text-sm text-xs">
                  <p className="pb-2">{order.productName}</p>
                  <p className="py-1 text-gray-800">${order.price}</p>
                  <p className="py-1m text-gray-800">Color: White</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="lg:w-[20rem] lg:block hidden h-[24rem] px-6 py-2 ml-8 border text-sm z-10 rounded-lg">
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

            <div className="flex justify-between py-4 font-black">
              <p>Total Payment</p>
              <p>{totalPayment}$</p>
            </div>

            <Link>
              <button
                className=" w-full mt-3 py-2 bg-blue-600 text-xs text-white-100 rounded-lg"
                onClick={() => buyProducts()}
              >
                Order Placement
              </button>
            </Link>
          </div>
          <div className="lg:hidden block fixed bottom-16 bg-white-100 w-full px-12">
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

          <div className="lg:hidden flex fixed bottom-0 w-full border-t py-3 bg-white-100">
            <button className="w-1/3 text-white-100 rounded-lg py-2 mx-4 bg-blue-600">
              Buy
            </button>
            <div className="absolute flex items-center right-0 text-lg">
              <p className="mr-1">Total Payment:</p>
              <span className="mr-5 font-bold">{totalPayment}$</span>
            </div>
          </div>
        </div>
      </section>

      <AllAddress />
      <AddNewAddress
        showAddAddress={showAddAddress}
        setShowAddAddress={setShowAddAddress}
        fetchAddress={fetchAddress}
      />
      <EditAddress
        showEditAddress={showEditAddress}
        setShowEditAddress={setShowEditAddress}
        editAddressId={editAddressId}
        fetchAddress={fetchAddress}
        setError500={setError500}
      />
      <Footer />
    </AddressContext.Provider>
  );
}
