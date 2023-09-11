import React, { Suspense, lazy, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import useFetch from "../hooks/useFetch";
import userAxios from "../services/Axios/userInterceptors";
import AddressContext from "../Context/AddressContext";
import Spinner from "../components/Spinner/Spinner";
const AddNewAddress = lazy(() => import("../components/Address/AddNewAddress"));
const EditAddress = lazy(() => import("../components/Address/EditAddress"));
const AllAddress = lazy(() => import("../components/Address/AllAddress"));
const Shipping = lazy(() => import("../components/Shipping"));

export default function ShippingPage() {
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showAllAddress, setShowAllAddress] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [editAddressId, setEditAddressId] = useState(null);
  const { datas: userAddress, fetchData: fetchAddress } = useFetch(
    "/address",
    userAxios
  );

  return (
    <>
      <Header />
      <AddressContext.Provider
        value={{
          showAddAddress,
          setShowAddAddress,
          setEditAddressId,
          showAllAddress,
          setShowAllAddress,
          fetchAddress,
          userAddress,
          editAddressId,
          setShowEditAddress,
        }}
      >
        <section className="min-h-screen lg:grid grid-cols-12 lg:container m-auto lg:px-20 mt-28">
          <Suspense fallback={<Spinner />}>
            <Shipping />
          </Suspense>
        </section>

        <Suspense fallback={<Spinner />}>
          <AllAddress />
        </Suspense>

        <Suspense fallback={<Spinner />}>
          <AddNewAddress
            showAddAddress={showAddAddress}
            setShowAddAddress={setShowAddAddress}
            fetchAddress={fetchAddress}
          />
        </Suspense>

        <Suspense fallback={<Spinner />}>
          <EditAddress
            showEditAddress={showEditAddress}
            setShowEditAddress={setShowEditAddress}
            editAddressId={editAddressId}
            fetchAddress={fetchAddress}
          />
        </Suspense>
      </AddressContext.Provider>
      <Footer />
    </>
  );
}
